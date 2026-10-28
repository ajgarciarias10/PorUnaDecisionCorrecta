/* URL de la aplicación web de Google Apps Script (ver recogida/LEEME.md). Vacía = no se envía nada y el formulario no aparece. */
window.ENCUESTA_URL='';
(function(){
const nav=[['index.html','Inicio'],['temas.html','Entender los temas'],['termometro.html','Mi termómetro'],['comparar.html','Comparar propuestas'],['programas.html','Programas íntegros'],['aprender.html','Verificar'],['pulso.html','Pulso ciudadano'],['fuentes.html','Fuentes']];
const actual=location.pathname.split('/').pop()||'index.html';
const h=document.querySelector('#cabecera');if(h) h.innerHTML=`<a class="skip" href="#contenido">Saltar al contenido</a><header class="top"><div class="container nav"><a class="brand" href="index.html"><span class="brand-ico" aria-hidden="true">✳</span><span>Brújula <span class="strong">Cívica</span></span></a><nav class="links" aria-label="Navegación principal">${nav.map(([f,n])=>`<a href="${f}" ${f===actual?'aria-current="page"':''}>${n}</a>`).join('')}</nav></div></header>`;
const footer=document.querySelector('#pie');if(footer)footer.innerHTML=`<footer class="footer"><div class="container foot-row"><div><strong>Brújula Cívica</strong> · Información pública, explicaciones y contrastes sin recomendaciones electorales.<br>Fuentes fechadas · 28/10/2026 · Proyecto didáctico independiente.</div><div>No utilizamos cuentas ni guardamos nombres. El termómetro funciona en tu navegador y solo envía resultados anónimos si tú lo aceptas.<br><a href="fuentes.html">Metodología y fuentes</a></div></div></footer>`;
window.leer=(clave,def)=>{try{return JSON.parse(localStorage.getItem('bc_'+clave))??def}catch{return def}};
window.guardar=(clave,val)=>{try{localStorage.setItem('bc_'+clave,JSON.stringify(val))}catch{}};
window.esc=(x)=>String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
})();
