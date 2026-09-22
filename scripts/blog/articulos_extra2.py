# -*- coding: utf-8 -*-
# Segunda capa de extras: una seccion corta de fondo ("por donde empezar" / "que medir") y
# ajustes finos de titulo y descripcion.
EXTRA2 = {
'automatizar-whatsapp-ferreterias-colombia': {
 'descripcion': 'Una ferretería recibe listas por WhatsApp todo el día. Cómo un sistema con inventario y precios cotiza, arma el pedido y recuerda cartera sin frenar el mostrador.'[:158],
 },
'whatsapp-automatico-juridicos-colombia': {
 'descripcion': 'Qué automatizar en el WhatsApp de un despacho —filtrar por área, agendar, informar requisitos— sin dar asesoría ni comprometer la confidencialidad.',
 },
'whatsapp-business-hoteles-colombia': {
 'titulo': 'WhatsApp automático para hoteles: reservas sin agotar recepción'[:62],
 'secciones': [{'h2': 'Por dónde empezar', 'html': """    <p>Por las diez preguntas que recepción más contesta: se escriben las respuestas una vez, se cargan como reglas, y el asistente las responde desde el primer día sin tocar el calendario. La segunda semana se conecta la disponibilidad y las tarifas. La tercera, el anticipo por verificar. Cada paso se mide igual: cuántos mensajes resolvió el asistente y cuántos pasaron a recepción. Lo que pasa a recepción repetidamente es la siguiente regla.</p>"""}],
 },
'chatbot-ia-clinicas-colombia': {
 'descripcion': 'Qué automatizar en el WhatsApp de una clínica —citas, confirmaciones, requisitos— y qué debe quedar siempre en manos del personal. Con datos de salud, el límite importa.'[:158],
 'secciones': [{'h2': 'Por dónde empezar', 'html': """    <p>Por los recordatorios de cita. Es lo que menos riesgo tiene, lo que menos configuración exige y lo que más rápido se nota: la inasistencia baja en semanas. Después, las preguntas administrativas repetidas. Por último, el agendamiento completo sobre la agenda de cada profesional. El límite clínico se configura antes del primer paso, no después.</p>"""}],
 },
'chatbot-ia-inmobiliarias-colombia': {
 'secciones': [
  {'h2': 'Qué medir cada mes', 'html': """    <ul>
      <li>Interesados que escribieron, y cuántos quedaron calificados sin intervención del asesor.</li>
      <li>Visitas agendadas por el asistente, y cuántas se cumplieron.</li>
      <li>Tiempo de primera respuesta: debería medirse en segundos, a cualquier hora.</li>
      <li>Cierres que empezaron en el asistente. Es el número que justifica todo lo demás.</li>
    </ul>"""},
  {'h2': 'Por dónde empezar', 'html': """    <p>Por "¿sigue disponible?": es la pregunta más frecuente y la que más depende de datos frescos. Si el inventario de inmuebles está en un sistema, esa respuesta se automatiza en días. Las cuatro preguntas de calificación vienen después, y el agendamiento de visitas cuando la agenda de los asesores esté en el sistema y no en sus celulares.</p>"""},
 ]},
'cuanto-cuesta-chatbot-ia-colombia': {
 'titulo': '¿Cuánto cuesta un chatbot con IA en Colombia? Lo que mueve el precio'[:62],
 },
'sistema-gestion-droguerias-colombia': {
 'descripcion': 'Qué necesita el sistema de una droguería: lotes y vencimientos, fiado por cliente, turnos de caja y pedidos al distribuidor. Y qué no resuelve un genérico.',
 'secciones': [{'h2': 'Por dónde empezar', 'html': """    <p>Por el inventario con lotes. Es la semana pesada —hay que contar y cargar con fecha de vencimiento— pero sin ella nada de lo demás es confiable. Después, caja por turno, que se usa desde el primer día. Después, cartera, migrada del cuaderno cliente por cliente. El pedido sugerido llega solo cuando hay un mes de ventas registradas.</p>"""}],
 },
'sistema-gestion-talleres-mecanicos-colombia': {
 'descripcion': 'Qué resuelve un sistema para taller: la orden de trabajo por vehículo, repuestos, mano de obra por mecánico, cotización aprobada por WhatsApp y cobro que cuadra.'[:158],
 'secciones': [{'h2': 'Por dónde empezar', 'html': """    <p>Por la orden de trabajo, sin repuestos ni mano de obra todavía: solo vehículo, diagnóstico, estado y cotización aprobada por WhatsApp. Eso ya elimina el "yo no autoricé eso". La segunda fase agrega repuestos descontando inventario; la tercera, mano de obra por mecánico y liquidación. En cada fase el taller sigue operando; nada se detiene para "implementar".</p>"""}],
 },
'app-movil-supermercado-colombia': {
 'descripcion': 'Antes de una app de domicilios, un supermercado necesita inventario y precios en un sistema. Qué debe tener la app, cómo se conecta con la caja, y cuándo basta WhatsApp.'[:158],
 'secciones': [{'h2': 'Qué medir', 'html': """    <p>Pedidos por WhatsApp o app al mes, ticket promedio del domicilio contra el del mostrador, margen por pedido después del costo de entrega, y devoluciones por producto agotado. Si el último número no es cero, el inventario no está bien conectado, y eso se arregla antes de invertir en una app.</p>"""}],
 },
'automatizacion-procesos-constructoras-colombia': {
 'titulo': 'Automatización en constructoras: obra, compras y cortes sin Excel'[:62],
 },
'facturacion-electronica-automatica-colombia': {
 'descripcion': 'La factura electrónica ya es obligatoria; lo que cuesta es digitarla aparte. Cómo se integra con el sistema de la empresa y qué hace el proveedor tecnológico.',
 'secciones': [{'h2': 'Por dónde empezar', 'html': """    <p>Por limpiar los datos maestros: clientes con NIT o cédula y correo, productos con su tarifa de IVA. Es tedioso y es el 80 % del trabajo. Después, una prueba con el ambiente de pruebas del proveedor tecnológico —todos tienen uno— emitiendo facturas ficticias desde el sistema. Cuando diez facturas de prueba salen bien, se pasa a producción con permiso de emisión para una sola persona.</p>"""}],
 },
'inteligencia-artificial-negocios-colombia': {
 'descripcion': 'Dónde la IA sirve hoy en una pyme colombiana —atender WhatsApp, transcribir audios, leer comprobantes— y dónde es una promesa cara. Con lo medido en producción.'[:158],
 'secciones': [{'h2': 'Cómo medimos si vale la pena', 'html': """    <p>Con dos números por mes: qué porcentaje de interacciones resolvió el sistema sin una persona, y cuánto costó en tokens. Si el primero sube y el segundo se mantiene en centavos, la IA está bien puesta. Si el segundo sube más rápido que el primero, el asistente está mandando al modelo lo que debería resolver una regla. Es una revisión de quince minutos al mes, y es la única forma de saber si la IA está trabajando o solo gastando.</p>"""}],
 },
'marketing-digital-restaurantes-colombia': {
 'descripcion': 'Ficha de Google, WhatsApp que responde, reservas con abono y una base de clientes propia. Lo que un restaurante puede hacer sin agencia, y qué tener antes de pautar.'[:158],
 'secciones': [{'h2': 'Qué medir cada mes', 'html': """    <ul>
      <li>Visitas a la ficha de Google y cuántas terminaron en "cómo llegar" o en WhatsApp.</li>
      <li>Reservas por WhatsApp, y cuántas llegaron.</li>
      <li>Clientes en la base propia con consentimiento.</li>
      <li>Si hay pauta: cuántos mensajes trajo y cuántos se convirtieron en reserva. Sin ese número, la pauta no se puede juzgar.</li>
    </ul>"""}],
 },
'marketing-digital-gimnasios-colombia': {
 'secciones': [{'h2': 'Por dónde empezar', 'html': """    <p>Por el registro de entrada por socio, aunque sea con un código que la recepcionista marca. Sin ese dato no hay retención posible. La segunda semana, las membresías con vencimiento y recordatorio. La tercera, el mensaje a quien lleva diez días sin venir. La pauta, cuando lo anterior lleve un mes midiéndose.</p>"""}],
 },
'marketing-digital-colegios-colombia': {
 'secciones': [{'h2': 'Qué medir en la temporada de admisiones', 'html': """    <ul>
      <li>Familias que escribieron, y tiempo de primera respuesta (debería ser inmediato).</li>
      <li>Visitas agendadas por el asistente y cumplidas.</li>
      <li>Familias en cada etapa: preguntó, visitó, entregó documentos, matriculó.</li>
      <li>Matrículas que vinieron por recomendación de padres actuales. Es el número que dice si la comunicación con las familias funciona.</li>
    </ul>"""}],
 },
'pagina-web-clinica-colombia': {
 'descripcion': 'Una página de clínica es donde el paciente decide si escribe. Especialidades, profesionales, convenios, cita por WhatsApp, y lo que exige la ley con datos de salud.'[:158],
 'secciones': [{'h2': 'Qué medir', 'html': """    <p>Cuántos pacientes llegaron a la página desde Google y por qué especialidad; cuántos tocaron el botón de WhatsApp; cuántos agendaron. Search Console da lo primero gratis; el sistema de citas da lo demás. Una especialidad con muchas visitas y pocas citas tiene un problema en la página: falta el convenio, el profesional, o la respuesta rápida.</p>"""}],
 },
'pagina-web-peluqueria-colombia': {
 'descripcion': 'Una peluquería vive de la agenda. Qué debe tener su página, cómo las citas entran a la agenda de cada estilista sin llamadas, y cómo bajar las citas que nadie cumple.'[:158],
 'secciones': [{'h2': 'Qué medir', 'html': """    <p>Citas agendadas por WhatsApp sin que nadie contestara el teléfono; citas cumplidas contra agendadas (la inasistencia debería bajar en el primer mes con los recordatorios); huecos rellenados con la lista de espera; y clientes que volvieron después del mensaje de "hace cinco semanas". Cuatro números, una vez al mes.</p>"""}],
 },
'cuanto-cuesta-pagina-web-restaurante-colombia': {
 'descripcion': 'Desde una página de una pantalla con menú y WhatsApp hasta una con reservas y pedidos conectados. Qué incluye cada nivel, qué cuesta mantenerla y qué no vale pagar.'[:158],
 'secciones': [{'h2': 'El error más común al contratar', 'html': """    <p>Pagar el nivel 3 con la operación del nivel 1. Un restaurante que no tiene inventario ni caja por turno recibe una página con pedidos en línea, los pedidos entran a un correo, alguien los pasa a mano a la cocina, y la "automatización" agregó un paso. El nivel de la página no puede estar por encima del nivel del sistema. Si no hay sistema, la página muestra; si lo hay, la página trabaja.</p>"""}],
 },
'google-ads-colombia-guia-pymes': {
 'descripcion': 'La pauta trae clics; convertirlos depende de lo que hay del otro lado. Qué debe funcionar antes de pautar, cómo medir de verdad y cuándo el SEO local rinde más.'[:158],
 'secciones': [{'h2': 'Cuánto tiempo darle a una prueba', 'html': """    <p>Un mes con presupuesto fijo y una sola búsqueda por campaña. Menos tiempo no da datos; más búsquedas por campaña no dejan saber cuál convirtió. Al cierre, la pregunta es una sola: ¿cuánto costó cada venta que vino de ahí? Si el número es bueno, se mantiene y se empieza a posicionar esa búsqueda orgánicamente para dejar de pagarla. Si es malo, se apaga sin culpa: la prueba cumplió su trabajo.</p>"""}],
 },
'seo-local-colombia-guia': {
 'descripcion': 'Ficha de Google completa, una página por servicio y ciudad, datos estructurados que coincidan con lo visible, reseñas respondidas. Lo que aplicamos, paso a paso.'[:158],
 'secciones': [{'h2': 'Los errores que castigan', 'html': """    <ul>
      <li>Páginas iguales con el nombre de la ciudad cambiado.</li>
      <li>Datos estructurados que dicen una cosa y la página muestra otra.</li>
      <li>Palabras clave metidas a la fuerza en el nombre de la ficha de Google.</li>
      <li>Reseñas compradas o de empleados.</li>
      <li>Enlaces comprados.</li>
    </ul>
    <p>Todos se detectan, y desde 2024 el castigo alcanza al dominio entero, no solo a la página.</p>"""}],
 },
'software-a-la-medida-vs-software-generico': {
 'descripcion': 'Cuándo un software genérico alcanza, cuándo la operación no cabe en él, y las tres preguntas que resuelven la decisión. Ejemplos de madera, corte láser y canchas.',
 },
'cuanto-cuesta-un-software-a-la-medida-en-colombia': {
 'secciones': [{'h2': 'Lo que abarata un sistema sin recortarlo', 'html': """    <p>Tener los datos limpios antes de empezar (un inventario contado vale una semana de trabajo). Decidir bien qué se compra en vez de construir. Empezar por un módulo y medir antes de pedir el siguiente. Y tener a una persona del negocio que responda preguntas rápido: cada día que una pregunta espera respuesta es un día de construcción parada que alguien paga.</p>"""}],
 },
'errores-al-comprar-software-a-la-medida': {
 'secciones': [{'h2': 'Cómo se ve un contrato sano', 'html': """    <p>Módulos con alcance y precio cada uno. Fechas de entrega en producción por módulo, no una fecha final. Propiedad del código, la base de datos y la documentación a nombre de la empresa. Mantenimiento mensual con lo que incluye y lo que no. Y una cláusula de salida: qué recibe la empresa si decide no seguir. Un proveedor que acepta eso sin discutir es uno que ya lo hace así.</p>"""}],
 },
'que-es-un-erp-para-pymes': {
 'secciones': [{'h2': 'Qué cambia en la práctica', 'html': """    <p>La pregunta "¿cuánto vendimos este mes y qué margen dejó?" pasa de tardar un día a tardar un clic. La cartera se cobra con recordatorios en vez de con llamadas. El inventario deja de tener dos versiones. Y el dueño deja de ser el único que sabe cómo funciona la empresa, porque la operación está en un sistema que cualquiera del equipo puede consultar.</p>"""}],
 },
'software-para-deposito-de-madera-inventario': {
 'titulo': 'Software para depósitos de madera: inventario con conversión'[:62],
 'secciones': [{'h2': 'Por dónde empezar', 'html': """    <p>Por definir las equivalencias por especie con el dueño —cuántas pulgadas salen de un metro cúbico de cedro, de pino, de roble— y cargar el inventario actual en las dos unidades. Es la semana que nadie quiere hacer y la que hace que todo lo demás funcione. La segunda semana, las órdenes de transformación con merma. La tercera, el bot de Telegram en la planta. La cartera se migra cuando la producción ya fluye.</p>"""}],
 },
'reporte-de-produccion-por-telegram': {
 'descripcion': 'El dato nace en la planta y se digita días después. Un bot de Telegram que pregunta tres cosas y guarda en el sistema elimina esa brecha. Cómo se diseña y qué evitar.'[:158],
 'secciones': [{'h2': 'Qué medir', 'html': """    <p>El tiempo entre que algo se produce y que aparece en el sistema (la meta es minutos, no días); cuántos reportes se corrigieron después (deberían ser pocos, y si son muchos el bot pregunta mal); y cuántos duplicados detectó el candado. Con esos tres números en el primer mes se sabe si el bot es más fácil que el papel.</p>"""}],
 },
'software-para-recicladoras-pesaje-y-liquidacion': {
 'secciones': [{'h2': 'Por dónde empezar', 'html': """    <p>Por el pesaje con asociado, material y fecha. Es el dato del que sale todo; sin él no hay liquidación posible. La segunda semana, la tabla de precios por material con historial. La tercera, la primera liquidación calculada por el sistema, comparada a mano con la planilla para que la asociación confíe en el número. Flota y reportes vienen cuando el ciclo de pesaje y liquidación ya rueda solo.</p>"""}],
 },
'software-para-clubes-de-poker-torneos': {
 'descripcion': 'Qué debe resolver el software de un club de póker: reglas por plantilla, torneos que congelan sus reglas, sorteo de mesas, reloj en el televisor y liga.',
 },
'automatizar-whatsapp-sin-api-oficial': {
 'titulo': 'Automatizar WhatsApp sin la API oficial: cuándo sí y riesgos'[:62],
 'descripcion': 'La conexión por código QR deja el número en manos del dueño y no cobra por conversación. Qué puede hacer, qué no, qué la pone en riesgo y cuándo conviene la API.'[:158],
 },
}
