/* PROGRAMAS ÍNTEGROS · Elecciones generales del 29 de noviembre de 2026.
   Regla de oro: aquí solo van CITAS LITERALES copiadas del documento oficial del partido, sin resumir ni corregir.

   Cómo añadir el programa de un partido cuando se publique:
   1. Rellena `programa` (URL del documento oficial) y `publicado` ('AAAA-MM-DD').
   2. Añade cada propuesta a `citas`:
        {tema:'vivienda', perfiles:['ciudadania','trabajo'], texto:'Texto exacto del programa.', pagina:42}
      - tema: uno de los id de DATOS.temas (vivienda, sanidad, empleo, economia, impuestos, educacion, familia,
        mayores, seguridad, energia, agua, ambiente, cuidados, migracion).
      - perfiles: a quién afecta directamente: ciudadania, empresa, trabajo, estudios, mayores.
      - pagina: página del PDF donde aparece, para que cualquiera pueda comprobarla.
   3. Procura incluir un número parecido de citas por partido y tema, para no dar más visibilidad a nadie. */
window.PROGRAMAS={
 eleccion:'Elecciones generales · 29 de noviembre de 2026',
 perfiles:{ciudadania:'Ciudadanía en general',empresa:'Empresas y autónomos',trabajo:'Trabajadores',estudios:'Estudiantes',mayores:'Personas mayores'},
 /* Orden alfabético; la página los muestra barajados. */
 partidos:[
  {id:'BNG',web:'https://www.bng.gal/',programa:null,publicado:null,citas:[]},
  {id:'Coalición Canaria',web:'https://coalicioncanaria.org/',programa:null,publicado:null,citas:[]},
  {id:'Compromís',web:'https://compromis.net/',programa:null,publicado:null,citas:[]},
  {id:'EH Bildu',web:'https://ehbildu.eus/',programa:null,publicado:null,citas:[]},
  {id:'ERC',web:'https://www.esquerra.cat/',programa:null,publicado:null,citas:[]},
  {id:'Junts',web:'https://junts.cat/',programa:null,publicado:null,citas:[]},
  {id:'PNV',web:'https://www.eaj-pnv.eus/',programa:null,publicado:null,citas:[]},
  {id:'Podemos',web:'https://podemos.info/',programa:null,publicado:null,citas:[]},
  {id:'PP',web:'https://www.pp.es/',programa:null,publicado:null,citas:[]},
  {id:'PSOE',web:'https://www.psoe.es/',programa:null,publicado:null,citas:[]},
  {id:'Sumar',web:'https://movimientosumar.es/',programa:null,publicado:null,citas:[]},
  {id:'UPN',web:'https://www.upn.org/',programa:null,publicado:null,citas:[]},
  {id:'Vox',web:'https://www.voxespana.es/',programa:null,publicado:null,citas:[]}
 ]
};
