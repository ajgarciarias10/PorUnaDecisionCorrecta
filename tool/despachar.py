#!/usr/bin/env python3
"""Lanza el agente que TypeSafe elija para un ticket, bajo la orquestación de Orca.

Reparto de papeles (el mismo que CleverTracker, ADR 0008):
- TypeSafe decide QUIÉN trabaja, según la cuota real de cada agente y el nivel del ticket.
- Orca EJECUTA: crea la tarea, lanza el worker y vigila su worker_done.
- OmniRoute (127.0.0.1:20128) abarata las LLAMADAS de los agentes que se conectan a él;
  no decide ni lanza nada.

Este script no elige nunca por su cuenta: si TypeSafe no responde o nadie está disponible,
se detiene y lo dice.

Formato del ticket (lo lee TypeSafe; las rutas DEBEN ir entre comillas invertidas):

    # Título de la tarea
    Terminado cuando: criterio comprobable.
    Ficheros en propiedad:
    - `ruta/del/fichero`

Uso:
    python3 tool/despachar.py tickets/mi-ticket.md --nivel bounded --run <run_id>
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
    a = p.parse_args()

    ticket = a.ticket.resolve()
    if not ticket.is_file():
        sys.exit(f"No existe el ticket {ticket}")

    decision = preguntar_typesafe(ticket, a.nivel)
    familia = decision.get("agent")
    print(f"TypeSafe: {familia or 'nadie'} ({decision.get('reason')})")
    if not familia:
        print("Nadie disponible ahora: el ticket espera.")
        return 3

    titulo = ticket.stem.replace("-", " ")
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
