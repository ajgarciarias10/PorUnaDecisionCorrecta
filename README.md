# Brújula Cívica · Por una decisión correcta

Web educativa y neutral para entender las propuestas políticas antes de votar. Sin recomendaciones de voto, sin cuentas y sin publicidad.

- `index.html` — portada
- `temas.html` — 14 guías (vivienda, empleo, empresa, impuestos, familia, pensiones, seguridad, energía…) — datos en `guias.js`
- `termometro.html` — 24 dilemas en 12 ejes económicos y de valores, con lados sorteados
- `comparar.html` — fichas resumidas de los programas andaluces 2026 — datos en `datos.js`
- `programas.html` — citas literales de los programas de las generales del 29N — datos en `programas.js` (instrucciones dentro)
- `pulso.html` — Pulso ciudadano: serie del CIS (`data/cis.js`), respuestas de la web (`data/web.js`) y datos comprobables (`data/fichas.js`)
- `aprender.html` — ejercicios de verificación
- `fuentes.html` — metodología, criterios de neutralidad, privacidad y fuentes
- `recogida/` — receptor anónimo opcional en Google Sheets (instrucciones en `recogida/LEEME.md`)

Sitio estático: se abre con cualquier navegador o desde GitHub Pages.

## Cómo trabajan los agentes en este repo

Contexto para agentes en `AGENTS.md` (Claude lo carga desde `CLAUDE.md`).

- **Los de pago deciden** (Claude y Codex con suscripción): planifican, escriben los tickets y revisan. TypeSafe elige cuál según su cuota real.
- **Orca** lanza y vigila a los agentes; **OmniRoute** (`127.0.0.1:20128`, solo local) controla el gasto, comprime y hace de respaldo.
- En este repo OmniRoute está **encendido** (`omniroute-ctl repo on`): los Codex que se abren aquí pasan por él.
- Un ticket que toque datos de ciudadanos (`data/web.js`, `recogida/`, `.csv`) nunca va a modelos gratuitos.

```
python3 tool/despachar.py tickets/<ticket>.md --nivel bounded|top --run <run_id> [--simular]
```

El ticket necesita `# Título`, `Terminado cuando:` y `Ficheros en propiedad:` con las rutas entre comillas invertidas.
