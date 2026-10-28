#!/usr/bin/env python3
"""Lanza el agente que TypeSafe elija para un ticket, bajo la orquestación de Orca.

Reparto de papeles:
- Los agentes de PAGO (Claude, Codex con suscripción) deciden: planifican, escriben el ticket y
  revisan lo que entregan los obreros. TypeSafe elige cuál según su cuota real.
- Los OBREROS trabajan con modelos gratuitos: `codex-obrero` (Codex sin sesión de ChatGPT) habla
  solo con el combo «obreros» de OmniRoute. Hacen los tickets `bounded`.
- Orca EJECUTA: crea la tarea, lanza el worker y vigila su worker_done.

Un ticket `bounded` va al obrero salvo que toque datos de ciudadanos (los modelos gratuitos pueden
entrenar con lo que reciben): entonces va a un agente de pago. Los `top` van siempre a pago.
Si TypeSafe no responde o nadie está disponible, el script se detiene y lo dice.

Formato del ticket (lo lee TypeSafe; las rutas DEBEN ir entre comillas invertidas):

    # Título de la tarea
    Terminado cuando: criterio comprobable.
    Ficheros en propiedad:
    - `ruta/del/fichero`

Uso:
    python3 tool/despachar.py tickets/mi-ticket.md --nivel bounded --run <run_id>     # obrero gratuito
    python3 tool/despachar.py tickets/mi-ticket.md --nivel bounded --run <run_id> --pago
    python3 tool/despachar.py tickets/mi-ticket.md --nivel top --run <run_id> --simular
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

CLEVERTRACKER = Path.home() / "projects" / "CleverTracker"
PEDIR_AGENTE = CLEVERTRACKER / "tool" / "pedir_agente.py"
LANZAR_AGY = CLEVERTRACKER / "tool" / "lanzar_worker_antigravity.py"
REPO = Path(__file__).resolve().parent.parent

# Familias que Orca lanza con --agent; Antigravity necesita su lanzador propio.
AGENTE_ORCA = {"claude": "claude", "codex": "codex", "opencode": "opencode"}

# Rutas con datos de ciudadanos: nunca a modelos gratuitos.
SENSIBLES = ("data/web.js", "recogida/", ".csv", ".jsonl")


def toca_datos_sensibles(ticket: Path) -> bool:
    texto = ticket.read_text(encoding="utf-8")
    return any(marca in texto for marca in SENSIBLES)


def orca_json(orden: list) -> dict:
    salida = subprocess.run(orden + ["--json"], capture_output=True, text=True)
    if salida.returncode != 0:
        sys.exit(f"Falló {' '.join(orden[:3])}:\n{salida.stdout}\n{salida.stderr}")
    return json.loads(salida.stdout)


def lanzar_obrero(ticket: Path, titulo: str, run: str, simular: bool) -> int:
    """Abre un terminal con codex-obrero, espera a que esté listo y le asigna el ticket supervisado."""
    if simular:
        print("Se ejecutaría: orca terminal create --command codex-obrero → terminal wait --for tui-idle"
              f" → orchestration worker-start --terminal <handle> --run {run}")
        return 0
    creado = orca_json(["orca", "terminal", "create", "--command", "codex-obrero", "--title", f"obrero · {titulo}"])
    r = creado.get("result", creado)
    handle = r.get("handle") or (r.get("terminal") or {}).get("handle")
    if not handle:
        sys.exit(f"No encuentro el handle del terminal creado: {creado}")
    orca_json(["orca", "terminal", "wait", "--terminal", handle, "--for", "tui-idle", "--timeout-ms", "120000"])
    return subprocess.run(["orca", "orchestration", "worker-start", "--spec", ticket.read_text(encoding="utf-8"),
                           "--task-title", titulo, "--worktree", "current", "--terminal", handle,
                           "--run", run, "--json"]).returncode


def preguntar_typesafe(ticket: Path, nivel: str) -> dict:
    # TypeSafe solo conoce las áreas de CleverTracker; «docs» es la más cercana a esta web.
    orden = [sys.executable, str(PEDIR_AGENTE), "--ticket", str(ticket), "--base", "main",
             "--level", nivel, "--area", "docs", "--json"]
    salida = subprocess.run(orden, capture_output=True, text=True, timeout=150)
    if salida.returncode == 2:
        sys.exit("TypeSafe no responde (systemctl --user status typesafe). No se lanza nada.")
    try:
        return json.loads(salida.stdout)
    except json.JSONDecodeError:
        sys.exit(f"Respuesta de TypeSafe ilegible:\n{salida.stdout}\n{salida.stderr}")


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("ticket", type=Path)
    p.add_argument("--nivel", choices=["top", "bounded"], required=True,
                   help="top = tarea larga o delicada; bounded = cambio acotado")
    p.add_argument("--run", required=True, help="id del Run de Orca (orchestration run-create)")
    p.add_argument("--simular", action="store_true", help="muestra la orden sin lanzar nada")
    p.add_argument("--pago", action="store_true", help="fuerza un agente de pago aunque el ticket sea bounded")
    a = p.parse_args()

    ticket = a.ticket.resolve()
    if not ticket.is_file():
        sys.exit(f"No existe el ticket {ticket}")

    titulo = ticket.stem.replace("-", " ")
    nivel = a.nivel
    if toca_datos_sensibles(ticket):
        # OpenCode Free Tier (el único `bounded` de TypeSafe) también es gratuito: se pide nivel top.
        print("El ticket toca datos de ciudadanos: va a Claude o Codex de pago, nunca a un modelo gratuito.")
        nivel = "top"
    elif nivel == "bounded" and not a.pago:
        print("Obrero gratuito (codex-obrero → combo «obreros» de OmniRoute). Revisa el resultado un agente de pago.")
        return lanzar_obrero(ticket, titulo, a.run, a.simular)

    decision = preguntar_typesafe(ticket, nivel)
    familia = decision.get("agent")
    print(f"TypeSafe: {familia or 'nadie'} ({decision.get('reason')})")
    if not familia:
        print("Nadie disponible ahora: el ticket espera.")
        return 3

    if familia in AGENTE_ORCA:
        orden = ["orca", "orchestration", "worker-start", "--spec", ticket.read_text(encoding="utf-8"),
                 "--task-title", titulo, "--worktree", "current", "--agent", AGENTE_ORCA[familia],
                 "--run", a.run, "--json"]
    elif familia == "antigravity":
        orden = [sys.executable, str(LANZAR_AGY), "--worktree", str(REPO), "--run", a.run,
                 "--spec-file", str(ticket), "--title", titulo]
    else:
        sys.exit(f"Familia desconocida: {familia}. No se lanza nada.")

    if a.simular:
        print("Se ejecutaría:", " ".join(x if len(x) < 80 else x[:77] + "..." for x in orden))
        return 0
    return subprocess.run(orden).returncode


if __name__ == "__main__":
    sys.exit(main())
