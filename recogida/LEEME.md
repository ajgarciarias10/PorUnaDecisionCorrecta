# Recogida anónima de respuestas (Google Sheets)

La web envía, **solo si la persona marca la casilla de consentimiento**, estos datos del termómetro:
perfil general, tramo de edad, comunidad autónoma, 3 temas prioritarios y la posición (1–5) en los 12 ejes.
Nunca nombres, correos, texto libre, IP, hora exacta ni identificadores.

## Instalación (unos 5 minutos)

1. Crea una hoja nueva en Google Sheets (por ejemplo «Brújula Cívica · respuestas»). **No la compartas públicamente.**
2. Menú **Extensiones → Apps Script**. Borra el contenido y pega `apps-script.gs`. Guarda.
3. **Implementar → Nueva implementación → Tipo: Aplicación web**.
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario** (necesario para que la web pueda enviar; el script solo añade filas, no permite leer nada).
4. Autoriza los permisos y copia la **URL de la aplicación web** (termina en `/exec`).
5. Pega esa URL en `comun.js`, en `window.ENCUESTA_URL = '...'`, y publica. Hasta entonces el formulario de envío permanece oculto.

## Para descargar los datos
Archivo → Descargar → **CSV**. Guárdalo cifrado o en una carpeta con acceso restringido.

## Buenas prácticas
- Comparte la hoja solo con cuentas con verificación en dos pasos.
- Publica únicamente resultados **agregados** (porcentajes, medias), nunca filas sueltas, y no cruces filtros que dejen grupos de menos de 10 personas.
- Las opiniones políticas son datos especialmente protegidos (art. 9 RGPD). Al no guardar identificadores la información es anónima, pero mantén el consentimiento explícito y el aviso de privacidad de `fuentes.html#privacidad`.
