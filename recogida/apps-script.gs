/* Brújula Cívica · Receptor anónimo de respuestas (Google Apps Script).
   Seguridad:
   - Solo existe doPost: el script AÑADE filas y nunca devuelve datos. Nadie puede leer la hoja a través de la web.
   - La hoja es privada en tu Google Drive; solo la ven las cuentas con las que la compartas.
   - Cada campo se valida contra una lista cerrada; cualquier otro valor se descarta. No se aceptan textos libres.
   - No se guarda IP, hora exacta, navegador ni identificador: solo la fecha (día) de recepción.
   Instalación: ver recogida/LEEME.md */

const EJES = ['vivienda','fiscal','cuentas','servicios','educacion','trabajo','empresa','familia','clima','seguridad','migracion','territorio'];
const TEMAS = ['vivienda','sanidad','empleo','economia','impuestos','educacion','familia','mayores','seguridad','energia','agua','ambiente','cuidados','migracion'];
const PERFILES = ['ciudadania','empresa','autonomo','trabajo','estudios','mayores','familia','otro',''];
const EDADES = ['16-24','25-34','35-49','50-64','65+',''];
const TERRITORIOS = ['Andalucía','Aragón','Asturias','Illes Balears','Canarias','Cantabria','Castilla-La Mancha','Castilla y León','Cataluña','Comunitat Valenciana','Extremadura','Galicia','Comunidad de Madrid','Región de Murcia','Navarra','País Vasco','La Rioja','Ceuta','Melilla','Fuera de España',''];
const CABECERA = ['fecha','perfil','edad','territorio','prioridad_1','prioridad_2','prioridad_3'].concat(EJES.map(e => 'eje_' + e));

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || '';
    if (raw.length > 2000) return ok();
    const d = JSON.parse(raw);
    if (d.v !== 1 || d.web) return ok(); // versión desconocida o trampa anti-bots rellenada
    const uno = (v, lista) => lista.indexOf(v) >= 0 ? v : '';
    const prios = (Array.isArray(d.prioridades) ? d.prioridades : []).filter(t => TEMAS.indexOf(t) >= 0).slice(0, 3);
    while (prios.length < 3) prios.push('');
    const ejes = EJES.map(id => {
      const n = Number(d.ejes && d.ejes[id]);
      return isFinite(n) && n >= 1 && n <= 5 ? Math.round(n * 10) / 10 : '';
    });
    if (ejes.every(x => x === '') && prios.every(x => x === '')) return ok();
    const fila = [Utilities.formatDate(new Date(), 'Europe/Madrid', 'yyyy-MM-dd'),
      uno(d.perfil, PERFILES), uno(d.edad, EDADES), uno(d.territorio, TERRITORIOS)].concat(prios, ejes);
    const lock = LockService.getScriptLock();
    lock.waitLock(5000);
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('respuestas') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('respuestas');
    if (hoja.getLastRow() === 0) hoja.appendRow(CABECERA);
    hoja.appendRow(fila);
    lock.releaseLock();
  } catch (err) { /* nunca se devuelve información del error */ }
  return ok();
}

function ok() { return ContentService.createTextOutput('ok'); }
