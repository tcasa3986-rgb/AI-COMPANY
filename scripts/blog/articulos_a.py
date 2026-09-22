# -*- coding: utf-8 -*-
# Tanda A: automatizacion y WhatsApp. Reescritos el 2026-09-21 conservando la fecha original.
ARTICULOS = [
{
 'slug': 'como-automatizar-whatsapp-business-colombia', 'publicado': '2026-05-02', 'categoria': 'Automatización · WhatsApp', 'emoji': '💬',
 'titulo': 'Cómo automatizar WhatsApp Business en tu empresa | AI Company CO',
 'h1': 'Cómo automatizar WhatsApp Business en una empresa colombiana (sin perder el número)',
 'descripcion': 'Las tres formas de automatizar WhatsApp en Colombia, qué se puede y qué no con cada una, cuánto cuesta, y cómo decidir sin perder el control de tu número.',
 'consulta': 'como automatizar whatsapp business',
 'intro': """    <p>En Colombia el negocio pasa por WhatsApp. El cliente no llama ni escribe un correo: manda un mensaje, casi siempre un audio, y espera respuesta en minutos. Eso convierte a la persona que contesta el WhatsApp en el cuello de botella de toda la empresa. Automatizarlo no es un lujo tecnológico: es recuperar esa persona.</p>
    <p>Esta guía explica las tres formas reales de hacerlo, qué permite cada una y cuál conviene según el tamaño del negocio. Está escrita desde lo que hemos construido para clientes reales —canchas sintéticas, ferreterías, empresas de corte láser— no desde un folleto.</p>""",
 'secciones': [
  {'h2': 'Qué significa "automatizar WhatsApp" de verdad', 'html': """    <p>No es poner un mensaje de bienvenida. Automatizar es que el sistema <strong>lea</strong> lo que el cliente escribe, <strong>consulte</strong> la información real del negocio (inventario, agenda, precios, cartera) y <strong>responda o actúe</strong> sin que una persona intervenga. Tres ejemplos concretos:</p>
    <ul>
      <li>Un cliente pregunta "¿hay cancha mañana a las 8?" y el sistema mira la agenda, ofrece dos horarios libres y aparta el que elija.</li>
      <li>Un cliente de ferretería manda una foto de una lista y el sistema arma la cotización con los precios vigentes.</li>
      <li>Un deudor recibe el recordatorio de su cuota el día que vence, con el saldo exacto, sin que nadie lo genere.</li>
    </ul>
    <p>Si el "bot" no toca los datos reales del negocio, es un contestador automático. Útil, pero no es lo que cambia la operación.</p>"""},
  {'h2': 'Las tres formas de automatizar WhatsApp en Colombia', 'html': """    <table>
      <tr><th>Opción</th><th>Qué es</th><th>Para quién</th></tr>
      <tr><td><strong>1. WhatsApp Business (la app gratuita)</strong></td><td>Respuestas rápidas, mensaje de ausencia, catálogo, etiquetas. Todo manual.</td><td>Un negocio de una persona que atiende pocas conversaciones al día.</td></tr>
      <tr><td><strong>2. Conexión por código QR</strong></td><td>Un sistema se conecta al número del negocio como WhatsApp Web, lee los mensajes y responde con la información del sistema. El número sigue siendo del dueño.</td><td>Pymes que quieren que el sistema atienda y reserve, sin trámites con Meta ni cambiar de número.</td></tr>
      <tr><td><strong>3. API oficial de WhatsApp (Meta)</strong></td><td>Acceso oficial, con plantillas aprobadas, cobro por conversación y verificación de empresa.</td><td>Empresas con alto volumen de mensajes salientes (miles al mes) y presupuesto para la integración.</td></tr>
    </table>
    <p>La mayoría de nuestros clientes usan la <strong>opción 2</strong>. La razón es de negocio, no técnica: con la API oficial el dueño deja de tener su WhatsApp en el celular; el número pasa a vivir en la plataforma. Un dueño de cancha o de ferretería no acepta eso, y tiene razón. La conexión por QR le deja el número donde siempre estuvo y le agrega un asistente encima.</p>"""},
  {'h2': 'Lo que un asistente bien hecho tiene que saber hacer', 'html': """    <p>Lo aprendimos construyendo el asistente de <a href="/sistemas/para-canchas-sinteticas/">CanchaLibre</a>, nuestro software para canchas sintéticas, y replicando conversaciones reales:</p>
    <ul>
      <li><strong>Entender audios.</strong> Mucha gente no escribe: manda una nota de voz de veinte palabras. Si el sistema solo entiende mensajes tecleados y cortos, falla la mitad del tiempo.</li>
      <li><strong>Preguntar una cosa a la vez.</strong> "¿Qué día?", y después "¿a qué hora?". No un formulario.</li>
      <li><strong>No inventar.</strong> Si el precio no está cargado, avisa; no redondea. Si no entiende, pasa la conversación a una persona antes que contestar mal.</li>
      <li><strong>Reglas primero, inteligencia artificial después.</strong> Lo repetitivo (horarios, precios, ubicación) lo responde una regla, que es gratis y no se equivoca. El modelo de lenguaje entra solo cuando la conversación se sale de lo esperado. Así el costo por conversación es de centavos, no de miles de pesos.</li>
    </ul>"""},
  {'h2': 'Lo que no se debe automatizar', 'html': """    <p><strong>Los mensajes masivos.</strong> WhatsApp bloquea números que mandan lo mismo a muchos contactos en poco tiempo, y cuando bloquea el número del negocio, se pierde todo. Un asistente serio manda ofertas por lotes pequeños, con pausas, solo a quien aceptó recibirlas, y dentro del horario que permite la Ley 2300 de 2023 para contacto comercial. Si alguien le ofrece "enviar a toda su base de datos", está ofreciendo perder su número.</p>
    <p><strong>Las decisiones con plata.</strong> Un comprobante de transferencia que llega por WhatsApp no es un pago hasta que alguien que ve la cuenta lo confirma. El sistema lo recibe, lo deja "por verificar" y avisa. Aprobar es de una persona.</p>"""},
  {'h2': 'Cuánto cuesta', 'html': """    <p>Depende de lo que el asistente tenga que consultar. Un asistente que responde horarios y precios desde una agenda ya existente es parte del sistema, no un módulo aparte: en CanchaLibre viene incluido en la mensualidad por sede. Un asistente para una operación a la medida —cotizar desde un inventario por peso, por ejemplo— se construye como parte del sistema y se cotiza con él. La API oficial de Meta agrega un costo por conversación que Meta actualiza por país; conviene revisarlo antes de decidir.</p>
    <p>Lo que sí es constante: el costo de <strong>no</strong> automatizar es una persona contestando lo mismo cien veces, y una hora de cancha o un pedido que se pierde porque nadie respondió a tiempo.</p>"""},
 ],
 'cta': {'h3': '¿Quieres ver un asistente de WhatsApp funcionando sobre datos reales?', 'p': 'Te mostramos uno en producción, con conversaciones de verdad. Sin compromiso.', 'boton': 'Ver una demo por WhatsApp', 'wa': 'Hola, leí la guía de automatizar WhatsApp y quiero ver una demo'},
 'relacionados': ['automatizar-whatsapp-sin-api-oficial', 'automatizar-whatsapp-ferreterias-colombia', 'software-para-canchas-sinteticas-como-elegir'],
 'faq': [
  ('¿Automatizar WhatsApp significa perder mi número?', 'No, si se hace por conexión QR: el número sigue en tu celular y el sistema se conecta como WhatsApp Web. Con la API oficial de Meta el número pasa a la plataforma y deja de usarse desde la app.'),
  ('¿El asistente puede reservar, cotizar o cobrar solo?', 'Reservar y cotizar sí, cuando está conectado al sistema del negocio. Cobrar no: recibe el comprobante y lo deja por verificar para que una persona lo apruebe.'),
  ('¿Entiende audios?', 'Un asistente bien hecho, sí. Transcribe la nota de voz y la trata como texto. Es indispensable en Colombia: buena parte de los clientes manda audios.'),
  ('¿Puedo mandar promociones a todos mis clientes?', 'Solo a quienes aceptaron recibirlas, por lotes pequeños con pausas y en horario comercial. Los envíos masivos hacen que WhatsApp bloquee el número.'),
 ],
},
{
 'slug': 'automatizar-whatsapp-ferreterias-colombia', 'publicado': '2026-05-12', 'categoria': 'Automatización · Ferreterías', 'emoji': '🔩',
 'titulo': 'Automatizar WhatsApp en una ferretería: cotizar sin perder ventas',
 'h1': 'Cómo automatizar el WhatsApp de una ferretería: cotizaciones, pedidos y cartera sin perder ventas',
 'descripcion': 'Una ferretería recibe listas por WhatsApp todo el día. Cómo un sistema con inventario real cotiza, arma pedidos y recuerda cartera sin que el mostrador se detenga.',
 'consulta': 'automatizar whatsapp ferreteria',
 'intro': """    <p>El WhatsApp de una ferretería recibe listas: "necesito 20 metros de cable 12, 3 tubos de PVC de media, una caja de tornillos de 2 pulgadas y el precio de la pintura blanca". Quien contesta tiene que buscar cada referencia, mirar si hay, sacar el precio, sumar y responder. Mientras tanto, hay tres personas en el mostrador.</p>
    <p>Ese es el trabajo que se puede automatizar. No con un bot que dice "en un momento te atendemos", sino con un sistema que tiene el inventario y los precios, y que arma la cotización.</p>""",
 'secciones': [
  {'h2': 'Por qué una ferretería no puede usar un chatbot genérico', 'html': """    <p>Porque el valor de la respuesta está en los datos. Un chatbot que no conoce el inventario solo puede decir "consúltanos"; lo que el cliente quiere saber es <em>si hay</em> y <em>a cuánto</em>. Con miles de referencias, listas de precio distintas por cliente (contratista, público, mayorista) y cartera fiada, la automatización tiene que vivir <strong>dentro del sistema de la ferretería</strong>, no al lado.</p>
    <p>Construimos el sistema de <a href="/sistemas/para-ferreterias/">Ferre Láser</a> sobre ese principio: inventario, precios por lista, cartera y cotizador en un solo lugar, y el WhatsApp conectado a eso.</p>"""},
  {'h2': 'Qué hace el asistente en el día a día', 'html': """    <ul>
      <li><strong>Lee la lista y cotiza.</strong> Reconoce las referencias que el cliente escribió (o dictó en un audio), busca el precio de la lista que le corresponde a ese cliente y responde con el total. Lo que no reconoce lo marca para que una persona lo complete, en vez de inventar.</li>
      <li><strong>Dice si hay.</strong> Con el inventario en vivo, "no hay tubo de media, hay de tres cuartos" es una respuesta que el cliente valora más que un "sí" que después resulta falso.</li>
      <li><strong>Convierte la cotización en pedido.</strong> Si el cliente confirma, queda el pedido armado para que el mostrador lo aliste. Sin volver a digitar.</li>
      <li><strong>Recuerda la cartera.</strong> Al contratista que debe, el sistema le manda el saldo y la fecha, en horario comercial, sin que el dueño tenga que llamar.</li>
      <li><strong>Pasa a una persona cuando toca.</strong> Una pregunta técnica ("¿este breaker sirve para 220?") va al vendedor, con la conversación completa, no desde cero.</li>
    </ul>"""},
  {'h2': 'Lo que hay que tener antes de automatizar', 'html': """    <p>Un asistente es tan bueno como los datos que consulta. Antes de conectar el WhatsApp hay que tener:</p>
    <ul>
      <li><strong>Inventario en un sistema</strong>, no en la cabeza del vendedor. Con existencias reales, no aproximadas.</li>
      <li><strong>Listas de precio definidas</strong> y asignadas a cada cliente.</li>
      <li><strong>Una regla para lo que no se sabe.</strong> Qué hace el sistema cuando no reconoce una referencia: preguntar, marcar, escalar. Nunca inventar un precio.</li>
    </ul>
    <p>Si la ferretería no tiene lo primero, la automatización empieza por el sistema, no por el WhatsApp. Es el orden correcto y el que evita frustraciones.</p>"""},
  {'h2': 'Cuánto cambia', 'html': """    <p>Lo más visible es tiempo: cotizaciones que se respondían en veinte minutos salen en uno, y la persona del mostrador atiende al que tiene enfrente. Lo menos visible es más importante: las cotizaciones quedan registradas, se sabe cuáles se convirtieron en venta y cuáles no, y la cartera deja de depender de la memoria del dueño.</p>"""},
 ],
 'cta': {'h3': '¿Tu ferretería cotiza por WhatsApp a mano?', 'p': 'Te mostramos cómo funciona con inventario y precios reales, sobre un sistema que ya opera en una ferretería.', 'boton': 'Ver el sistema para ferreterías', 'wa': 'Hola, tengo una ferretería y quiero ver cómo automatizan las cotizaciones por WhatsApp'},
 'relacionados': ['como-automatizar-whatsapp-business-colombia', 'que-es-un-erp-para-pymes', 'automatizar-whatsapp-sin-api-oficial'],
 'faq': [
  ('¿El asistente puede cotizar con precios distintos por cliente?', 'Sí, si el sistema tiene listas de precio y cada cliente está asignado a una. El asistente usa la lista del cliente que escribe.'),
  ('¿Qué pasa si el cliente pide algo que no reconoce?', 'Lo marca y lo pasa a una persona. Nunca inventa una referencia ni un precio.'),
  ('¿Sirve con el WhatsApp que ya tenemos?', 'Sí. Se conecta por código QR al número actual, como WhatsApp Web. No hay que cambiar de número ni hacer trámites con Meta.'),
  ('¿Necesitamos tener el inventario en un sistema primero?', 'Sí. Sin inventario real el asistente no puede decir si hay ni a cuánto. Por eso la automatización empieza por el sistema.'),
 ],
},
{
 'slug': 'whatsapp-automatico-juridicos-colombia', 'publicado': '2026-06-10', 'categoria': 'Automatización · Firmas jurídicas', 'emoji': '⚖️',
 'titulo': 'WhatsApp automático para abogados: citas y seguimiento',
 'h1': 'WhatsApp automático para firmas de abogados: filtrar consultas, agendar citas y dar seguimiento',
 'descripcion': 'Una firma pierde horas contestando "¿cuánto cobran?". Qué puede automatizar un despacho jurídico en WhatsApp sin comprometer la confidencialidad ni la relación con el cliente.',
 'consulta': 'whatsapp automatico abogados',
 'intro': """    <p>El WhatsApp de una firma de abogados recibe de todo: "¿cuánto cobran por un divorcio?", "¿cómo va mi proceso?", "necesito una cita urgente", y también consultas que no son del área. Cada mensaje lo contesta un abogado o su asistente, y la mitad no termina en un cliente.</p>
    <p>Aquí no se trata de que un bot dé asesoría jurídica —eso no debe pasar— sino de que el despacho deje de gastar tiempo de abogado en lo que no requiere un abogado.</p>""",
 'secciones': [
  {'h2': 'Lo que sí se automatiza en un despacho', 'html': """    <ul>
      <li><strong>Filtrar por área.</strong> El asistente pregunta de qué se trata (laboral, familia, civil, penal, comercial) y dirige la conversación al abogado que corresponde, o informa con respeto que la firma no atiende esa área.</li>
      <li><strong>Agendar la primera cita.</strong> Con la agenda real del abogado: ofrece horarios libres, confirma, y manda el recordatorio el día anterior. Las citas a las que nadie llega bajan.</li>
      <li><strong>Informar requisitos.</strong> Qué documentos traer para una sucesión o un contrato de arrendamiento. Es la misma lista cada vez y no requiere criterio jurídico.</li>
      <li><strong>Estado del proceso, con límites.</strong> El cliente pregunta "¿cómo va lo mío?" y el sistema responde con la última actuación registrada por el despacho, no con una interpretación. Lo que requiere explicación, lo agenda con el abogado.</li>
      <li><strong>Recordatorios de honorarios.</strong> Cuota pendiente, fecha, valor. En horario comercial y solo al cliente que la debe.</li>
    </ul>"""},
  {'h2': 'Lo que no se automatiza, y por qué', 'html': """    <p><strong>La asesoría.</strong> Un modelo de lenguaje puede escribir algo que suena a consejo jurídico y estar equivocado. En un despacho eso no es un error de servicio: es responsabilidad profesional. El asistente se configura para <em>no</em> responder preguntas de fondo; las reconoce y las pasa al abogado.</p>
    <p><strong>Lo confidencial.</strong> Los mensajes de un cliente son información sensible. El sistema que automatiza debe guardar las conversaciones en la base del despacho, no en un servicio de terceros que las use para otra cosa, y el despacho debe tener claro qué modelo de IA se usa, con qué datos, y bajo qué contrato. Es una pregunta que hay que hacerle a cualquier proveedor antes de firmar.</p>"""},
  {'h2': 'Cómo se conecta sin cambiar el número', 'html': """    <p>Un despacho tiene un número que sus clientes conocen. Se conecta por código QR, como WhatsApp Web, y el sistema atiende sobre ese número mientras los abogados lo siguen usando desde el celular. Cuando el asistente pasa una conversación a una persona, esa persona la ve completa en su WhatsApp de siempre. Los detalles de las tres formas de conectar están en nuestra <a href="/blog/como-automatizar-whatsapp-business-colombia/">guía de automatización de WhatsApp</a>.</p>"""},
  {'h2': 'Qué gana el despacho', 'html': """    <p>Menos interrupciones de abogado por consultas que no son del área, primeras citas que se agendan solas y a las que la gente llega, y una relación con el cliente que se siente atendida aunque el abogado esté en audiencia. Lo que no cambia —y no debe cambiar— es quién da la asesoría.</p>"""},
 ],
 'cta': {'h3': '¿Tu despacho contesta el WhatsApp entre audiencias?', 'p': 'Revisamos qué se puede automatizar en tu firma sin tocar la asesoría ni la confidencialidad.', 'boton': 'Conversar sobre mi despacho', 'wa': 'Hola, tengo una firma de abogados y quiero saber qué se puede automatizar en WhatsApp'},
 'relacionados': ['como-automatizar-whatsapp-business-colombia', 'chatbot-ia-clinicas-colombia', 'cuanto-cuesta-chatbot-ia-colombia'],
 'faq': [
  ('¿El asistente puede dar asesoría jurídica?', 'No, y no debe. Se configura para reconocer preguntas de fondo y pasarlas al abogado. Responde solo lo operativo: áreas, citas, requisitos, estado registrado.'),
  ('¿Dónde quedan guardadas las conversaciones?', 'En la base de datos del despacho. Antes de contratar cualquier automatización conviene preguntar qué modelo de IA se usa, con qué datos y bajo qué contrato.'),
  ('¿Sirve para varios abogados con agendas distintas?', 'Sí. El asistente pregunta el área, identifica al abogado y agenda sobre su calendario.'),
 ],
},
{
 'slug': 'whatsapp-business-hoteles-colombia', 'publicado': '2026-05-25', 'categoria': 'Automatización · Hoteles', 'emoji': '🏨',
 'titulo': 'WhatsApp automático para hoteles: reservas sin agotar recepción',
 'h1': 'WhatsApp automático para hoteles: reservas, disponibilidad y confirmaciones sin agotar a recepción',
 'descripcion': 'Cómo un hotel pequeño o mediano en Colombia atiende disponibilidad, reservas y preguntas repetidas por WhatsApp con un asistente conectado a su calendario real.',
 'consulta': 'whatsapp automatico hoteles',
 'intro': """    <p>"¿Tienen habitación para el puente?", "¿cuánto vale la doble?", "¿incluye desayuno?", "¿a qué hora es el check-in?". Recepción contesta eso cientos de veces al mes, y en temporada alta contesta tarde, que en hotelería es lo mismo que no contestar: el huésped ya reservó en otro lado.</p>
    <p>Un asistente de WhatsApp conectado a la disponibilidad real del hotel responde eso en segundos, aparta la habitación y deja a recepción para lo que sí necesita una persona.</p>""",
 'secciones': [
  {'h2': 'Lo que responde el asistente sin intervención', 'html': """    <ul>
      <li><strong>Disponibilidad por fechas</strong>, consultando el calendario del hotel, no una lista que alguien actualiza a mano.</li>
      <li><strong>Tarifas por tipo de habitación y temporada</strong>, con lo que incluye y lo que no.</li>
      <li><strong>Las preguntas de siempre:</strong> horarios de check-in y check-out, parqueadero, mascotas, cómo llegar, políticas de cancelación.</li>
      <li><strong>Apartar y confirmar.</strong> Toma los datos, aparta la habitación, pide el anticipo si el hotel lo exige, y confirma cuando el pago se verifica.</li>
      <li><strong>Recordatorios</strong> antes de la llegada, y el mensaje de "¿cómo estuvo?" después de la salida, que es donde nacen las reseñas.</li>
    </ul>"""},
  {'h2': 'El anticipo, y por qué la foto no es un pago', 'html': """    <p>El mismo principio que aplicamos en <a href="/sistemas/para-canchas-sinteticas/">CanchaLibre</a> sirve para un hotel: una captura de transferencia que llega por WhatsApp <strong>no es un pago</strong>. El sistema la recibe, deja la reserva apartada "por verificar", y alguien que ve la cuenta la aprueba desde el celular. Hasta entonces la habitación está retenida por un tiempo definido; si el anticipo no llega, se libera y se avisa. Así se dejan de perder noches por reservas que nunca pagaron.</p>"""},
  {'h2': 'Lo que un hotel debe exigir', 'html': """    <ul>
      <li><strong>Que se conecte a la disponibilidad real.</strong> Un asistente que "responde" pero no ve el calendario termina vendiendo una habitación ocupada.</li>
      <li><strong>Que entienda audios.</strong> Los huéspedes mandan notas de voz.</li>
      <li><strong>Que sepa cuándo callarse.</strong> Un reclamo, una solicitud especial, una negociación de tarifa para un grupo: eso va a una persona, con la conversación completa.</li>
      <li><strong>Que no haga envíos masivos.</strong> WhatsApp bloquea números. Las promociones salen por lotes pequeños, solo a quien aceptó recibirlas.</li>
      <li><strong>Que el número siga siendo del hotel.</strong> Conexión por QR, sin ceder el número a una plataforma.</li>
    </ul>"""},
  {'h2': 'Qué cambia en la operación', 'html': """    <p>Recepción deja de ser un centro de mensajes. Las reservas quedan registradas con su anticipo, se sabe qué preguntas se repiten (y se pueden resolver en la página), y el huésped recibe respuesta a las once de la noche, que es cuando muchos reservan.</p>"""},
 ],
 'cta': {'h3': '¿Recepción contesta el WhatsApp entre check-ins?', 'p': 'Te mostramos un asistente conectado a disponibilidad real, con anticipo verificado.', 'boton': 'Ver cómo funciona para hoteles', 'wa': 'Hola, tengo un hotel y quiero ver cómo automatizan las reservas por WhatsApp'},
 'relacionados': ['como-automatizar-whatsapp-business-colombia', 'software-para-canchas-sinteticas-como-elegir', 'cuanto-cuesta-chatbot-ia-colombia'],
 'faq': [
  ('¿El asistente reserva directamente?', 'Sí: consulta el calendario, aparta la habitación y confirma cuando el anticipo se verifica. Lo que requiere criterio (grupos, reclamos) va a recepción.'),
  ('¿Funciona con el calendario que ya usamos?', 'Depende del sistema. Lo primero que revisamos es de dónde sale la disponibilidad; el asistente tiene que leer esa fuente, no otra.'),
  ('¿Se pierde el número del hotel?', 'No. Se conecta por código QR y el número sigue en recepción.'),
 ],
},
{
 'slug': 'chatbot-ia-clinicas-colombia', 'publicado': '2026-05-12', 'categoria': 'Automatización · Salud', 'emoji': '🩺',
 'titulo': 'Chatbot con IA para clínicas y consultorios: citas y recordatorios',
 'h1': 'Chatbot con IA para clínicas y consultorios en Colombia: citas, recordatorios y lo que nunca debe responder',
 'descripcion': 'Qué puede automatizar una clínica en WhatsApp —citas, confirmaciones, requisitos, ubicación— y qué debe quedar siempre en manos del personal. Con datos de salud, el límite importa.',
 'consulta': 'chatbot para clinicas',
 'intro': """    <p>Una clínica o un consultorio pierde dos cosas por WhatsApp: tiempo del personal contestando "¿tienen cita esta semana?", y citas a las que el paciente no llega porque nadie le recordó. Las dos se resuelven con un asistente conectado a la agenda. Pero en salud hay una tercera cosa que no se puede perder: el límite entre lo administrativo y lo clínico.</p>""",
 'secciones': [
  {'h2': 'Lo administrativo: lo que el asistente hace bien', 'html': """    <ul>
      <li><strong>Agendar citas</strong> sobre la agenda real de cada profesional: ofrece horarios libres, toma los datos, confirma.</li>
      <li><strong>Recordar y reconfirmar.</strong> El día anterior: "¿confirma su cita mañana a las 10?". Si el paciente cancela, el cupo se libera y se puede ofrecer a otro.</li>
      <li><strong>Requisitos y preparación.</strong> Qué traer, si hay que venir en ayunas, cuánto dura. Es la misma respuesta cada vez.</li>
      <li><strong>Ubicación, horarios, convenios.</strong> Lo que hoy contesta la recepcionista veinte veces al día.</li>
      <li><strong>Lista de espera.</strong> Cuando no hay cupo, anota al paciente y le avisa si se libera uno.</li>
    </ul>"""},
  {'h2': 'Lo clínico: lo que nunca debe responder', 'html': """    <p>Un modelo de lenguaje puede producir una respuesta que suena médica y estar mal. En una clínica eso es un riesgo para el paciente y para la institución. El asistente se configura para <strong>no responder</strong> síntomas, dosis, interpretación de resultados ni urgencias: reconoce ese tipo de mensaje y lo dirige a una persona o a la línea de urgencias, sin demora.</p>
    <p>Los datos de salud son datos sensibles bajo la Ley 1581 de 2012. Antes de contratar cualquier automatización, la clínica debe saber dónde se guardan las conversaciones, qué modelo de IA se usa, si ese proveedor usa los datos para entrenar, y tener el consentimiento del paciente para el tratamiento. Un proveedor que no puede responder eso con claridad no debería tocar el WhatsApp de una clínica.</p>"""},
  {'h2': 'Cómo se conecta', 'html': """    <p>Por código QR al número de la clínica, como WhatsApp Web: el personal lo sigue usando desde su celular y el asistente atiende encima. Las conversaciones que pasan a una persona llegan completas. Los detalles de cada forma de conexión están en la <a href="/blog/como-automatizar-whatsapp-business-colombia/">guía general de WhatsApp</a>.</p>"""},
  {'h2': 'Qué medir', 'html': """    <p>Dos números: cuántas citas se agendaron sin intervención del personal, y cuánto bajó la inasistencia después de los recordatorios. Son los que justifican la inversión, y el sistema los debe entregar sin que nadie los calcule a mano.</p>"""},
 ],
 'cta': {'h3': '¿Tu clínica contesta el WhatsApp entre pacientes?', 'p': 'Revisamos qué se automatiza y dónde va el límite, con tu agenda real.', 'boton': 'Conversar sobre mi clínica', 'wa': 'Hola, tengo una clínica y quiero saber qué se puede automatizar en WhatsApp'},
 'relacionados': ['como-automatizar-whatsapp-business-colombia', 'whatsapp-automatico-juridicos-colombia', 'pagina-web-clinica-colombia'],
 'faq': [
  ('¿El chatbot puede responder preguntas médicas?', 'No, y no debe. Se configura para reconocerlas y pasarlas al personal o a urgencias. Responde lo administrativo: citas, requisitos, ubicación.'),
  ('¿Qué pasa con los datos de los pacientes?', 'Son datos sensibles. La clínica debe saber dónde se guardan las conversaciones y qué modelo se usa, y tener el consentimiento del paciente. Es lo primero que revisamos.'),
  ('¿Reduce las citas a las que no llegan?', 'Los recordatorios con reconfirmación el día anterior son lo que más las reduce, y liberan el cupo cuando el paciente cancela.'),
 ],
},
{
 'slug': 'chatbot-ia-inmobiliarias-colombia', 'publicado': '2026-06-01', 'categoria': 'Automatización · Inmobiliarias', 'emoji': '🏠',
 'titulo': 'Chatbot con IA para inmobiliarias: calificar y agendar visitas',
 'h1': 'Chatbot con IA para inmobiliarias en Colombia: calificar interesados y agendar visitas sin que el asesor conteste todo',
 'descripcion': 'Cómo una inmobiliaria filtra los "¿todavía está disponible?", califica al interesado (presupuesto, zona, fecha) y agenda visitas por WhatsApp sin perder al asesor en mensajes.',
 'consulta': 'chatbot para inmobiliarias',
 'intro': """    <p>Un asesor inmobiliario recibe por WhatsApp decenas de "¿todavía está disponible?", "¿cuánto es la administración?", "¿se puede con mascota?". Muchos no tienen el presupuesto, no buscan en esa zona o quieren para dentro de un año. El asesor contesta a todos igual, y el que sí iba a cerrar espera.</p>
    <p>La automatización útil aquí no es responder más rápido a todos: es <strong>saber a quién responder primero</strong>.</p>""",
 'secciones': [
  {'h2': 'Calificar antes de que el asesor invierta tiempo', 'html': """    <p>El asistente hace las cuatro preguntas que un asesor haría de todas formas: qué busca (arriendo o compra), en qué zona, con qué presupuesto y para cuándo. Con eso, cada interesado queda calificado y el asesor ve primero a los que calzan con lo que hay. No es descartar gente: es atender en orden.</p>"""},
  {'h2': 'Lo que responde solo', 'html': """    <ul>
      <li><strong>Si el inmueble sigue disponible</strong>, consultando el inventario real de la inmobiliaria, no una lista desactualizada.</li>
      <li><strong>Datos del inmueble:</strong> área, administración, estrato, parqueadero, mascotas, fotos.</li>
      <li><strong>Alternativas parecidas</strong> cuando lo que preguntó ya se arrendó: mismo rango, misma zona.</li>
      <li><strong>Agendar la visita</strong> sobre la agenda del asesor, con recordatorio el día anterior.</li>
      <li><strong>Requisitos</strong> para arrendar: documentos, codeudor, estudio.</li>
    </ul>"""},
  {'h2': 'Lo que va al asesor', 'html': """    <p>Negociar el canon, resolver una objeción, un interesado calificado que pide hablar con alguien. El asistente pasa la conversación completa, con las respuestas a las cuatro preguntas, para que el asesor no empiece de cero.</p>
    <p>Los interesados quedan en la base de la inmobiliaria con su calificación. El que hoy no calzó, calza dentro de tres meses cuando entre un inmueble en su zona y su rango; el sistema puede avisarle, con su consentimiento, sin que nadie se acuerde.</p>"""},
  {'h2': 'Por qué no sirve un chatbot genérico', 'html': """    <p>Porque la respuesta valiosa —"¿sigue disponible?"— depende de datos que cambian todos los días. Un chatbot que no lee el inventario de la inmobiliaria solo puede decir "un asesor te contactará", que es exactamente lo que el interesado ya no quería. La automatización tiene que vivir sobre el sistema que administra los inmuebles. En la <a href="/blog/como-automatizar-whatsapp-business-colombia/">guía de WhatsApp</a> explicamos las formas de conectarlo.</p>"""},
 ],
 'cta': {'h3': '¿Tus asesores contestan lo mismo a todos?', 'p': 'Te mostramos cómo calificar interesados y agendar visitas sobre tu inventario real.', 'boton': 'Ver cómo funciona para inmobiliarias', 'wa': 'Hola, tengo una inmobiliaria y quiero ver cómo califican interesados por WhatsApp'},
 'relacionados': ['como-automatizar-whatsapp-business-colombia', 'cuanto-cuesta-chatbot-ia-colombia', 'que-es-un-erp-para-pymes'],
 'faq': [
  ('¿El chatbot descarta interesados?', 'No. Los califica con cuatro preguntas para que el asesor atienda en orden. Nadie se queda sin respuesta.'),
  ('¿Sabe si el inmueble sigue disponible?', 'Sí, si está conectado al inventario de la inmobiliaria. Sin esa conexión solo puede decir "consúltanos", que no sirve.'),
  ('¿Puede avisarle a un interesado cuando entre algo en su zona?', 'Sí, con su consentimiento y en horario comercial. Es una de las funciones que más cierres produce.'),
 ],
},
{
 'slug': 'cuanto-cuesta-chatbot-ia-colombia', 'publicado': '2026-05-12', 'categoria': 'Automatización · Costos', 'emoji': '💰',
 'titulo': '¿Cuánto cuesta un chatbot con IA en Colombia? Lo que cambia el precio',
 'h1': '¿Cuánto cuesta un chatbot con IA en Colombia? Lo que de verdad determina el precio',
 'descripcion': 'El precio de un chatbot no está en el chatbot: está en a qué datos se conecta y cuántas conversaciones van al modelo. Cómo estimar el costo y qué preguntar antes de contratar.',
 'consulta': 'cuanto cuesta un chatbot',
 'intro': """    <p>Cualquier cifra que alguien publique como "precio de un chatbot" está incompleta, porque un chatbot que responde un mensaje de bienvenida y uno que consulta el inventario, reserva y cobra no son el mismo producto. Aquí está lo que determina el precio, para que una cotización se pueda leer.</p>""",
 'secciones': [
  {'h2': 'Los tres costos que existen', 'html': """    <table>
      <tr><th>Costo</th><th>Qué es</th><th>De qué depende</th></tr>
      <tr><td><strong>Construcción</strong></td><td>Conectar el asistente a los datos del negocio y enseñarle qué hacer con cada tipo de mensaje.</td><td>De cuántos sistemas tiene que consultar (agenda, inventario, cartera) y de si esos sistemas ya existen.</td></tr>
      <tr><td><strong>Conversación con IA</strong></td><td>Lo que cobra el proveedor del modelo de lenguaje por cada mensaje que el modelo procesa.</td><td>De cuántos mensajes llegan al modelo. Con reglas para lo repetitivo, la mayoría no llega.</td></tr>
      <tr><td><strong>Canal</strong></td><td>Cero con conexión por QR. Con la API oficial de Meta, un cobro por conversación que Meta define por país.</td><td>De la opción de conexión elegida.</td></tr>
    </table>"""},
  {'h2': 'El costo que se dispara: mandar todo al modelo', 'html': """    <p>Un asistente que envía cada mensaje a un modelo de lenguaje grande sale caro. Lo medimos en <a href="/sistemas/para-canchas-sinteticas/">CanchaLibre</a>: con un modelo grande atendiendo todo, un negocio activo gastaba en tokens más que su mensualidad. La solución fue un asistente <strong>híbrido</strong>: las reglas responden lo repetitivo (horarios, precios, ubicación, confirmaciones) sin costo, y el modelo entra solo en lo que se sale de lo esperado. En producción, menos de una de cada cinco conversaciones llega al modelo, y el costo por negocio se mide en centavos por día.</p>
    <p>Cuando alguien cotice un chatbot, la pregunta es: <em>¿qué porcentaje de los mensajes va al modelo?</em> Si no sabe responder, no ha medido.</p>"""},
  {'h2': 'Por qué "chatbot" a secas casi nunca es lo que se necesita', 'html': """    <p>El valor no está en la conversación sino en lo que la conversación puede hacer: reservar, cotizar, decir si hay, recordar una cuota. Eso exige que el asistente esté conectado al sistema del negocio. Si el negocio no tiene el sistema, el chatbot solo puede prometer que "alguien lo contactará". Por eso, en la práctica, el chatbot suele ser un módulo del sistema —en CanchaLibre viene incluido en la mensualidad— y no un producto aparte.</p>"""},
  {'h2': 'Qué preguntar antes de firmar', 'html': """    <ul>
      <li>¿A qué datos del negocio se conecta, y cómo?</li>
      <li>¿Qué pasa cuando no entiende: inventa, calla, o pasa a una persona?</li>
      <li>¿Entiende audios?</li>
      <li>¿Qué porcentaje de mensajes va al modelo de IA, y quién paga eso?</li>
      <li>¿El número sigue siendo nuestro?</li>
      <li>¿Dónde quedan las conversaciones y quién más las ve?</li>
    </ul>
    <p>Las respuestas a esas seis preguntas dicen más del precio real que cualquier cifra de portada.</p>"""},
 ],
 'cta': {'h3': '¿Quieres una cotización que se pueda leer?', 'p': 'Cuéntanos qué tiene que consultar el asistente y te decimos qué se construye, qué cuesta y qué no hace falta.', 'boton': 'Pedir una cotización clara', 'wa': 'Hola, quiero una cotización de un asistente de WhatsApp para mi negocio'},
 'relacionados': ['como-automatizar-whatsapp-business-colombia', 'cuanto-cuesta-un-software-a-la-medida-en-colombia', 'automatizar-whatsapp-sin-api-oficial'],
 'faq': [
  ('¿Un chatbot tiene costo mensual?', 'Tiene dos posibles: lo que cobre el proveedor del modelo de IA por conversación (bajo si el asistente es híbrido) y, con la API oficial de Meta, un cobro por conversación. Con conexión por QR ese segundo costo no existe.'),
  ('¿Por qué unos chatbots cuestan tan distinto?', 'Porque no hacen lo mismo. Uno responde un saludo; otro consulta inventario, reserva y verifica pagos. El precio está en la conexión con los datos, no en el chat.'),
  ('¿Qué es un asistente híbrido?', 'Uno que responde lo repetitivo con reglas, gratis y sin errores, y usa el modelo de IA solo para lo inesperado. Es lo que mantiene el costo por conversación en centavos.'),
 ],
},
{
 'slug': 'que-es-n8n-automatizacion-colombia', 'publicado': '2026-05-02', 'categoria': 'Automatización · Herramientas', 'emoji': '🔗',
 'titulo': 'Qué es n8n y cuándo usarlo para automatizar una empresa',
 'h1': 'Qué es n8n, para qué sirve y cuándo conviene usarlo en una empresa colombiana',
 'descripcion': 'n8n conecta aplicaciones y automatiza tareas sin programar cada conexión. Qué es, qué hace bien, dónde se queda corto, y cuándo conviene más un sistema propio.',
 'consulta': 'que es n8n',
 'intro': """    <p>n8n es una herramienta de automatización de flujos: conecta aplicaciones (un formulario, una hoja de cálculo, un correo, WhatsApp, una base de datos) y ejecuta pasos cuando pasa algo. "Cuando llegue un pedido por el formulario, créalo en la hoja, avisa por WhatsApp al vendedor y manda el correo de confirmación". Es de código abierto y se puede instalar en un servidor propio, lo que la diferencia de Zapier o Make.</p>
    <p>Esta guía dice qué hace bien, dónde se queda corta, y —lo que casi nadie explica— cuándo conviene más construir un sistema propio.</p>""",
 'secciones': [
  {'h2': 'Cómo funciona', 'html': """    <p>Un flujo en n8n es una cadena de nodos. El primero es el <strong>disparador</strong>: algo que pasa (llega un correo, alguien llena un formulario, son las 7 de la mañana). Los siguientes son <strong>acciones</strong>: leer, transformar, guardar, avisar. Se arma arrastrando nodos en una pantalla y, cuando hace falta, escribiendo un poco de código en uno de ellos.</p>
    <p>Como se puede instalar en un servidor propio, los datos no pasan por un tercero y no hay cobro por operación: se paga el servidor. Eso lo hace atractivo para una pyme con volumen.</p>"""},
  {'h2': 'Lo que n8n hace bien', 'html': """    <ul>
      <li><strong>Pegar aplicaciones que ya existen.</strong> Un CRM con una hoja de cálculo, un formulario con un correo, una tienda en línea con un mensaje de WhatsApp.</li>
      <li><strong>Tareas programadas.</strong> Un reporte que se arma solo cada lunes, un recordatorio que sale cada mes.</li>
      <li><strong>Prototipar rápido.</strong> Probar si una automatización vale la pena antes de construirla en serio.</li>
    </ul>"""},
  {'h2': 'Dónde se queda corto', 'html': """    <p>n8n mueve datos entre sistemas. <strong>No es el sistema.</strong> Cuando el problema es que el negocio no tiene dónde vivir la información —un inventario que está en un cuaderno, una cartera que vive en la memoria del dueño, una producción que nadie registra—, no hay nada que conectar. Y cuando la lógica del negocio es compleja —una madera que entra en metros cúbicos y sale en pulgadas, una cancha de fútbol 11 que se divide en dos de 5, un torneo de póker que sienta 37 personas en mesas de 9— un flujo de nodos se vuelve una maraña imposible de mantener.</p>
    <p>Ahí lo que conviene es un sistema propio, con la lógica del negocio dentro, y usar n8n (si acaso) para las conexiones de la orilla: mandar un correo, avisar por Telegram. Así lo hacemos: los sistemas que construimos —<a href="/sistemas/para-depositos-de-madera/">madera</a>, <a href="/sistemas/para-corte-laser/">corte láser</a>, <a href="/sistemas/para-canchas-sinteticas/">canchas</a>— llevan la lógica adentro, y las automatizaciones simples van afuera.</p>"""},
  {'h2': 'Cuánto cuesta', 'html': """    <p>La herramienta en sí, instalada en servidor propio, no tiene licencia por uso: se paga el servidor (unos pocos dólares al mes en la nube) y el tiempo de quien arma y mantiene los flujos. Ese tiempo es el costo real, y crece con la complejidad. Un flujo de cinco nodos lo arma cualquiera en una tarde; uno de cuarenta, con manejo de errores, lo mantiene solo quien lo hizo.</p>"""},
  {'h2': 'Cómo decidir', 'html': """    <ul>
      <li>Si el negocio ya tiene sus datos en sistemas y solo hay que <em>conectarlos</em>: n8n.</li>
      <li>Si el negocio necesita <em>tener</em> sus datos en un sistema que entienda cómo opera: sistema propio, y n8n para la orilla.</li>
      <li>Si no está claro: un diagnóstico de una hora lo aclara. Es lo que hacemos antes de proponer cualquier cosa.</li>
    </ul>"""},
 ],
 'cta': {'h3': '¿No sabes si necesitas n8n o un sistema propio?', 'p': 'En una conversación de una hora lo aclaramos, sin compromiso. Te decimos si con n8n alcanza.', 'boton': 'Pedir un diagnóstico', 'wa': 'Hola, quiero saber si mi empresa necesita n8n o un sistema propio'},
 'relacionados': ['software-a-la-medida-vs-software-generico', 'que-es-un-erp-para-pymes', 'automatizacion-procesos-constructoras-colombia'],
 'faq': [
  ('¿n8n es gratis?', 'La versión de código abierto se instala en un servidor propio sin licencia por uso. Se paga el servidor y el tiempo de quien arma los flujos. También hay una versión en la nube de pago.'),
  ('¿Necesito saber programar?', 'Para flujos simples, no. Para transformar datos o manejar errores, un poco de JavaScript ayuda, y para flujos grandes hace falta alguien que los mantenga.'),
  ('¿n8n reemplaza un sistema de inventario o de reservas?', 'No. n8n conecta sistemas; no guarda ni entiende la lógica del negocio. Si no hay sistema, no hay nada que conectar.'),
  ('¿n8n o Zapier?', 'Zapier es más simple y cobra por operación; n8n se puede instalar en servidor propio y no cobra por uso. Para una pyme colombiana con volumen, n8n suele salir más barato.'),
 ],
},
]
