# Brújula Cívica · contexto para agentes

Web estática y neutral para entender las propuestas políticas antes de votar (elecciones generales del 29/11/2026 y autonómicas andaluzas 2026). Publicada en https://ajgarciarias10.github.io/PorUnaDecisionCorrecta/ desde la rama `main` (GitHub Pages, raíz del repo). La rama de trabajo es `barracuda`; para publicar se hace `git branch -f main barracuda` y push de las dos.

## Reglas que no se negocian
- **Neutralidad**: misma plantilla y misma exigencia para todos los partidos; verbos descriptivos, sin adjetivos valorativos; las dos lecturas de cada dato igual de fuertes y de largas; nunca «izquierda/derecha»; orden aleatorio o alfabético. Detalle en `fuentes.html` («Cómo garantizamos la neutralidad»).
- **Nada inventado**: cada cifra sale de una fuente pública primaria (INE, CIS, Eurostat, Banco de España, AIReF, ministerios, CGPJ) con enlace y, si es posible, cita literal. Si no se puede verificar, no se pone. `programas.html` solo admite citas literales con página.
- **Privacidad**: nada de nombres ni texto libre de ciudadanos. Las respuestas anónimas van a una hoja privada (`recogida/`). `data/web.js`, `recogida/`, `*.csv` y `*.jsonl` nunca se mandan a modelos gratuitos.

## Mapa
- Páginas: `index.html`, `temas.html` (guías, `guias.js`), `termometro.html`, `comparar.html` (`datos.js`), `programas.html` (`programas.js`), `pulso.html` (`data/cis.js`, `data/fichas.js`, `data/web.js`), `aprender.html`, `fuentes.html`.
- Comunes: `comun.js` (menú, pie, `esc()`, `ENCUESTA_URL`), `estilos.css` (tokens en `:root`).
- Sin dependencias ni build: HTML/CSS/JS plano. Comprobar con Playwright (Python) a 1280 y 375 px: 0 errores de consola y sin scroll horizontal.

## Cómo se trabaja con agentes
- Los de pago (Claude, Codex con suscripción) deciden, escriben tickets en `tickets/` y revisan. TypeSafe elige el agente según su cuota: `python3 tool/despachar.py tickets/<t>.md --nivel bounded|top --run <run_id>`.
- Orca orquesta (`orca skills get orchestration`). OmniRoute (127.0.0.1:20128) controla el gasto: `omniroute-ctl estado|gasto|mcp|repo`. En este repo OmniRoute está encendido (`.omniroute`): Codex pasa por él.
- Herramientas MCP de OmniRoute para ahorrar: `omniroute_ccr_store`/`ccr_retrieve` para PDFs y logs grandes; `omniroute_route_request` para delegar trabajo mecánico a modelos gratuitos (nunca con datos de ciudadanos).
