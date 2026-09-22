# -*- coding: utf-8 -*-
# Secciones adicionales por articulo (se agregan antes de la ultima seccion) y correcciones
# de titulo/descripcion al rango que Google muestra (titulo <= 62, descripcion <= 158).
EXTRA = {
'como-automatizar-whatsapp-business-colombia': {
 'titulo': 'Cómo automatizar WhatsApp Business en tu empresa (guía)',
 'secciones': [
  {'h2': 'Un caso concreto: la cancha del viernes a las 8', 'html': """    <p>Un jugador escribe a las 7:40 de la noche: "hay cancha hoy tipo 9 pa 12". El asistente entiende que busca hoy, hacia las 9, para doce personas; consulta la agenda, ve que la cancha de fútbol 7 está libre a las 9 y la de fútbol 5 no sirve para doce; responde con la de 7, el precio y el abono; el jugador dice "dale" y manda el nombre; la hora queda apartada y el dueño ve la reserva en su agenda sin haber tocado el teléfono. Si el jugador hubiera preguntado algo raro —"¿me dejan meter parrilla?"— el asistente habría pasado la conversación al dueño con el contexto completo. Esa conversación entera cuesta centavos, porque solo la parte ambigua tocó el modelo de lenguaje.</p>"""},
  {'h2': 'Cómo empezar en tres pasos', 'html': """    <ol>
      <li><strong>Listar las diez preguntas que más llegan.</strong> Horarios, precios, ubicación, disponibilidad, formas de pago. Eso es lo que primero se automatiza, y casi siempre son reglas, no IA.</li>
      <li><strong>Tener los datos en un sistema.</strong> Agenda, precios, inventario. Si viven en la cabeza de alguien, el asistente no tiene qué consultar. Este paso es el que decide si la automatización funciona.</li>
      <li><strong>Conectar y medir.</strong> Conectar por QR, dejar el asistente atendiendo, y medir dos números cada semana: qué porcentaje resolvió solo y qué porcentaje pasó a una persona. Lo que pasa a una persona por lo mismo tres veces es la siguiente regla que hay que agregar.</li>
    </ol>"""},
 ]},
'automatizar-whatsapp-ferreterias-colombia': {
 'titulo': 'Automatizar el WhatsApp de una ferretería: cotizar sin perder',
 'descripcion': 'Una ferretería recibe listas por WhatsApp todo el día. Cómo un sistema con inventario y precios cotiza, arma el pedido y recuerda cartera sin frenar el mostrador.',
 'secciones': [
  {'h2': 'Un ejemplo: la lista del contratista', 'html': """    <p>Un contratista manda un audio a las 6:50 de la mañana con catorce ítems. El asistente lo transcribe, reconoce once referencias con su código interno, detecta que dos ("el pegante ese azul", "la brocha grande") son ambiguas y una no existe en el inventario. Responde con la cotización de las once a la lista de precios de contratista, pregunta por las dos ambiguas con las opciones que hay, y avisa que la tercera no la maneja pero puede conseguirla. El contratista confirma, y a las 7:05 el mostrador tiene el pedido armado para alistar. Antes, ese mismo pedido se cotizaba a las 9, cuando abría la ferretería, y a veces el contratista ya había comprado en otro lado.</p>"""},
 ]},
'whatsapp-automatico-juridicos-colombia': {
 'descripcion': 'Qué puede automatizar un despacho en WhatsApp —filtrar por área, agendar, informar requisitos— sin dar asesoría ni comprometer la confidencialidad del cliente.',
 'secciones': [
  {'h2': 'Cómo se ve en una semana normal', 'html': """    <p>Lunes, 8 a.m.: doce mensajes acumulados del fin de semana. Antes, la asistente los leía uno por uno y le pasaba al abogado los que parecían serios. Ahora el asistente ya clasificó nueve por área, agendó tres primeras citas para la semana con el abogado de familia, respondió a dos que la firma no atiende derecho penal (con respeto y sin dejarlos colgados), y dejó uno —un mensaje largo con una situación compleja— marcado para que el abogado lo lea con calma. La asistente empieza la semana revisando un resumen, no una bandeja.</p>
    <p>Lo que la firma mide al mes: cuántas primeras citas se agendaron sin intervención, cuántas se cumplieron gracias al recordatorio, y cuánto tiempo de abogado se dejó de gastar en consultas que no eran del área.</p>"""},
 ]},
'whatsapp-business-hoteles-colombia': {
 'titulo': 'WhatsApp automático para hoteles: reservas sin agotar recepción',
 'descripcion': 'Cómo un hotel pequeño o mediano atiende disponibilidad, tarifas, reservas y anticipos por WhatsApp con un asistente conectado a su calendario real.',
 'secciones': [
  {'h2': 'El puente festivo, con y sin asistente', 'html': """    <p>Sin asistente: el jueves antes del puente, recepción recibe sesenta mensajes preguntando disponibilidad; contesta veinte antes del mediodía; a la tarde, la mitad de los que preguntaron ya reservaron en otro hotel; los que quedan reservan sin anticipo y dos no llegan el viernes. Con asistente: los sesenta reciben disponibilidad y tarifa en segundos; treinta reservan; a los treinta se les pide el anticipo con el plazo claro; veintiséis lo mandan; la recepción aprueba los comprobantes desde el celular en diez minutos, y las cuatro habitaciones que no recibieron anticipo se liberan el jueves en la noche y se venden el viernes temprano. La diferencia no es tecnología: es que nadie contestó tarde y ninguna reserva quedó en el aire.</p>"""},
 ]},
'chatbot-ia-clinicas-colombia': {
 'titulo': 'Chatbot con IA para clínicas: citas, recordatorios y límites',
 'descripcion': 'Qué automatizar en el WhatsApp de una clínica —citas, confirmaciones, requisitos— y qué debe quedar siempre en manos del personal. Con datos de salud, el límite importa.',
 'secciones': [
  {'h2': 'Cómo se configura el límite clínico', 'html': """    <p>No es una promesa, es una lista. Antes de encender el asistente, el personal de la clínica define qué palabras y qué tipos de mensaje son clínicos —síntomas, dolor, medicamentos, dosis, resultados, urgencia— y qué respuesta reciben: "Ese tema lo atiende directamente el profesional; le comunico con recepción ahora" y el paso inmediato a una persona, o a la línea de urgencias si el mensaje sugiere una. Esa lista se prueba con mensajes reales antes de salir a producción y se revisa cada mes con lo que llegó. El asistente que se equivoca en administrativo molesta; el que se equivoca en clínico hace daño. Por eso el límite se configura con la clínica, no lo decide el proveedor.</p>"""},
 ]},
'chatbot-ia-inmobiliarias-colombia': {
 'descripcion': 'Cómo una inmobiliaria filtra los "¿todavía está disponible?", califica al interesado y agenda visitas por WhatsApp sin perder al asesor en mensajes.',
 'secciones': [
  {'h2': 'Las cuatro preguntas, y cómo se hacen sin que suene a interrogatorio', 'html': """    <p>El asistente no manda un formulario. Responde primero lo que preguntaron —"sí, el apartamento de la 45 sigue disponible, la administración es de 280.000"— y en el mismo mensaje pregunta lo siguiente natural: "¿lo buscas para arriendo o para compra?". Después, "¿para cuándo lo necesitas?", y con la respuesta ofrece la visita. El presupuesto lo infiere del inmueble por el que preguntó y solo lo confirma si va a ofrecer alternativas. En cuatro mensajes el interesado quedó calificado y con visita, y sintió que le contestaron, no que lo filtraron. Cuando el asesor entra, ya sabe qué busca, dónde, con cuánto y para cuándo.</p>"""},
 ]},
'cuanto-cuesta-chatbot-ia-colombia': {
 'titulo': '¿Cuánto cuesta un chatbot con IA en Colombia? Lo que mueve el precio',
 'descripcion': 'El precio de un chatbot está en a qué datos se conecta y cuántas conversaciones van al modelo de IA. Cómo estimarlo y qué preguntar antes de contratar.',
 'secciones': [
  {'h2': 'Un ejemplo con números de operación', 'html': """    <p>Una cancha sintética activa recibe unas 300 conversaciones al mes por WhatsApp. Si todas van a un modelo de lenguaje grande, con conversaciones de varios mensajes cada una, el gasto en tokens supera lo que el negocio paga de mensualidad: medimos alrededor de 84.000 pesos al mes en un negocio real, contra una mensualidad de 70.000. Con el asistente híbrido —reglas para horarios, precios, ubicación, confirmaciones y respuestas cortas— menos de una de cada cinco conversaciones toca el modelo, y el gasto baja a unos pocos miles de pesos al mes. El costo no lo decide el proveedor de IA: lo decide el diseño del asistente.</p>"""},
 ]},
'que-es-n8n-automatizacion-colombia': {
 'descripcion': 'n8n conecta aplicaciones y automatiza tareas sin programar cada conexión. Qué hace bien, dónde se queda corto y cuándo conviene más un sistema propio.',
 },
'sistema-gestion-droguerias-colombia': {
 'descripcion': 'Qué necesita el sistema de una droguería: lotes y vencimientos, fiado por cliente, turnos de caja y pedidos al distribuidor. Y qué no resuelve un software genérico.',
 'secciones': [
  {'h2': 'Un día con el sistema', 'html': """    <p>7 a.m.: la regente abre el turno con la base en caja. El sistema le muestra tres productos que vencen en menos de treinta días y dos que están por debajo del mínimo. 10 a.m.: doña Marta compra 42.000 y pide fiado; el sistema muestra que debe 38.000 de hace dos semanas y que su límite es 100.000; se registra. 2 p.m.: llega el distribuidor; la entrada se registra por lote con fecha de vencimiento, y el costo actualiza el margen. 6 p.m.: cambio de turno; se cuenta, el sistema dice cuánto debería haber por medio de pago, la diferencia queda con nombre. 8 p.m.: el dueño, desde la casa, ve la venta del día por producto y el pedido sugerido para mañana. Nada de eso requirió Excel.</p>"""},
 ]},
'sistema-gestion-talleres-mecanicos-colombia': {
 'descripcion': 'Qué resuelve un sistema para taller: la orden de trabajo por vehículo, repuestos, mano de obra por mecánico, cotización aprobada por WhatsApp y cobro que cuadra.',
 'secciones': [
  {'h2': 'La orden de un carro, de principio a fin', 'html': """    <p>Entra un carro con ruido en la suspensión. Se abre la orden con placa y kilometraje; el mecánico diagnostica y registra: amortiguadores delanteros y una bujía. El sistema arma la cotización con el repuesto (del inventario, con su costo y margen) y la mano de obra (dos horas de Andrés), y la manda por WhatsApp al cliente con una foto del amortiguador vencido. El cliente aprueba a las 11:20; la aprobación queda en la orden. A mitad de la reparación aparece un terminal partido: se agrega, se cotiza el adicional, se aprueba igual. Al cerrar, la cuenta es la orden: repuestos, mano de obra, IVA. Se cobra por Nequi, entra a la caja del día, y las dos horas de Andrés quedan para su liquidación de quincena. Si el cliente vuelve en seis meses, el historial de la placa está ahí.</p>"""},
 ]},
'app-movil-supermercado-colombia': {
 'descripcion': 'Antes de una app de domicilios, un supermercado necesita inventario y precios en un sistema. Qué debe tener la app, cómo se conecta con la caja, y cuándo basta WhatsApp.',
 'secciones': [
  {'h2': 'El pedido por WhatsApp, paso a paso', 'html': """    <p>La señora del tercer piso manda: "2 libras de arroz, un aceite de litro, pan tajado y una leche deslactosada". El asistente reconoce los cuatro productos contra el inventario, ve que hay dos marcas de aceite y pregunta cuál (con precios), confirma el total con el cargo de domicilio de su zona, y pregunta cómo paga. Ella dice "efectivo"; el pedido entra a la caja como venta pendiente de cobro, se asigna al domiciliario, y cuando él vuelve con la plata, se cierra. El inventario ya descontó los cuatro productos cuando salió el pedido, así que la app —o el siguiente cliente por WhatsApp— no vende la última leche dos veces.</p>"""},
 ]},
'automatizacion-procesos-constructoras-colombia': {
 'titulo': 'Automatización de procesos en constructoras: obra, compras, cortes',
 'secciones': [
  {'h2': 'Un ejemplo: el corte de la quincena', 'html': """    <p>El contratista de mampostería avanzó, según su reporte, 380 metros cuadrados. El residente reportó desde el celular, con foto, 362. El precio unitario pactado está en el sistema, igual que la retención de garantía del 10 %. El corte sale calculado con los 362 del residente, se le manda al contratista por WhatsApp con el detalle, y la diferencia de 18 metros se discute sobre las fotos, no sobre la memoria de nadie. El gerente ve, en la misma pantalla, que ese capítulo va en el 71 % de ejecución con el 68 % del presupuesto gastado. Antes, ese número existía a fin de mes, en un Excel, y cuando existía ya era tarde para corregir.</p>"""},
  {'h2': 'Qué medir en los primeros tres meses', 'html': """    <ul>
      <li>Cuántos días pasan entre que algo ocurre en la obra y que aparece en el sistema. La meta es cero.</li>
      <li>Cuántos capítulos del presupuesto tienen alerta antes de pasarse, y no después.</li>
      <li>Cuántos cortes se aprobaron sin discusión.</li>
    </ul>"""},
 ]},
'facturacion-electronica-automatica-colombia': {
 'titulo': 'Facturación electrónica automática: integrarla al sistema',
 'descripcion': 'La factura electrónica ya es obligatoria; lo que sigue costando es digitarla aparte. Cómo se integra con el sistema de la empresa y qué hace el proveedor tecnológico.',
 'secciones': [
  {'h2': 'Los errores que la integración evita', 'html': """    <p>Un NIT mal digitado, un ítem con IVA del 19 % facturado al 5 %, una cantidad de 12 que en la factura quedó 21. Cada uno termina en una nota crédito, una factura nueva, y un cliente que recibió dos documentos y llama a preguntar. Cuando la factura sale del mismo dato de la venta, esos errores desaparecen porque el dato se escribió una vez. Lo que queda es el error de la venta misma, que es más fácil de ver y corregir antes de emitir.</p>"""},
 ]},
'inteligencia-artificial-negocios-colombia': {
 'descripcion': 'Dónde la IA sirve hoy en una pyme colombiana —atender WhatsApp, transcribir audios, leer comprobantes— y dónde es una promesa cara. Con lo medido en producción.',
 'secciones': [
  {'h2': 'Tres usos que se pueden encender esta semana', 'html': """    <ul>
      <li><strong>Transcribir los audios del WhatsApp del negocio</strong> para que queden buscables y para que el sistema los procese como texto. Costo bajo, valor inmediato.</li>
      <li><strong>Leer las fotos de comprobantes</strong> y sacar monto, fecha y referencia para dejarlos "por verificar" con los datos ya llenos. Quien aprueba compara, no digita.</li>
      <li><strong>Redactar las respuestas repetitivas con el tono del negocio</strong>, revisadas una vez por el dueño y fijadas como reglas. La IA escribe la plantilla; la regla la usa gratis después.</li>
    </ul>
    <p>Ninguno de los tres toma una decisión con plata. Los tres liberan tiempo desde el primer día.</p>"""},
 ]},
'marketing-digital-restaurantes-colombia': {
 'descripcion': 'Ficha de Google, WhatsApp que responde, reservas con abono y una base de clientes propia. Lo que un restaurante puede hacer sin agencia, y qué tener antes de pautar.',
 'secciones': [
  {'h2': 'El Día de la Madre, con y sin abono', 'html': """    <p>Un restaurante de cuarenta puestos recibe reservas para el almuerzo del Día de la Madre desde una semana antes. Sin abono, reserva ciento diez cubiertos en tres turnos; el domingo llegan ochenta y dos, y treinta puestos quedan vacíos en el día más vendido del año mientras afuera hay gente sin mesa. Con un abono de 20.000 por persona, reserva noventa y cuatro, llegan noventa y uno, y los tres que no llegaron dejaron el abono. La diferencia es de cerca de treinta cubiertos vendidos en un solo día, y la única "tecnología" fue pedir el abono por WhatsApp, dejarlo por verificar y confirmar cuando entró.</p>"""},
 ]},
'marketing-digital-gimnasios-colombia': {
 'descripcion': 'Un gimnasio pierde más por los que se van que por los que no llegan. Cómo un sistema de membresías con recordatorios y seguimiento hace más que la pauta.',
 'secciones': [
  {'h2': 'El mensaje de la segunda semana', 'html': """    <p>El sistema detecta que Camila, que venía cuatro veces por semana, lleva doce días sin registrar entrada. Le manda, desde el WhatsApp del gimnasio y con su nombre: "Camila, te hemos extrañado esta semana. ¿Todo bien? Si quieres, te guardamos el cupo de la clase de las 6". No es una promoción; es alguien que se dio cuenta. Una parte responde, otra parte vuelve sin responder, y otra no. Pero antes ninguna de las tres recibía nada, y la primera noticia de que Camila se había ido era que no renovó. Ese mensaje cuesta cero y solo es posible si hay registro de entrada por socio.</p>"""},
  {'h2': 'Qué números mirar cada mes', 'html': """    <ul>
      <li>Socios activos que llevan más de diez días sin entrar (los que hay que llamar).</li>
      <li>Renovaciones a tiempo contra vencidas.</li>
      <li>De los que entraron por pauta hace tres meses, cuántos siguen pagando.</li>
    </ul>"""},
 ]},
'marketing-digital-colegios-colombia': {
 'descripcion': 'Un colegio pierde matrículas en el WhatsApp de admisiones. Cómo atender cada familia, agendar visitas y comunicarse con los padres actuales, antes de pautar.',
 'secciones': [
  {'h2': 'Cómo se ve octubre con el sistema', 'html': """    <p>Una familia escribe un martes a las 9 de la noche preguntando por cupo en segundo grado. El asistente responde la pensión, la jornada y los requisitos, y ofrece visita el jueves o el viernes en la mañana. La familia elige el jueves; recibe el recordatorio el miércoles; llega. Después de la visita, queda en el sistema como "visitó, falta entregar documentos", y a la semana siguiente recibe un mensaje amable recordando la fecha límite. Admisiones ve las familias en cada etapa —preguntó, visitó, entregó, matriculó— y llama solo a las que están a punto de perderse. Antes, esa familia del martes a las 9 recibía respuesta el miércoles a mediodía, y a veces ya había visitado otro colegio.</p>"""},
 ]},
'pagina-web-clinica-colombia': {
 'descripcion': 'Una página de clínica es donde el paciente decide si escribe. Especialidades, profesionales, convenios, cita por WhatsApp, y lo que exige la ley con datos de salud.',
 'secciones': [
  {'h2': 'La estructura que funciona', 'html': """    <ul>
      <li><strong>Portada:</strong> qué atiende la clínica, dónde, y el botón de WhatsApp en la primera pantalla.</li>
      <li><strong>Una página por especialidad</strong> (/dermatologia/, /odontologia/…): qué trata, quién atiende, cómo pedir cita. Título con la especialidad y la ciudad.</li>
      <li><strong>Profesionales:</strong> nombre, especialidad, registro, foto real.</li>
      <li><strong>Convenios y pagos.</strong></li>
      <li><strong>Ubicación</strong> con mapa, horario y cómo llegar en transporte público.</li>
      <li><strong>Legal:</strong> política de tratamiento de datos y autorización.</li>
    </ul>
    <p>Seis páginas bien hechas valen más que veinte de relleno. Cada una con su dato estructurado (la clínica como negocio local, cada profesional como persona) para que Google las entienda.</p>"""},
  {'h2': 'Lo que un paciente no perdona', 'html': """    <p>Un horario desactualizado. Un teléfono que no contesta. Un botón de WhatsApp que lleva a un chat en blanco sin respuesta durante horas. Fotos de banco de imágenes de médicos que no trabajan ahí. Una página lenta que no carga en el celular con datos. Cada uno de esos es un paciente que escribió a la siguiente clínica de la lista.</p>"""},
 ]},
'pagina-web-peluqueria-colombia': {
 'titulo': 'Página web para peluquería: citas por WhatsApp sin perderlas',
 'descripcion': 'Una peluquería vive de la agenda. Qué debe tener su página, cómo las citas entran a la agenda de cada estilista sin llamadas, y cómo bajar las citas que nadie cumple.',
 'secciones': [
  {'h2': 'Un sábado con y sin sistema', 'html': """    <p>Sin sistema: la estilista contesta el teléfono con las manos en el tinte, anota en el cuaderno, se equivoca de hora, dos clientas llegan a las 3, una se va molesta, y otra que reservó a las 5 no aparece y la hora se pierde. Con sistema: las citas entran por WhatsApp a la agenda de cada estilista con la duración correcta, el recordatorio de la noche anterior hizo que la de las 5 cancelara a tiempo y el hueco se ofreciera a la lista de espera, nadie contestó el teléfono con las manos ocupadas, y al cierre la caja del día está cuadrada con lo que dice la agenda. La diferencia en un sábado son dos o tres servicios; en un mes, es la nómina de una persona.</p>"""},
  {'h2': 'Lo que debe tener la página, en orden', 'html': """    <ol>
      <li>Botón de WhatsApp que agenda, en la primera pantalla.</li>
      <li>Servicios con precio y duración.</li>
      <li>Estilistas con foto y especialidad.</li>
      <li>Fotos reales del trabajo, no de banco de imágenes.</li>
      <li>Horario, ubicación y mapa.</li>
      <li>Ficha de Google enlazada y reseñas respondidas.</li>
    </ol>"""},
 ]},
'cuanto-cuesta-pagina-web-restaurante-colombia': {
 'descripcion': 'Desde una página de una pantalla con menú y WhatsApp hasta una con reservas y pedidos conectados. Qué incluye cada nivel, qué cuesta mantenerla y qué no vale pagar.',
 'secciones': [
  {'h2': 'Cómo saber en qué nivel estás', 'html': """    <ul>
      <li>Si la gente pregunta el menú y el horario por WhatsApp todos los días: nivel 1, y la página resuelve la mitad de esos mensajes.</li>
      <li>Si pierdes reservas porque nadie contesta a tiempo, o tienes mesas vacías de gente que no llegó: nivel 2.</li>
      <li>Si vendes domicilios y el pedido se toma por teléfono y se anota en papel: nivel 3.</li>
    </ul>
    <p>Saltarse un nivel es pagar por lo que no se va a usar. Quedarse un nivel abajo es perder lo que ya se está perdiendo.</p>"""},
 ]},
'google-ads-colombia-guia-pymes': {
 'titulo': 'Google Ads para pymes: cuándo sí y cuándo es botar plata',
 'descripcion': 'La pauta trae clics; convertirlos depende de lo que hay del otro lado. Qué debe funcionar antes de pautar, cómo medir de verdad y cuándo el SEO local rinde más.',
 'secciones': [
  {'h2': 'Cómo medir de verdad, sin agencia', 'html': """    <p>Cada anuncio lleva a una página con un botón de WhatsApp que ya trae el texto: "Hola, vi el anuncio de [servicio]". Así, cada mensaje que empieza con esa frase vino de la pauta. El sistema los cuenta, y cuenta cuántos de esos terminaron en cotización y cuántos en venta. Al final del mes se tiene: plata invertida, mensajes, cotizaciones, ventas, y el costo real de cada venta. Con eso se decide subir, bajar o apagar. Sin eso, se decide por sensación, que casi siempre es la de quien vende la pauta.</p>"""},
  {'h2': 'Un ejemplo de decisión', 'html': """    <p>Una empresa de corte láser pauta "corte láser Bogotá": 400.000 pesos en el mes, 38 mensajes, 14 cotizaciones, 3 ventas. El costo por venta es de unos 133.000, y la venta promedio deja mucho más. Se mantiene. Pauta también "diseño de letreros": 250.000, 52 mensajes, 4 cotizaciones, 0 ventas. Se apaga, y se mira por qué tanta gente pregunta y nadie compra: el precio no estaba en la página. Ese es el trabajo real de la pauta: no gastar, sino aprender qué convierte.</p>"""},
 ]},
'seo-local-colombia-guia': {
 'titulo': 'SEO local en Colombia: aparecer en Google Maps y en tu ciudad',
 'descripcion': 'Ficha de Google completa, una página por servicio y ciudad, datos estructurados que coincidan con lo visible, reseñas respondidas. Lo que aplicamos, paso a paso.',
 'secciones': [
  {'h2': 'Lo que hicimos en nuestro propio sitio, y qué encontramos', 'html': """    <p>Auditamos aicompanyco.com con el mismo método que aplicamos a los clientes. Encontramos 162 páginas generadas por sector y ciudad con el 92 % del texto idéntico —las sacamos del índice—, una copia de otro sitio publicada por error, títulos de más de 80 caracteres, y un blog cuyos enlaces llevaban a una portada vieja. En CanchaLibre encontramos que la portada le mandaba a Google una página vacía porque todo lo pintaba JavaScript. Ninguno de esos problemas se ve navegando el sitio; todos se ven midiendo. Por eso el primer paso de cualquier posicionamiento es un chequeo automático sobre todas las URLs, no una opinión.</p>"""},
 ]},
'software-a-la-medida-vs-software-generico': {
 'titulo': 'Software a la medida o genérico: cómo decidir sin equivocarse',
 'descripcion': 'Cuándo un software genérico alcanza, cuándo la operación no cabe en él, y las tres preguntas que resuelven la decisión. Con ejemplos de madera, corte láser y canchas.',
 'secciones': [
  {'h2': 'Tres empresas, tres decisiones', 'html': """    <ul>
      <li><strong>Un depósito de madera</strong> probó dos inventarios genéricos. Ninguno convertía metros cúbicos a pulgadas. Decisión: sistema a la medida para inventario, producción y cartera; contable genérico conectado.</li>
      <li><strong>Una empresa de corte láser</strong> facturaba bien con un genérico, pero no sabía el margen por trabajo porque el retazo no existía en el sistema. Decisión: sistema propio para inventario por peso, cotizador y margen; el genérico siguió para contabilidad.</li>
      <li><strong>Una cancha sintética</strong> con dos canchas y un dueño que atiende: no necesita nada a la medida. Necesita un producto ya hecho para su sector, por suscripción. Ahí nació CanchaLibre: un producto, no un proyecto.</li>
    </ul>
    <p>La misma empresa que construye a la medida debería poder decirle cuándo no lo necesita. Si no lo hace, está vendiendo horas.</p>"""},
 ]},
'cuanto-cuesta-un-software-a-la-medida-en-colombia': {
 'titulo': '¿Cuánto cuesta un software a la medida en Colombia? Rangos',
 'descripcion': 'De qué depende el precio de un sistema a la medida, qué rangos se ven en Colombia para pymes, qué incluye el mantenimiento y cómo leer una cotización.',
 },
'errores-al-comprar-software-a-la-medida': {
 'titulo': 'Siete errores al contratar software a la medida en Colombia',
 'descripcion': 'Pagar todo al final, no exigir el código, empezar por la pantalla, aceptar "usted se adapta". Los errores que más cuestan y la pregunta que evita cada uno.',
 },
'que-es-un-erp-para-pymes': {
 'titulo': 'Qué es un ERP para pymes y cuándo tu empresa lo necesita',
 'descripcion': 'Un ERP junta inventario, ventas, compras, cartera, caja y reportes en un sistema. Qué módulos importan para una pyme, qué se compra y qué se construye.',
 'secciones': [
  {'h2': 'El primer mes de una implementación real', 'html': """    <p>Semana 1: se cuenta el inventario físico y se carga con las unidades reales del negocio. Es la semana más pesada y la que nadie quiere hacer; sin ella, nada de lo que sigue es confiable. Semana 2: el módulo de inventario entra en producción; las ventas todavía se registran como antes, pero cada venta descuenta del inventario nuevo. Semana 3: ventas y cotizaciones desde el sistema, con listas de precio. Semana 4: cartera migrada desde el cuaderno, con saldos confirmados cliente por cliente. Al cierre del mes, el dueño ve por primera vez el margen de una venta el mismo día. Caja y reportes vienen en el segundo mes, sobre datos que ya son reales.</p>"""},
 ]},
'software-para-deposito-de-madera-inventario': {
 'titulo': 'Software para depósito de madera: inventario que convierte unidades',
 'descripcion': 'Por qué ningún inventario genérico sirve para madera, cómo se lleva la transformación con merma, el reporte de planta desde el celular y la cartera fiada.',
 'secciones': [
  {'h2': 'Cómo se ve una orden de transformación', 'html': """    <table>
      <tr><th>Dato</th><th>Ejemplo</th></tr>
      <tr><td>Entrada</td><td>Cedro, bloque, 3,2 m³</td></tr>
      <tr><td>Salida</td><td>Tabla de 1", 86 pulgadas lineales · Listón, 40 unidades</td></tr>
      <tr><td>Equivalencia esperada</td><td>La que el dueño definió para cedro</td></tr>
      <tr><td>Merma calculada</td><td>Diferencia entre lo que debía salir y lo que salió</td></tr>
      <tr><td>Operario y fecha</td><td>Quien reportó, desde el celular, cuándo</td></tr>
    </table>
    <p>Con veinte órdenes así, el dueño ve la merma por especie y por operario. Con cien, ve la tendencia. Es lo que permite decidir si comprar otro bloque de esa especie o cambiar de proveedor.</p>"""},
 ]},
'reporte-de-produccion-por-telegram': {
 'descripcion': 'El dato nace en la planta y se digita en la oficina días después. Un bot de Telegram que pregunta tres cosas y guarda en el sistema elimina esa brecha. Cómo se diseña.',
 'secciones': [
  {'h2': 'Cómo se ve la conversación', 'html': """    <p>Operario: "reportar". Bot: "¿Qué salió?" con botones: Tabla · Listón · Vara. Operario toca "Tabla". Bot: "¿Cuántas pulgadas?" Operario: "318". Bot: "¿De qué bloque?" con los bloques del día. Operario toca "Cedro 3,2 m³". Bot: "318 pulgadas de tabla de cedro, del bloque de 3,2 m³. ¿Correcto?" Operario: "sí". Bot: "Listo, quedó registrado a las 4:12 p.m. a tu nombre." Cuatro toques y un número. Si el operario manda "reportar" otra vez con lo mismo en los siguientes minutos, el bot pregunta si es un reporte nuevo o el mismo, y no duplica.</p>"""},
 ]},
'software-para-recicladoras-pesaje-y-liquidacion': {
 'titulo': 'Software para recicladoras: pesaje, precios y liquidación',
 'descripcion': 'Qué necesita una recicladora o asociación: pesaje por material y asociado, precios que cambian, liquidación transparente, flota y control administrativo.',
 'secciones': [
  {'h2': 'La liquidación de un asociado, con números', 'html': """    <table>
      <tr><th>Material</th><th>Kilos</th><th>Precio del día</th><th>Total</th></tr>
      <tr><td>Cartón</td><td>412</td><td>$450</td><td>$185.400</td></tr>
      <tr><td>PET</td><td>96</td><td>$1.800</td><td>$172.800</td></tr>
      <tr><td>Aluminio</td><td>11</td><td>$8.500</td><td>$93.500</td></tr>
      <tr><td colspan="3">Subtotal</td><td>$451.700</td></tr>
      <tr><td colspan="3">Adelantos del periodo</td><td>−$150.000</td></tr>
      <tr><td colspan="3"><strong>A pagar</strong></td><td><strong>$301.700</strong></td></tr>
    </table>
    <p>Los precios son ilustrativos; lo que importa es que cada fila sale de pesajes registrados con fecha y del precio vigente ese día, y que el asociado recibe esto por WhatsApp sin que nadie lo arme a mano. Las discusiones bajan porque la base es la misma para todos.</p>"""},
  {'h2': 'Qué gana la asociación como organización', 'html': """    <p>Informes para las entidades con datos reales y no reconstruidos; trazabilidad de cada kilo desde quién lo trajo hasta a quién se vendió; y una relación con los asociados que se sostiene en números visibles, no en la confianza en quien lleva la planilla.</p>"""},
 ]},
'software-para-canchas-sinteticas-como-elegir': {
 'titulo': 'Software para canchas sintéticas: qué debe tener y cómo elegir',
 'descripcion': 'Agenda sin cruces garantizada por la base de datos, WhatsApp que entiende audios, abonos verificados, caja por turno. Qué debe tener un software para canchas.',
 'secciones': [
  {'h2': 'Las preguntas para hacerle a cualquier proveedor', 'html': """    <ol>
      <li>¿Qué pasa si dos personas reservan la misma hora al mismo tiempo? (La respuesta correcta: solo una queda, y lo garantiza la base de datos.)</li>
      <li>¿Entiende una nota de voz?</li>
      <li>¿Pierdo mi número de WhatsApp?</li>
      <li>¿Quién aprueba un comprobante de transferencia?</li>
      <li>¿Entiende que mi cancha de 11 se divide en dos de 5?</li>
      <li>¿Puedo probar con mis canchas y precios reales antes de pagar?</li>
      <li>¿Qué pasa con mis datos si me voy?</li>
    </ol>
    <p>Un proveedor que responde las siete con claridad tiene un producto. Uno que responde "eso se puede configurar" a todas, tiene una presentación.</p>"""},
 ]},
'software-para-clubes-de-poker-torneos': {
 'descripcion': 'Qué debe resolver el software de un club de póker: reglas por plantilla, torneos que congelan sus reglas, sorteo de mesas, reloj en el televisor y liga. Botón.',
 'secciones': [
  {'h2': 'El jueves en Dinasty, con el sistema', 'html': """    <p>7:30 p.m.: 37 inscritos, tres en lista de espera. La caja cobró los buy-ins con su rol. 8:00: el director abre el torneo; el sistema sortea y reparte 5 mesas de 8/8/7/7/7; cada jugador ve su mesa y su puesto en la pantalla. El reloj arranca en el televisor: nivel 1, 100/200, 20 minutos. 8:40: una recompra en la mesa 3, la cobra caja, queda registrada. 9:20: se rompe la mesa 5 y el sistema propone el balanceo según la política del club. 11:50: quedan nueve, mesa final. 1:10 a.m.: termina; los puestos están registrados, los premios calculados por la tabla de tramos, y los puntos de liga ya sumaron. Nadie abrió una hoja de cálculo, y el ranking del mes está listo antes de apagar las luces.</p>"""},
 ]},
'automatizar-whatsapp-sin-api-oficial': {
 'titulo': 'Automatizar WhatsApp sin la API oficial: cuándo sí y qué riesgos',
 'descripcion': 'La conexión por código QR deja el número en manos del dueño y no cobra por conversación. Qué puede hacer, qué no, qué la pone en riesgo y cuándo conviene la API.',
 'secciones': [
  {'h2': 'Cómo se conecta, en cinco minutos', 'html': """    <ol>
      <li>Desde el panel del sistema, "Conectar WhatsApp".</li>
      <li>Aparece un código QR. En el celular del negocio: WhatsApp → Dispositivos vinculados → Vincular dispositivo → escanear.</li>
      <li>El sistema queda conectado y guarda la sesión cifrada. El celular sigue funcionando normal.</li>
      <li>El asistente empieza a atender. El dueño ve todas las conversaciones en su celular y puede responder cuando quiera.</li>
      <li>Para desconectar: desde el panel o desde Dispositivos vinculados en el celular. El WhatsApp sigue como si nada.</li>
    </ol>
    <p>Si el servidor se reinicia, la sesión se recupera sola. Si WhatsApp pide volver a vincular —pasa cada varios meses—, el sistema lo avisa y son otros cinco minutos.</p>"""},
 ]},
}
