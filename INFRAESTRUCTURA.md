# Infraestructura de agentes · Orca + TypeSafe + OmniRoute

Cómo se trabaja con agentes de IA en este proyecto (y en el resto de proyectos del servidor). Aquí no hay claves ni contraseñas: solo dónde están y cómo se usan.

## Reparto de papeles

```
Tú (PC o móvil) ─► Orca ─► Claude / Codex (suscripción: deciden, escriben tickets, revisan)
                    │            │
                    │            ├─ llamadas normales ─► OmniRoute ─► Anthropic / OpenAI
                    │            └─ route_request ────► OmniRoute ─► modelos gratuitos (auto/thrifty)
                    │
                    └─ tool/despachar.py ─► TypeSafe (elige agente según cuota) ─► worker de Orca
```

| Pieza | Qué hace | Dónde |
|---|---|---|
| **Orca** 1.4.243 | Orquesta: terminales, worktrees, workers, acceso desde el móvil | `orca-serve` (systemd de usuario), `wss://orca.143-47-57-36.sslip.io` |
| **TypeSafe** | Decide qué agente lanzar según la cuota real de cada suscripción | `127.0.0.1:47900`, cliente `~/projects/CleverTracker/tool/pedir_agente.py` |
| **OmniRoute** 3.8.52 | Pasarela de modelos: comprime, cuenta el gasto, pone límites, respaldo y enrutado a gratuitos | Docker en `~/docker/omniroute`, solo `127.0.0.1:20128` |

## OmniRoute

- **Panel:** http://127.0.0.1:20128 desde el navegador interno de Orca (o túnel `ssh -N -L 20128:127.0.0.1:20128 ubuntu@143.47.57.36`). Contraseña: `INITIAL_PASSWORD` en `~/docker/omniroute/.env`.
- **Suscripciones importadas:** Claude (token de `claude setup-token`, válido 1 año) y Codex (sesión de ChatGPT propia). Si caducan, se repite la importación; no borrarlas del panel.
- **Claves por agente** (en `~/.config/omniroute-claves.env`, chmod 600) con límite diario estimado en USD:

  | Clave | Uso | Límite/día |
  |---|---|---|
  | `pago` | Claude y Codex en repos encendidos | 40 |
  | `agentes-mcp` | herramientas MCP (delegar, guardar contexto) | 2 |
  | `agente-typesafe` | TypeSafe | 1 |
  | `obreros` | scripts y trabajo mecánico con modelos gratuitos | 1 |

- **Compresión** `stacked` (session-dedup → rtk → lite), con el prompt de sistema preservado.
- **Bloqueados** los 9 proveedores sin clave (aihorde, duckduckgo-web, …): podrían quedarse con lo que reciben. No desbloquear.

### Encender o apagar OmniRoute en un repo

```
omniroute-ctl repo on [ruta]    # crea .git/omniroute: vale para todos los worktrees del repo
omniroute-ctl repo off [ruta]
omniroute-ctl repo              # lista dónde está encendido
```

Encendido en los 8 proyectos de Orca: PorUnaDecisionCorrecta, CleverTracker, F1-BUGAMBRA, ajgarciarias10.github.io, vsparadigm-at-linux, servidor-MineAlhambra, OrcaGEstion y C1-English.

Lo hacen dos envoltorios en `~/.local/omniroute-bin/` (primero en el PATH):
- `codex` añade `-p omniroute` (perfil `~/.codex/omniroute.config.toml`).
- `claude` exporta `ANTHROPIC_BASE_URL` y la clave `pago`; si OmniRoute no responde, Claude llama directo.

Efectos: los agentes ya abiertos siguen directos hasta reiniciarlos; en esas sesiones Claude no carga los conectores de claude.ai (Gmail, Calendar…). Los servicios systemd no ven los envoltorios.

### Otras órdenes

```
omniroute-ctl estado                 # salud, compresión, proveedores, claves
omniroute-ctl gasto [day|week|month] # peticiones, tokens y gasto por clave
omniroute-ctl mcp [activar|desactivar <herramienta>]
omniroute-ctl logs | reiniciar | claves
```

## Gastar menos

- **OmniRoute no elige el modelo según la dificultad de la tarea.** Si un agente pide Opus, recibe Opus. Solo elige cuando se le pide un id automático (`auto/thrifty`, `auto/cheap`, `auto/coding:cheap`…), y entonces escoge proveedor por cuota, salud y coste.
- **Claude** arranca en `opusplan`: Opus para planificar, Sonnet para ejecutar. Su subagente de búsqueda ya usa Haiku.
- **Trabajo mecánico** (resumir PDFs públicos, formatear, traducir): delegarlo con la herramienta MCP `omniroute_route_request` y `model: auto/thrifty`. Para PDFs y logs grandes, `omniroute_ccr_store` / `ccr_retrieve`.
- **Pendiente:** añadir en el panel (Providers) las claves gratuitas de Gemini, Groq, Cerebras y OpenRouter. Sin ellas `auto/thrifty` no tiene modelos gratuitos.

## Privacidad (no se negocia)

- `data/web.js`, `recogida/`, `*.csv` y `*.jsonl` (datos de ciudadanos) **nunca** van a modelos gratuitos, tampoco OpenCode Free Tier. `tool/despachar.py` fuerza el nivel `top` (Claude o Codex de pago) si un ticket los toca.
- Las claves nunca se pegan en el chat: van a ficheros con chmod 600.
- El puerto de OmniRoute no se expone a internet.

## Despachar un ticket

```
python3 tool/despachar.py tickets/<ticket>.md --nivel bounded|top --run <run_id> [--simular]
```

Formato del ticket en la cabecera de `tool/despachar.py` (las rutas de «Ficheros en propiedad:» van entre comillas invertidas o TypeSafe responde `sin_elegibles`).

## Mantenimiento

- **Actualizar Orca:** descargar el `.deb` arm64 de https://github.com/stablyai/orca/releases, `sudo dpkg -i <deb>` y `systemctl --user restart orca-serve`. Las terminales sobreviven (el daemon de terminales es aparte).
- **Actualizar OmniRoute:** cambiar la versión fijada en `~/docker/omniroute/docker-compose.selfhost.yml` y `omniroute-ctl reiniciar`. No perder `STORAGE_ENCRYPTION_KEY` del `.env`: sin ella se pierde la base de datos.
- **Capacidad medida** (ARM, 4 núcleos, 24 GB): OmniRoute ~400–800 MB; el cuello de botella son las sesiones de agentes (350–500 MB cada una).
