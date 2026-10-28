/* Resúmenes editoriales de propuestas. Programas andaluces 2026; fuente RTVE + enlaces originales. No son leyes vigentes.
   Criterio de neutralidad: mismo verbo descriptivo para todos ("propone", "ampliar", "reducir"...), sin adjetivos valorativos,
   y una pregunta crítica por ficha que exige siempre coste/financiación + el efecto secundario que señalarían sus críticos. */
window.DATOS = {
 fecha:'28 de octubre de 2026',
 temas: [
  {id:'vivienda',label:'Vivienda',icon:'⌂',pregunta:'¿Cómo aumentará la oferta de vivienda asequible, en cuánto tiempo y con qué coste?',indicador:'Precio de compra y alquiler sobre la renta, viviendas terminadas, tasa de emancipación y seguridad jurídica de propietarios e inquilinos.'},
  {id:'sanidad',label:'Sanidad',icon:'✚',pregunta:'¿Cuánto mejorarán los tiempos de atención y con qué personal y presupuesto?',indicador:'Espera en atención primaria, listas quirúrgicas, coste por paciente y acceso territorial.'},
  {id:'empleo',label:'Empleo y salarios',icon:'↗',pregunta:'¿Creará empleo estable y mejor pagado? ¿Qué coste tiene para trabajadores, empresas y contribuyentes?',indicador:'Tasa de empleo y paro, temporalidad, salario real, productividad y siniestralidad.'},
  {id:'economia',label:'Empresa, autónomos y trámites',icon:'▣',pregunta:'¿Facilita crear, mantener y hacer crecer empresas? ¿Qué cargas y trámites cambian?',indicador:'Creación y cierre de empresas, tiempo de trámites, plazos de pago de la administración e inversión.'},
  {id:'impuestos',label:'Impuestos y gasto público',icon:'€',pregunta:'¿Quién paga más o menos, cuánto se recauda y qué servicios se financian?',indicador:'Recaudación, carga fiscal por nivel de renta, déficit y deuda, calidad de los servicios.'},
  {id:'educacion',label:'Educación',icon:'✎',pregunta:'¿Mejora el aprendizaje, la igualdad de oportunidades y la capacidad de elección de las familias?',indicador:'Resultados académicos, abandono escolar, ratios, plazas y acceso a FP y universidad.'},
  {id:'familia',label:'Familia y natalidad',icon:'☺',pregunta:'¿Cómo apoya a quien quiere tener hijos y a conciliar trabajo y familia?',indicador:'Natalidad, plazas de 0 a 3 años, coste de crianza y medidas de conciliación.'},
  {id:'mayores',label:'Pensiones y mayores',icon:'◔',pregunta:'¿Cómo se garantizan pensiones suficientes y sostenibles y la atención a las personas mayores?',indicador:'Pensión media real, gasto en pensiones sobre PIB, cotizantes por pensionista, soledad no deseada.'},
  {id:'seguridad',label:'Seguridad y justicia',icon:'⚖',pregunta:'¿Qué medidas reducen la delincuencia y agilizan la justicia, con qué medios y garantías?',indicador:'Balance de criminalidad, efectivos policiales, duración de los procedimientos judiciales y reincidencia.'},
  {id:'energia',label:'Energía',icon:'☀',pregunta:'¿Cómo se combinan precio asequible, suministro seguro, competitividad y emisiones?',indicador:'Precio de la factura, pobreza energética, seguridad de suministro, emisiones e impacto territorial.'},
  {id:'agua',label:'Agua y regadío',icon:'≈',pregunta:'¿Cómo se reparte el agua entre consumo humano, agricultura, industria y ecosistemas?',indicador:'Pérdidas en red, reservas, empleo agrario, estado de acuíferos y resiliencia ante sequías.'},
  {id:'ambiente',label:'Medio ambiente',icon:'✳',pregunta:'¿Qué objetivos ambientales medibles incluye y qué coste tiene para hogares, empresas y territorio?',indicador:'Emisiones, conservación, incendios, calidad del aire y coste de cumplimiento.'},
  {id:'cuidados',label:'Servicios sociales y dependencia',icon:'♥',pregunta:'¿Quién accede a las ayudas, cuánto tarda en recibirlas y cuánto cuestan?',indicador:'Pobreza y exclusión, tiempos de dependencia, cobertura, coste por persona atendida e inserción laboral.'},
  {id:'migracion',label:'Inmigración',icon:'◇',pregunta:'¿Qué corresponde a la comunidad y qué al Estado? ¿Qué efecto tiene en empleo, servicios, seguridad y convivencia?',indicador:'Empleo y afiliación, uso y coste de servicios, integración, llegadas irregulares y capacidad de acogida.'}
 ],
 partidos: [
  {id:'PP',programa:'https://www.rtve.es/contenidos/documentos/elecciones_andalucia_2026/programa_electoral_pp_2026.pdf'},
  {id:'PSOE',programa:'https://www.rtve.es/contenidos/documentos/elecciones_andalucia_2026/programa_electoral_psoe_2026.pdf'},
  {id:'Vox',programa:'https://www.rtve.es/contenidos/documentos/elecciones_andalucia_2026/programa_electoral_vox_2026.pdf'},
  {id:'Por Andalucía',programa:'https://porandalucia.org/programa-de-gobierno/'},
  {id:'Adelante Andalucía',programa:'https://www.rtve.es/contenidos/documentos/elecciones_andalucia_2026/programa_electoral_adelante_andalucia_2026_completo.pdf'}
 ],
 /* tema -> partido: [medida, mecanismo, pregunta crítica]. Los temas sin fichas aún no se han incorporado. */
 medidas: {
  vivienda:{
   'PP':['Ampliar en 20.000 las viviendas protegidas mediante una nueva fase del Plan Vive y ayudas de acceso.','Promoción de vivienda protegida y ayudas a la compra o el alquiler.','¿Cuántas serán de alquiler, cómo se asignarán y en qué plazo estarán terminadas?'],
   'PSOE':['Plan de 100.000 viviendas públicas asequibles en ocho años, en su mayoría de alquiler.','Construcción pública y declaración de zonas de alquiler tensionado.','¿Con qué suelo, presupuesto y plazos se alcanzaría esa cifra y cuántas viviendas se terminarían por legislatura?'],
   'Vox':['Liberar suelo no especialmente protegido y flexibilizar densidades y alturas edificables.','Aumento de la oferta mediante menos restricciones urbanísticas.','¿Cuánto tardaría el suelo liberado en convertirse en vivienda y a qué precio llegaría al comprador?'],
   'Por Andalucía':['Ampliar el alquiler público y aplicar zonas tensionadas con límites a nuevas rentas.','Oferta pública y regulación del precio del alquiler.','¿Qué efecto tendría el límite de rentas sobre la oferta de alquiler privado y con qué presupuesto se ampliaría el parque público?'],
   'Adelante Andalucía':['Incorporar al parque público inmuebles de la SAREB y exigir vivienda protegida en nuevas promociones.','Ampliación del parque público y reservas obligatorias en promociones privadas.','¿Cuántas viviendas se incorporarían, con qué coste, y cómo afectaría la reserva obligatoria a la construcción de nuevas promociones?']},
  sanidad:{
   'PP':['Nueva Ley de Salud de Andalucía y plan de infraestructuras y de puestos de difícil cobertura.','Reorganización del sistema e inversión en centros y equipamiento.','¿Qué indicadores de espera mejorarían, con qué presupuesto y en qué plazo?'],
   'PSOE':['Incrementar la financiación sanitaria en 3.000 millones e incorporar 18.000 profesionales.','Aumento del gasto y de las plantillas del sistema público.','¿En cuántos ejercicios, con qué financiación y de dónde saldrían esos profesionales si ya escasean?'],
   'Vox':['Aumentar el presupuesto sanitario y la capacidad hospitalaria, y auditar el gasto administrativo.','Inversión asistencial y reasignación de gasto administrativo.','¿Qué ahorro se espera de la auditoría y cuántos profesionales adicionales habría?'],
   'Por Andalucía':['Gestión pública directa y reserva de al menos el 25 % del presupuesto sanitario para atención primaria.','Refuerzo de atención primaria y revisión de conciertos con centros privados.','¿Qué coste tendría revertir conciertos y cómo se cubriría la actividad que hoy prestan mientras se amplía la red pública?'],
   'Adelante Andalucía':['Internalizar progresivamente servicios externalizados y plan de atención primaria con cita en 48 horas.','Gestión directa y reorganización de servicios sanitarios.','¿Cuánto costaría internalizar, con qué personal y cómo se verificaría el plazo de 48 horas?']},
  empleo:{
   'PP':['Reforzar la orientación y las escuelas del Servicio Andaluz de Empleo y las ayudas al trabajo autónomo.','Formación y apoyo a empresas y autoempleo.','¿Cuántos empleos estables se atribuirían a estas medidas y cómo se evaluará?'],
   'PSOE':['Estrategia de Empleo de Calidad y plan contra la temporalidad y la precariedad.','Incentivos a contratos indefinidos y seguimiento público.','¿Qué coste tienen los incentivos y cómo se evaluará si mejoran estabilidad y salarios?'],
   'Vox':['Ampliar la cuota cero para autónomos con ingresos inferiores al SMI y promover la formación dual.','Reducción de costes de cotización y capacitación profesional.','¿Cuántos autónomos se beneficiarían, qué coste tendría y cómo se compensaría?'],
   'Por Andalucía':['Plan de empleo municipal y refuerzo de la inspección y de la calidad del empleo.','Empleo público local y control de precariedad y siniestralidad.','¿Cuántos empleos serían permanentes y qué coste tendría para las arcas públicas?'],
   'Adelante Andalucía':['Jornada de 32 horas en el empleo público autonómico y medidas contra la temporalidad.','Cambio de condiciones de trabajo en el sector público.','¿Cómo se mantendrían los servicios con menos horas, cuánto personal adicional haría falta y con qué coste?']},
  impuestos:{
   'PP':['Continuar las rebajas del IRPF autonómico y ampliar deducciones por eficiencia energética.','Menor carga fiscal y estímulos a la inversión en vivienda.','¿Cuál sería el ahorro por nivel de renta, la pérdida recaudatoria y cómo se compensaría?'],
   'PSOE':['Reformar el tramo autonómico del IRPF para aumentar su progresividad y aliviar rentas medias y bajas.','Redistribución de la carga fiscal y lucha contra el fraude.','¿Qué tipos y tramos cambiarían, quién pagaría más y cuánto se recaudaría?'],
   'Vox':['Reducir impuestos autonómicos y proponer una simplificación nacional del IRPF.','Menor carga tributaria y cambio de la estructura fiscal.','¿Qué medidas dependen del Estado, cuánto se dejaría de recaudar y cómo se financiarían los servicios?'],
   'Por Andalucía':['Aumentar la progresividad fiscal y crear tributos ambientales.','Más recaudación y fiscalidad ligada a impactos ecológicos.','¿Sobre qué bases recaerían, qué hogares y empresas pagarían más y qué efecto tendría en precios y actividad?'],
   'Adelante Andalucía':['Impuesto andaluz sobre grandes fortunas y grandes propiedades, y tasa turística.','Tributación patrimonial y de la actividad turística.','¿Qué competencia normativa tiene la Junta, cuánto se prevé ingresar y qué riesgo hay de deslocalización o de menor actividad turística?']},
  educacion:{
   'PP':['Impulsar la FP Dual y mantener al menos un 1 % del PIB en inversión universitaria pública.','Formación vinculada al empleo y financiación universitaria.','¿Cómo se medirán el aprendizaje y la inserción laboral, y con qué presupuesto?'],
   'PSOE':['Reducir ratios de alumnado y crear nuevas plazas docentes hasta 2029-2030.','Más profesorado y aulas más pequeñas.','¿Con qué calendario, presupuesto y docentes disponibles?'],
   'Vox':['Revisar contenidos escolares y reforzar la educación concertada y la FP Dual.','Cambios curriculares y ampliación de la elección de centro.','¿Qué contenidos se revisarían, con qué procedimiento y qué efecto tendría sobre la red pública?'],
   'Por Andalucía':['Aumentar la financiación de centros públicos y frenar la ampliación de conciertos privados.','Reorientación de la inversión educativa hacia centros de titularidad pública.','¿Cómo se absorbería el alumnado, qué coste tendría y cómo afectaría a las familias que eligen centros concertados?'],
   'Adelante Andalucía':['Ampliar plazas públicas de FP y gratuidad de comedor, transporte y materiales escolares.','Reducción de costes para las familias y expansión de la oferta pública.','¿Cuál sería el presupuesto, el calendario y si la gratuidad sería universal o según renta?']},
  energia:{
   'PP':['Apoyar comunidades energéticas, autoconsumo y proyectos renovables con criterios de implantación territorial.','Inversión renovable y producción distribuida.','¿Cómo se medirían los beneficios para vecinos y municipios y el efecto en la factura?'],
   'PSOE':['Plan de ordenación de renovables y ayudas al autoconsumo y a familias en pobreza energética.','Planificación territorial y apoyo a hogares vulnerables.','¿Qué criterios decidirían dónde se instalan las grandes plantas y qué coste tendrían las ayudas?'],
   'Vox':['Mantener una combinación diversificada de tecnologías, incluida la energía nuclear avanzada.','Diversificación de tecnologías de generación.','¿Qué instalaciones serían viables legal y técnicamente en Andalucía, con qué plazos y costes?'],
   'Por Andalucía':['Crear una empresa pública de energía y promover 100.000 tejados solares.','Intervención pública en generación y comercialización.','¿Qué inversión inicial, riesgo para las cuentas públicas y gobernanza tendría la empresa?'],
   'Adelante Andalucía':['Empresa pública energética, regulación de macroplantas solares e impulso del autoconsumo.','Propiedad pública y control territorial del despliegue.','¿Cuál sería el coste de la empresa y qué efecto tendría la regulación sobre la inversión y los precios?']},
  agua:{
   'PP':['Modernizar la planificación hidrológica, las infraestructuras y el control de pérdidas.','Inversión hidráulica y digitalización.','¿Qué inversión y plazos tiene y cómo se ajustaría la demanda a la disponibilidad?'],
   'PSOE':['Invertir en depuración, desalación, reutilización y redes, y crear un Banco Público del Agua.','Diversificación del suministro y gestión pública de recursos.','¿Qué costes operativos y energéticos tendría cada actuación y quién los pagaría?'],
   'Vox':['Promover un Plan Nacional del Agua y modernizar regadíos e infraestructuras hidráulicas.','Aumento de la capacidad de abastecimiento y regadío.','¿Qué agua habría disponible en sequías prolongadas y qué coste e impacto ambiental tendrían las obras?'],
   'Por Andalucía':['Gestión pública del agua, control de la demanda y moratoria a nuevos regadíos.','Contención de extracciones y protección de acuíferos.','¿Qué efecto tendría la moratoria sobre el empleo y la renta agraria y cómo se compensaría?'],
   'Adelante Andalucía':['Recuperar la gestión pública del ciclo urbano del agua y ampliar depuración y saneamiento.','Gestión directa y nuevas infraestructuras públicas.','¿Qué coste tendría el cambio de modelo de gestión y cómo afectaría a las tarifas?']},
  ambiente:{
   'PP':['Estrategia ambiental andaluza y actualización de la política de espacios naturales.','Planificación ambiental y protección territorial.','¿Qué metas verificables de emisiones y biodiversidad propone y con qué calendario?'],
   'PSOE':['Presupuestos de carbono vinculantes y autoridad técnica independiente de acción climática.','Metas climáticas obligatorias y evaluación de resultados.','¿Qué coste tendrían para hogares y empresas y qué ocurriría si se incumplen?'],
   'Vox':['Gestión activa del monte y simplificación de normas en espacios protegidos; se opone a parte del Pacto Verde europeo.','Menos cargas normativas y gestión del territorio rural.','¿Cómo se garantizaría el cumplimiento de los objetivos ambientales comprometidos y la prevención de incendios?'],
   'Por Andalucía':['Declarar la emergencia climática y crear un plan de resiliencia ante fenómenos extremos.','Adaptación climática y protección de ecosistemas.','¿Qué efectos jurídicos tendría la declaración, qué actuaciones serían prioritarias y con qué coste?'],
   'Adelante Andalucía':['Ley de emergencia climática y destinar al menos un 2 % del PIB regional a política ambiental.','Gasto público ambiental e instrumentos legales.','¿De dónde saldría ese 2 % del PIB, qué partidas se reducirían y cómo se evaluaría el impacto?']},
  migracion:{
   'PP':['Estrategia andaluza de inclusión de personas migrantes y petición de fondos extraordinarios al Estado como frontera sur.','Coordinación autonómica, acompañamiento laboral y petición de recursos al Estado.','¿Qué programas se financiarían, con qué indicadores y qué ocurre si el Estado no aporta los fondos?'],
   'PSOE':['Reforzar recursos de acogida, protección de menores y coordinación de políticas migratorias.','Servicios de acogida, protección jurídica y coordinación institucional.','¿Con qué presupuesto y cómo se repartirían responsabilidades y costes entre administraciones?'],
   'Vox':['Vincular determinadas ayudas a la residencia legal y oponerse a nuevos centros de acogida.','Cambio de criterios de acceso a prestaciones y posición autonómica sobre centros.','¿Qué medidas son competencia autonómica, cuál es su base jurídica y qué efecto tendrían?'],
   'Por Andalucía':['Apoyar la inserción sociolaboral de migrantes y mejorar la atención a menores no acompañados.','Programas sociales, lucha contra la discriminación y coordinación local.','¿Cómo se mediría la integración, con qué coste y con qué capacidad de acogida?'],
   'Adelante Andalucía':['Crear un observatorio contra el racismo y reforzar la mediación y la atención sanitaria con independencia de la situación administrativa.','Prevención de discriminación y servicios de integración social.','¿Qué coste tendría la atención sanitaria ampliada, qué competencias se ejercen y cómo se financiaría?']},
  cuidados:{
   'PP':['Agilizar la renta mínima, ampliar la atención a la dependencia y consolidar la tarjeta social.','Simplificación administrativa del acceso a prestaciones y servicios.','¿Qué plazos máximos y cobertura se garantizan y con qué presupuesto?'],
   'PSOE':['Sistema andaluz de cuidados y escudo social coordinado de garantía de ingresos.','Integración de servicios y prestaciones.','¿Cuáles serían los requisitos, el coste y la coordinación con el Ingreso Mínimo Vital?'],
   'Vox':['Vincular ayudas sociales a la residencia legal y ampliar plazas de dependencia.','Cambios de requisitos y ampliación de la atención residencial.','¿Qué prestaciones cambiarían, con qué base jurídica, y cuántas plazas nuevas habría y cuándo?'],
   'Por Andalucía':['Reducir las esperas de dependencia y reforzar la ayuda a domicilio.','Más atención social y cambios en las condiciones del servicio.','¿Qué plazas y profesionales se añadirían y con qué coste?'],
   'Adelante Andalucía':['Sistema público de cuidados y gestión directa del servicio de ayuda a domicilio.','Prestación y gestión pública de servicios de dependencia.','¿Cuánto costaría la transición a gestión directa y cómo afectaría a las empresas y trabajadores actuales del sector?']}
 },
 fuenteComparador:'https://www.rtve.es/noticias/elecciones-andalucia/comparador-programas-electorales/',
 fuenteBOE:'https://www.boe.es/buscar/doc.php?id=BOE-A-2026-20742',
 /* Orden alfabético. Todos los documentos de 2023 se marcan igual: son archivo, no programa del 29N. */
 nacionales:[
  ['BNG','Web oficial · programa de 2023 (archivo)','https://www.bng.gal/'],
  ['Coalición Canaria','Web oficial · programa de 2023 (archivo)','https://coalicioncanaria.org/'],
  ['Compromís','Web oficial · programa de 2023 (archivo)','https://compromis.net/'],
  ['EH Bildu','Web oficial · programa de 2023 (archivo)','https://ehbildu.eus/'],
  ['ERC','Web oficial · programa de 2023 (archivo)','https://www.esquerra.cat/'],
  ['Junts','Web oficial · programa de 2023 (archivo)','https://junts.cat/'],
  ['PNV','Web oficial · programa de 2023 (archivo)','https://www.eaj-pnv.eus/'],
  ['Podemos','Web oficial · programa de 2023 (archivo)','https://podemos.info/'],
  ['PP','Programa generales 2023 (archivo)','https://www.pp.es/sites/default/files/documentos/programa_electoral_pp_23j_feijoo_2023.pdf'],
  ['PSOE','Programa generales 2023 (archivo)','https://www.psoe.es/media-content/2023/07/PROGRAMA_ELECTORAL-GENERALES-2023.pdf'],
  ['Sumar','Programa generales 2023 (archivo)','https://programaelectoral.org/partidos/sumar'],
  ['UPN','Web oficial · programa de 2023 (archivo)','https://www.upn.org/'],
  ['Vox','Programa generales 2023 (archivo)','https://www.voxespana.es/programa/programa-electoral-Vox']
 ]
};
