# -*- coding: utf-8 -*-
# Tanda B: sistemas por sector, facturacion, IA, y los de marketing reorientados.
ARTICULOS = [
{
 'slug': 'sistema-gestion-droguerias-colombia', 'publicado': '2026-06-05', 'categoria': 'Sistemas · Droguerías', 'emoji': '💊',
 'titulo': 'Software para droguerías: inventario, vencimientos y fiado',
 'h1': 'Software para droguerías en Colombia: inventario con vencimientos, fiado y lo que un genérico no resuelve',
 'descripcion': 'Qué necesita el sistema de una droguería de barrio: lotes y vencimientos, precios regulados, fiado por cliente, turnos de caja y pedidos a distribuidor. Y qué no hace un software genérico.',
 'consulta': 'software para droguerias',
 'intro': """    <p>Una droguería vende miles de referencias, muchas con fecha de vencimiento, varias con precio regulado, y fía. Un software genérico de punto de venta cuenta unidades y cobra; lo que no hace es avisar que el lote de amoxicilina vence en treinta días, ni llevar lo que debe la señora de la esquina, ni armar el pedido al distribuidor con lo que de verdad se está acabando.</p>
    <p>Aquí está lo que un sistema para droguería tiene que resolver, en el orden en que duele.</p>""",
 'secciones': [
  {'h2': 'Lotes y vencimientos: lo primero', 'html': """    <p>Un producto vencido en el estante es plata perdida y un riesgo legal. El inventario tiene que llevar <strong>lote y fecha por entrada</strong>, no un total por producto, para que el sistema pueda decir "de este medicamento hay 40 unidades, 12 vencen en 25 días" y sugerir venderlas primero. Es la diferencia entre un inventario y un contador.</p>"""},
  {'h2': 'Fiado por cliente, con límite', 'html': """    <p>La droguería de barrio fía. Lo fiado suele vivir en un cuaderno, y cuando el cuaderno se pierde o se moja, se pierde la plata. El sistema lleva el saldo por cliente, con un límite que el dueño define, y recuerda por WhatsApp cuando corresponde, sin que nadie tenga que llamar. Es el mismo módulo de cartera que usamos en <a href="/sistemas/para-ferreterias/">ferreterías</a>: quién debe, cuánto, desde cuándo.</p>"""},
  {'h2': 'Caja por turno', 'html': """    <p>Con dos o tres personas rotando, "faltó plata" no tiene dueño si no hay corte por turno. Cada turno abre con una base, registra ventas por medio de pago (efectivo, Nequi, tarjeta), gastos de caja, y cierra con lo contado contra lo que el sistema dice que debería haber. La diferencia queda registrada con nombre.</p>"""},
  {'h2': 'Pedidos al distribuidor con datos', 'html': """    <p>El pedido semanal se arma hoy mirando el estante. Con rotación real por producto —qué se vende, cuánto, cada cuánto— el sistema propone el pedido: lo que está por debajo del mínimo y lo que se va a agotar antes de la próxima entrega. Se revisa en cinco minutos en vez de una hora.</p>"""},
  {'h2': 'Lo que no hace falta al principio', 'html': """    <p>Facturación electrónica integrada, control de fórmulas, programa de puntos. Todo eso se puede agregar; lo que no se puede es empezar por ahí. El orden que funciona es inventario con vencimientos, caja por turno, cartera, y después lo demás. Un sistema se entrega por módulos, en producción: el primero se usa mientras se construye el siguiente. Así trabajamos los <a href="/sistemas/">sistemas a la medida</a>.</p>"""},
 ],
 'cta': {'h3': '¿El inventario de tu droguería vive en la cabeza del regente?', 'p': 'Revisamos lotes, vencimientos, fiado y caja, y definimos el primer módulo. Sin costo.', 'boton': 'Conversar sobre mi droguería', 'wa': 'Hola, tengo una droguería y quiero ver un sistema con vencimientos y fiado'},
 'relacionados': ['que-es-un-erp-para-pymes', 'software-a-la-medida-vs-software-generico', 'sistema-gestion-talleres-mecanicos-colombia'],
 'faq': [
  ('¿El sistema avisa los vencimientos?', 'Sí, si lleva lote y fecha por cada entrada. Muestra qué vence en los próximos días y sugiere venderlo primero.'),
  ('¿Lleva lo fiado?', 'Sí: saldo por cliente, límite definido por el dueño, y recordatorios por WhatsApp en horario comercial.'),
  ('¿Se puede empezar sin facturación electrónica?', 'Sí. Lo primero es inventario, caja y cartera; la facturación electrónica se integra después con el proveedor autorizado que la droguería elija.'),
 ],
},
{
 'slug': 'sistema-gestion-talleres-mecanicos-colombia', 'publicado': '2026-05-12', 'categoria': 'Sistemas · Talleres', 'emoji': '🔧',
 'titulo': 'Software para talleres mecánicos: órdenes, repuestos y cobro',
 'h1': 'Software para talleres mecánicos en Colombia: órdenes de trabajo, repuestos, mano de obra y cobro sin sorpresas',
 'descripcion': 'Qué resuelve un sistema para taller: la orden de trabajo por vehículo, repuestos que entran y salen, mano de obra por mecánico, cotización aprobada por WhatsApp y cobro que cuadra.',
 'consulta': 'software para talleres mecanicos',
 'intro': """    <p>En un taller la información vive en un tablero, en un cuaderno de repuestos y en la memoria del jefe de patio. Cuando el cliente pregunta "¿cómo va mi carro?" o "¿por qué me cobran esto?", hay que reconstruir la historia. Un sistema para taller no es un programa de facturar: es la <strong>orden de trabajo</strong> como centro de todo.</p>""",
 'secciones': [
  {'h2': 'La orden de trabajo es el sistema', 'html': """    <p>Todo cuelga de ella: el vehículo (placa, kilometraje, historial), el diagnóstico, la cotización, los repuestos que se usan, la mano de obra por mecánico, las fotos del antes y el después, y el estado (en diagnóstico, esperando aprobación, en reparación, listo). Si la orden está bien hecha, "¿cómo va mi carro?" se responde solo.</p>"""},
  {'h2': 'Cotización aprobada por WhatsApp', 'html': """    <p>El taller cotiza, el cliente aprueba —o no— por WhatsApp, y esa aprobación queda en la orden. Nada de "yo nunca autoricé eso". Si aparece un daño adicional a mitad de la reparación, se agrega a la orden, se cotiza y se pide aprobación otra vez, con registro. Es el mismo principio del asistente de WhatsApp que usamos en otros sistemas: la conversación queda ligada al dato, no suelta en un chat.</p>"""},
  {'h2': 'Repuestos: lo que entra, lo que sale y a qué orden fue', 'html': """    <p>El inventario de repuestos se descuenta cuando se usa en una orden, no al final del mes de memoria. Así se sabe qué se compró para un carro específico (y se cobra), qué es stock del taller, y qué se está acabando. El margen por repuesto queda visible por orden.</p>"""},
  {'h2': 'Mano de obra por mecánico', 'html': """    <p>Cada tarea de la orden tiene un mecánico y un tiempo. Al cierre de quincena, el sistema dice cuánto produjo cada uno, sin sumar a mano. Si el taller paga por porcentaje, la liquidación sale de ahí.</p>"""},
  {'h2': 'Cobro y caja', 'html': """    <p>La orden cerrada es la cuenta: repuestos, mano de obra, IVA si aplica. Se cobra por el medio que sea y queda en la caja del día. Lo que el cliente quedó debiendo va a cartera con recordatorio. Con eso, la pregunta "¿cuánto ganó el taller este mes?" tiene respuesta sin abrir Excel.</p>"""},
 ],
 'cta': {'h3': '¿Tu taller vive en un tablero y un cuaderno?', 'p': 'Revisamos órdenes, repuestos, mano de obra y cobro, y definimos por dónde empezar.', 'boton': 'Conversar sobre mi taller', 'wa': 'Hola, tengo un taller mecánico y quiero ver un sistema de órdenes de trabajo'},
 'relacionados': ['que-es-un-erp-para-pymes', 'sistema-gestion-droguerias-colombia', 'como-automatizar-whatsapp-business-colombia'],
 'faq': [
  ('¿El cliente puede aprobar la cotización por WhatsApp?', 'Sí, y la aprobación queda registrada en la orden de trabajo. Los adicionales se cotizan y aprueban igual.'),
  ('¿Lleva el historial por placa?', 'Sí. Cada vehículo tiene sus órdenes anteriores, kilometraje y lo que se le ha hecho.'),
  ('¿Sirve para liquidar a los mecánicos?', 'Sí, si cada tarea de la orden tiene mecánico y valor. La liquidación por quincena sale del sistema.'),
 ],
},
{
 'slug': 'app-movil-supermercado-colombia', 'publicado': '2026-05-28', 'categoria': 'Sistemas · Comercio', 'emoji': '🛒',
 'titulo': 'App para supermercado de barrio: domicilios sin perder margen',
 'h1': 'App para supermercado de barrio en Colombia: domicilios y pedidos sin perder el margen ni el control',
 'descripcion': 'Antes de una app de domicilios, un supermercado necesita inventario y precios en un sistema. Qué debe tener la app, qué la conecta con la caja, y por qué WhatsApp puede ser suficiente.',
 'consulta': 'app para supermercado domicilios',
 'intro': """    <p>La pregunta llega así: "quiero una app para que mis clientes pidan domicilio". La respuesta honesta empieza con otra pregunta: ¿el inventario y los precios están en un sistema? Porque una app que muestra productos que no hay, o precios viejos, produce devoluciones y reclamos, no ventas. La app es la última capa; el sistema es la primera.</p>""",
 'secciones': [
  {'h2': 'Lo que tiene que existir antes de la app', 'html': """    <ul>
      <li><strong>Inventario real por producto</strong>, descontado en cada venta de mostrador, para que la app no venda lo que no hay.</li>
      <li><strong>Precios en un solo lugar</strong>: el que ve la caja es el que ve la app.</li>
      <li><strong>Caja por turno</strong>, para que el domicilio pagado en efectivo al domiciliario entre a la caja y no se pierda.</li>
    </ul>
    <p>Si esto no existe, la app es prematura. El orden correcto es sistema primero; la app se conecta a él.</p>"""},
  {'h2': 'Qué debe hacer la app (o el pedido por WhatsApp)', 'html': """    <ul>
      <li>Mostrar productos con existencia y precio del momento, por categoría, con búsqueda.</li>
      <li>Armar el pedido, calcular el domicilio por zona, y elegir medio de pago.</li>
      <li>Entrar a la caja como una venta más, con su domiciliario asignado.</li>
      <li>Avisar al cliente cuando sale el pedido.</li>
    </ul>
    <p>Para muchos supermercados de barrio, la "app" más usada es <strong>WhatsApp</strong>. Un asistente que recibe la lista ("2 libras de arroz, un aceite, pan"), la convierte en pedido con el inventario real y confirma el total, hace lo mismo que una app sin pedirle al cliente que instale nada. Es lo que describimos en la <a href="/blog/como-automatizar-whatsapp-business-colombia/">guía de automatizar WhatsApp</a>.</p>"""},
  {'h2': 'El margen del domicilio', 'html': """    <p>Un domicilio cuesta: el domiciliario, la bolsa, el tiempo. Si la app no calcula el cargo por zona y el mínimo de pedido, se vende con pérdida sin darse cuenta. El sistema debe mostrar el margen del pedido, no solo el total.</p>"""},
  {'h2': 'Cuándo sí conviene una app instalable', 'html': """    <p>Cuando hay volumen suficiente para que el cliente quiera tener el supermercado en su celular, y cuando se quiere fidelizar con puntos o promociones. Antes de eso, WhatsApp más un sistema con inventario da el mismo resultado con una fracción del costo. Construimos las dos cosas; lo importante es hacerlas en orden.</p>"""},
 ],
 'cta': {'h3': '¿Quieres domicilios sin perder el control?', 'p': 'Revisamos si tu inventario está listo para eso, y qué conviene primero: WhatsApp o app.', 'boton': 'Conversar sobre mi supermercado', 'wa': 'Hola, tengo un supermercado y quiero recibir pedidos a domicilio'},
 'relacionados': ['que-es-un-erp-para-pymes', 'como-automatizar-whatsapp-business-colombia', 'sistema-gestion-droguerias-colombia'],
 'faq': [
  ('¿Necesito una app o basta con WhatsApp?', 'Para la mayoría de supermercados de barrio, WhatsApp con un asistente conectado al inventario hace lo mismo sin que el cliente instale nada. La app conviene con volumen y programa de fidelización.'),
  ('¿La app puede vender lo que no hay?', 'Solo si no está conectada al inventario real. Por eso el sistema va primero.'),
  ('¿Cómo entra el pago del domicilio a la caja?', 'Como una venta más, con el medio de pago y el domiciliario asignado, para que el efectivo no se pierda en el camino.'),
 ],
},
{
 'slug': 'automatizacion-procesos-constructoras-colombia', 'publicado': '2026-05-21', 'categoria': 'Automatización · Construcción', 'emoji': '🏗️',
 'titulo': 'Automatización de procesos en constructoras: obra, compras y cortes',
 'h1': 'Automatización de procesos en constructoras: reportes de obra, compras y cortes de contratistas sin Excel',
 'descripcion': 'Dónde se pierde la plata en una constructora mediana —reportes de obra tardíos, compras sin control, cortes de contratistas a mano— y qué automatizar primero.',
 'consulta': 'automatizacion de procesos constructoras',
 'intro': """    <p>En una constructora la información nace en la obra y se digita en la oficina días después. Lo que se compró, lo que se gastó, lo que avanzó cada contratista, lo que falta. Cuando el gerente pregunta cuánto va del presupuesto, alguien arma un Excel de memoria. Automatizar no es tener un programa más: es que lo que pasa en la obra entre al sistema el mismo día.</p>""",
 'secciones': [
  {'h2': 'El reporte de obra desde el celular', 'html': """    <p>El residente reporta desde el celular lo que avanzó, qué material llegó, qué faltó, con foto. Sin computador, sin formulario largo: un bot de Telegram o WhatsApp que pregunta lo mínimo y guarda en el sistema. Es el mismo mecanismo que usamos para el <a href="/blog/reporte-de-produccion-por-telegram/">reporte de planta en un depósito de madera</a>: la información entra donde nace, no donde se digita.</p>"""},
  {'h2': 'Compras contra presupuesto', 'html': """    <p>Cada orden de compra se carga contra el capítulo del presupuesto de la obra. Así el sistema puede decir, sin que nadie calcule, que en "acero de refuerzo" ya se gastó el 80 % y la obra va en el 60 %. Ese aviso a tiempo es lo que evita el sobrecosto que se descubre al final.</p>"""},
  {'h2': 'Cortes de contratistas', 'html': """    <p>El corte quincenal —cuánto avanzó cada contratista, a qué precio unitario, qué se retiene— se arma hoy a mano y se discute. Con cantidades reportadas desde la obra y precios pactados en el sistema, el corte sale calculado y el contratista lo ve por WhatsApp. Las discusiones bajan porque la base es la misma para los dos.</p>"""},
  {'h2': 'Lo que no hay que automatizar primero', 'html': """    <p>La contabilidad, la nómina, la facturación electrónica. Eso ya lo hace el contador con sus herramientas. Lo que no tiene nadie es el <strong>dato operativo del día</strong>: avance, compras, cortes. Por ahí se empieza, y la contabilidad recibe la información ordenada en vez de reconstruirla.</p>"""},
  {'h2': 'Cómo se entrega', 'html': """    <p>Por módulos, en producción. Primero el reporte de obra —que se usa desde la primera semana—, después compras contra presupuesto, después cortes. Cada módulo se usa mientras se construye el siguiente. Así trabajamos todos los <a href="/sistemas/">sistemas a la medida</a>.</p>"""},
 ],
 'cta': {'h3': '¿El avance de tus obras se sabe con días de retraso?', 'p': 'Revisamos reportes, compras y cortes, y definimos el primer módulo. Sin costo.', 'boton': 'Conversar sobre mi constructora', 'wa': 'Hola, tengo una constructora y quiero automatizar reportes de obra y cortes'},
 'relacionados': ['reporte-de-produccion-por-telegram', 'que-es-un-erp-para-pymes', 'software-a-la-medida-vs-software-generico'],
 'faq': [
  ('¿El residente necesita computador?', 'No. Reporta desde el celular por un bot de Telegram o WhatsApp, con foto, y entra directo al sistema.'),
  ('¿Reemplaza el software contable?', 'No. Le entrega el dato operativo ordenado. La contabilidad sigue con el contador.'),
  ('¿Sirve para varias obras a la vez?', 'Sí. Cada obra tiene su presupuesto, sus compras y sus contratistas; el gerente ve todas.'),
 ],
},
{
 'slug': 'facturacion-electronica-automatica-colombia', 'publicado': '2026-05-02', 'categoria': 'Automatización · Facturación', 'emoji': '🧾',
 'titulo': 'Facturación electrónica automática en Colombia: cómo integrarla',
 'h1': 'Facturación electrónica automática en Colombia: cómo integrarla al sistema para no digitar dos veces',
 'descripcion': 'La factura electrónica ya es obligatoria; lo que sigue costando es digitarla aparte. Cómo se integra con el sistema de la empresa, qué hace el proveedor tecnológico y qué no.',
 'consulta': 'facturacion electronica automatica',
 'intro': """    <p>Casi toda empresa en Colombia ya factura electrónicamente ante la DIAN a través de un proveedor tecnológico autorizado. Lo que sigue costando no es la factura: es que la venta se registra en un sistema y la factura se digita en otro. Dos veces el mismo dato, y un error entre los dos.</p>
    <p>Automatizar la facturación electrónica no es cambiar de proveedor: es que el sistema donde nace la venta <strong>le mande la factura al proveedor</strong> sin que nadie la vuelva a escribir.</p>""",
 'secciones': [
  {'h2': 'Quién hace qué', 'html': """    <table>
      <tr><th>Actor</th><th>Qué hace</th></tr>
      <tr><td><strong>La DIAN</strong></td><td>Define el formato, valida y numera. No se le manda nada directamente desde una pyme.</td></tr>
      <tr><td><strong>El proveedor tecnológico</strong></td><td>Recibe la factura, la valida ante la DIAN, la firma y la devuelve con su código. Tiene una interfaz para digitar, y casi siempre una conexión (API) para recibirla desde otro sistema.</td></tr>
      <tr><td><strong>El sistema de la empresa</strong></td><td>Donde nace la venta: el pedido, la orden de trabajo, la reserva cobrada. Es el que debería mandar la factura al proveedor.</td></tr>
    </table>"""},
  {'h2': 'Cómo se integra', 'html': """    <p>El sistema arma la factura con los datos de la venta (cliente, ítems, impuestos) y la envía al proveedor por su conexión. El proveedor responde con la validación y el código. El sistema guarda la factura ligada a la venta, y el cliente la recibe por correo o WhatsApp. Nadie digitó nada dos veces.</p>
    <p>Lo que hay que tener antes: los clientes con NIT o cédula y correo en el sistema, los productos con su tarifa de IVA, y el proveedor tecnológico con conexión habilitada. Sin eso, la integración no tiene de dónde sacar los datos.</p>"""},
  {'h2': 'Lo que no se automatiza', 'html': """    <p>La decisión de <em>qué</em> se factura y a quién. Un sistema puede proponer la factura desde la venta, pero quien la emite sigue siendo una persona con permiso para hacerlo, porque una factura electrónica emitida es un documento legal que no se borra: se anula con nota crédito. Por eso en nuestros sistemas la emisión está gateada a un rol, y queda registrado quién la emitió.</p>"""},
  {'h2': 'Cuándo vale la pena', 'html': """    <p>Cuando se emiten más facturas de las que una persona puede digitar sin equivocarse, o cuando el error entre sistemas ya costó una nota crédito. Para una empresa con pocas facturas al mes, la interfaz del proveedor alcanza; la integración se justifica con volumen. Es una pregunta que se responde con el número de facturas del mes pasado, no con una promesa.</p>"""},
 ],
 'cta': {'h3': '¿Digitas la venta en un sistema y la factura en otro?', 'p': 'Revisamos tu proveedor y tu sistema, y te decimos si la integración se justifica.', 'boton': 'Revisar mi facturación', 'wa': 'Hola, quiero integrar la facturación electrónica con mi sistema'},
 'relacionados': ['que-es-un-erp-para-pymes', 'automatizacion-procesos-constructoras-colombia', 'sistema-gestion-talleres-mecanicos-colombia'],
 'faq': [
  ('¿Hay que cambiar de proveedor tecnológico para automatizar?', 'No. La mayoría de proveedores autorizados tienen una conexión para recibir facturas desde otro sistema. La integración se hace con el que ya se tiene.'),
  ('¿El sistema emite la factura solo?', 'La arma desde la venta, pero la emisión la hace una persona con permiso: una factura electrónica emitida no se borra, se anula con nota crédito.'),
  ('¿Se justifica para pocas facturas?', 'Normalmente no. Con pocas facturas al mes, la interfaz del proveedor alcanza. La integración vale con volumen o cuando los errores de digitación ya cuestan.'),
 ],
 'fuentes': [('DIAN — Facturación electrónica', 'https://www.dian.gov.co/impuestos/factura-electronica/Paginas/default.aspx')],
},
{
 'slug': 'inteligencia-artificial-negocios-colombia', 'publicado': '2026-06-15', 'categoria': 'Inteligencia artificial', 'emoji': '🤖',
 'titulo': 'Inteligencia artificial para negocios en Colombia: usos reales',
 'h1': 'Inteligencia artificial para negocios en Colombia: los usos que sí funcionan y los que son humo',
 'descripcion': 'Dónde la IA sirve hoy en una pyme colombiana —atender WhatsApp, transcribir audios, leer comprobantes— y dónde es una promesa cara. Con lo que hemos medido en producción.',
 'consulta': 'inteligencia artificial para negocios',
 'intro': """    <p>Hay dos versiones de la inteligencia artificial para negocios: la de las conferencias, donde la IA "transforma" empresas, y la de la operación, donde un modelo de lenguaje entiende un audio de WhatsApp y aparta una cancha. Este artículo es sobre la segunda. Está escrito desde lo que hemos puesto en producción y medido, no desde lo que podría pasar.</p>""",
 'secciones': [
  {'h2': 'Lo que sí funciona hoy', 'html': """    <ul>
      <li><strong>Entender lo que el cliente escribe o dicta.</strong> "Hay cancha el sábado tipo 7 para 12" es una frase que una regla no entiende y un modelo sí. Es el uso con más retorno en Colombia porque el negocio pasa por WhatsApp y por audios.</li>
      <li><strong>Transcribir audios.</strong> Una nota de voz de veinte palabras se convierte en texto y se procesa como cualquier mensaje.</li>
      <li><strong>Leer documentos.</strong> Una foto de una lista de pedido, un comprobante de transferencia, una factura de proveedor: el modelo saca los datos y el sistema los verifica.</li>
      <li><strong>Escribir lo repetitivo.</strong> El recordatorio, la confirmación, la respuesta a "¿dónde quedan?", con el tono del negocio.</li>
    </ul>"""},
  {'h2': 'Lo que es humo (por ahora)', 'html': """    <ul>
      <li><strong>"La IA va a administrar su empresa."</strong> No. La IA entiende y redacta; las decisiones con plata, inventario y personas siguen siendo del sistema y de la gente. Un modelo que "decide" cuánto cobrar o si aprobar un pago es un riesgo, no una función.</li>
      <li><strong>Un chatbot sin sistema detrás.</strong> Si no consulta datos reales, solo puede prometer que alguien contactará. Eso ya lo hacía el mensaje de ausencia.</li>
      <li><strong>Mandar todo al modelo.</strong> Sale caro. Lo medimos: un negocio activo gastaba más en tokens que en su mensualidad. La solución es híbrida: reglas para lo repetitivo, modelo para lo raro.</li>
    </ul>"""},
  {'h2': 'La regla que aplicamos: escalar ante la duda', 'html': """    <p>Un modelo que no está seguro tiene que pasar la conversación a una persona, no inventar. Contestar mal gratis es peor que pagar centavos por contestar bien, y peor todavía que decir "un momento, te comunico con alguien". En el asistente de <a href="/sistemas/para-canchas-sinteticas/">CanchaLibre</a> eso es una regla de diseño, no una opción.</p>"""},
  {'h2': 'Qué preguntar antes de comprar "IA"', 'html': """    <ul>
      <li>¿Qué datos del negocio consulta, y de dónde?</li>
      <li>¿Qué hace cuando no entiende?</li>
      <li>¿Qué porcentaje de las interacciones va al modelo, y cuánto cuesta cada una?</li>
      <li>¿Dónde quedan los datos y quién más los ve?</li>
      <li>¿Qué decisión toma el modelo solo? (La respuesta correcta es: ninguna con plata.)</li>
    </ul>"""},
 ],
 'cta': {'h3': '¿Quieres ver IA aplicada a una operación real?', 'p': 'Te mostramos un asistente en producción: qué entiende, qué no, y cuánto cuesta por conversación.', 'boton': 'Ver una demo real', 'wa': 'Hola, quiero ver cómo aplican inteligencia artificial en un negocio real'},
 'relacionados': ['como-automatizar-whatsapp-business-colombia', 'cuanto-cuesta-chatbot-ia-colombia', 'automatizar-whatsapp-sin-api-oficial'],
 'faq': [
  ('¿La IA puede administrar mi negocio?', 'No. Entiende lenguaje, transcribe, lee documentos y redacta. Las decisiones con plata, inventario y personas siguen en el sistema y en la gente.'),
  ('¿Cuánto cuesta usar IA en un negocio?', 'Depende de cuántas interacciones van al modelo. Con un diseño híbrido (reglas para lo repetitivo), se mide en centavos por día por negocio.'),
  ('¿Qué pasa cuando la IA no entiende?', 'Debe pasar a una persona. Un sistema que inventa respuestas es un riesgo, no una ventaja.'),
 ],
},
{
 'slug': 'marketing-digital-restaurantes-colombia', 'publicado': '2026-05-14', 'categoria': 'Negocio · Restaurantes', 'emoji': '🍽️',
 'titulo': 'Marketing digital para restaurantes: lo que sirve sin agencia',
 'h1': 'Marketing digital para restaurantes en Colombia: lo que sirve, lo que no, y por qué sin sistema de reservas se pierde',
 'descripcion': 'Ficha de Google, WhatsApp que responde, reservas que no se pierden y una base de clientes propia. Lo que un restaurante puede hacer sin agencia, y qué necesita tener antes de pautar.',
 'consulta': 'marketing digital para restaurantes',
 'intro': """    <p>Un restaurante puede gastar en pauta y perder la mitad del resultado en el WhatsApp: el cliente escribe para reservar, nadie contesta a tiempo, y reserva en otro lado. El marketing digital que sirve en un restaurante empieza por <strong>no perder al que ya llegó</strong>, y después por traer más.</p>""",
 'secciones': [
  {'h2': 'Lo primero: que te encuentren y te puedan escribir', 'html': """    <ul>
      <li><strong>Ficha de Google Business Profile completa</strong>: horario real, menú, fotos propias, categoría correcta, y responder las reseñas. Es gratis y es donde más gente decide.</li>
      <li><strong>WhatsApp que responde.</strong> Reservas, horario, dirección, "¿tienen opción vegetariana?". Un asistente conectado a la agenda de mesas responde y reserva; el equipo atiende el salón. Cómo se hace está en la <a href="/blog/como-automatizar-whatsapp-business-colombia/">guía de WhatsApp</a>.</li>
      <li><strong>Una página propia</strong> con menú, horario, mapa y botón de WhatsApp. No hace falta más; sí hace falta que cargue rápido en un celular.</li>
    </ul>"""},
  {'h2': 'Reservas que no se pierden', 'html': """    <p>Una reserva es una promesa hasta que hay algo que la respalde. Para fechas especiales (Día de la Madre, diciembre) un abono pequeño por reserva elimina las mesas vacías de los que no llegaron. El sistema recibe el comprobante, lo deja "por verificar", y confirma cuando alguien lo aprueba. Es el mismo principio que aplicamos en las <a href="/sistemas/para-canchas-sinteticas/">canchas sintéticas</a>, donde el problema es idéntico.</p>"""},
  {'h2': 'Una base de clientes propia', 'html': """    <p>Las redes prestan la audiencia; la base de clientes es del restaurante. Con los clientes que reservaron —nombre, teléfono, cuándo vinieron, con consentimiento— se puede avisar de un evento o un plato nuevo por WhatsApp, por lotes pequeños y en horario comercial. Un mensaje a quien ya vino rinde más que cualquier anuncio a desconocidos.</p>"""},
  {'h2': 'Pauta: cuándo y con qué', 'html': """    <p>Después de lo anterior, no antes. Pautar para traer gente a un WhatsApp que no contesta es regalar plata. Cuando la ficha, el WhatsApp y las reservas funcionan, la pauta en Instagram o Google para la zona del restaurante sí convierte, y se puede medir: cuántos escribieron, cuántos reservaron, cuántos llegaron.</p>"""},
 ],
 'cta': {'h3': '¿Tu restaurante pierde reservas en el WhatsApp?', 'p': 'Revisamos ficha, WhatsApp y reservas, y te decimos qué hacer antes de gastar en pauta.', 'boton': 'Conversar sobre mi restaurante', 'wa': 'Hola, tengo un restaurante y quiero dejar de perder reservas por WhatsApp'},
 'relacionados': ['como-automatizar-whatsapp-business-colombia', 'cuanto-cuesta-pagina-web-restaurante-colombia', 'seo-local-colombia-guia'],
 'faq': [
  ('¿Un restaurante necesita agencia de marketing?', 'Para lo básico —ficha de Google, WhatsApp que responde, página con menú— no. Para pautar con presupuesto grande, puede ayudar. Pero la pauta va después de que lo básico funcione.'),
  ('¿Sirve cobrar abono por reserva?', 'Para fechas especiales, sí: elimina las mesas vacías. Para un martes normal, no hace falta.'),
  ('¿Puedo mandar promociones por WhatsApp?', 'A quien aceptó recibirlas, por lotes pequeños y en horario comercial. Los envíos masivos hacen que WhatsApp bloquee el número.'),
 ],
},
{
 'slug': 'marketing-digital-gimnasios-colombia', 'publicado': '2026-05-12', 'categoria': 'Negocio · Gimnasios', 'emoji': '🏋️',
 'titulo': 'Marketing digital para gimnasios: retener antes que captar',
 'h1': 'Marketing digital para gimnasios en Colombia: retener antes que captar, y el sistema que lo hace posible',
 'descripcion': 'Un gimnasio pierde más por los que se van que por los que no llegan. Cómo un sistema de membresías con recordatorios y seguimiento hace más que la pauta, y cuándo pautar.',
 'consulta': 'marketing digital para gimnasios',
 'intro': """    <p>La pauta trae gente en enero. En marzo la mitad ya no viene, y en abril dejó de pagar. Un gimnasio que solo mide inscripciones nuevas está llenando un balde con hueco. El marketing que más rinde en un gimnasio es el que <strong>retiene</strong>, y eso no lo hace una agencia: lo hace un sistema.</p>""",
 'secciones': [
  {'h2': 'Saber quién dejó de venir antes de que deje de pagar', 'html': """    <p>Con control de ingreso por socio, el sistema sabe quién lleva dos semanas sin venir. Ese es el momento de escribirle —"te extrañamos, ¿todo bien?"— no cuando ya no renovó. Un mensaje a tiempo, por WhatsApp, con su nombre, recupera a una parte. Sin registro de asistencia, esa parte se pierde sin que nadie se entere.</p>"""},
  {'h2': 'Membresías y cobro sin perseguir', 'html': """    <p>Cada socio tiene su plan, su fecha de vencimiento y su medio de pago. El sistema recuerda el vencimiento tres días antes, y el día, por WhatsApp; el socio paga por Nequi o transferencia, manda el comprobante, y queda "por verificar" hasta que la recepción lo aprueba. Nadie llama a cobrar. Es el mismo flujo de comprobantes que usamos en otros sistemas: la foto no es un pago hasta que alguien lo confirma.</p>"""},
  {'h2': 'Lo básico para que te encuentren', 'html': """    <ul>
      <li>Ficha de Google con horario real, fotos del gimnasio (no de banco de imágenes) y reseñas respondidas.</li>
      <li>WhatsApp que responde precios, horarios y planes sin que recepción lo haga cien veces.</li>
      <li>Una página que cargue rápido en celular, con planes y botón de WhatsApp.</li>
    </ul>"""},
  {'h2': 'Cuándo pautar', 'html': """    <p>Cuando la retención está medida y el WhatsApp responde. Entonces la pauta en la zona del gimnasio —Instagram, Google Maps— trae gente que sí se queda, y se puede medir cuántos de los que llegaron por pauta siguen pagando a los tres meses. Ese número es el que dice si la pauta rinde; el de "inscripciones nuevas" no.</p>"""},
 ],
 'cta': {'h3': '¿Sabes quién dejó de ir a tu gimnasio esta semana?', 'p': 'Revisamos control de ingreso, membresías y cobro, y definimos qué automatizar primero.', 'boton': 'Conversar sobre mi gimnasio', 'wa': 'Hola, tengo un gimnasio y quiero un sistema de membresías con recordatorios'},
 'relacionados': ['como-automatizar-whatsapp-business-colombia', 'que-es-un-erp-para-pymes', 'seo-local-colombia-guia'],
 'faq': [
  ('¿Qué rinde más en un gimnasio: pauta o retención?', 'Retención. Un socio que se queda vale más que dos inscripciones nuevas de las que una se va en dos meses. Primero retener, después pautar.'),
  ('¿Cómo sé quién dejó de venir?', 'Con control de ingreso por socio. El sistema avisa quién lleva dos semanas sin entrar, y ese es el momento de escribirle.'),
  ('¿El cobro se puede automatizar?', 'Los recordatorios sí. La aprobación del pago la hace una persona: el comprobante queda por verificar hasta que recepción lo confirma.'),
 ],
},
{
 'slug': 'marketing-digital-colegios-colombia', 'publicado': '2026-06-03', 'categoria': 'Negocio · Colegios', 'emoji': '🏫',
 'titulo': 'Marketing digital para colegios: matrículas y comunicación',
 'h1': 'Marketing digital para colegios en Colombia: más matrículas empiezan por atender bien a las familias que ya preguntaron',
 'descripcion': 'Un colegio pierde matrículas en el WhatsApp de admisiones. Cómo atender cada familia, agendar visitas, dar seguimiento y comunicarse con los padres actuales, antes de gastar en pauta.',
 'consulta': 'marketing digital para colegios',
 'intro': """    <p>Entre octubre y enero el WhatsApp de admisiones de un colegio recibe decenas de familias preguntando lo mismo: pensión, cupos, jornada, ruta, requisitos. Quien contesta es una secretaria que también atiende el teléfono y la puerta. Las familias que no reciben respuesta el mismo día ya visitaron otro colegio. Ahí se pierden más matrículas que en cualquier campaña.</p>""",
 'secciones': [
  {'h2': 'Admisiones: responder, agendar, seguir', 'html': """    <ul>
      <li><strong>Responder lo repetitivo al instante</strong>: pensión por grado, cupos disponibles, jornada, ruta, requisitos de matrícula. Un asistente de WhatsApp conectado a la información del colegio lo hace las 24 horas.</li>
      <li><strong>Agendar la visita</strong> sobre la agenda de admisiones, con recordatorio el día anterior.</li>
      <li><strong>Seguir a cada familia</strong>: quién preguntó, quién visitó, quién entregó documentos, quién falta. Sin eso, las familias que "iban a llamar" se pierden.</li>
    </ul>
    <p>Todo eso vive en un sistema, no en el celular de la secretaria. Cómo se conecta el WhatsApp está en la <a href="/blog/como-automatizar-whatsapp-business-colombia/">guía de automatización</a>.</p>"""},
  {'h2': 'Los padres actuales: la mejor campaña', 'html': """    <p>La matrícula nueva más barata es la del hermano, o la de la familia que un padre actual recomienda. Eso depende de cómo se sienten atendidos: circulares que llegan por WhatsApp y no se pierden, recordatorios de pensión sin tono de cobro, respuestas a "¿mañana hay clase?" sin llamar a la secretaría. Un colegio que comunica bien tiene padres que recomiendan.</p>"""},
  {'h2': 'Lo que hay que cuidar con los datos', 'html': """    <p>Los datos de menores son datos sensibles bajo la Ley 1581 de 2012. Cualquier sistema que maneje información de estudiantes y padres necesita autorización de tratamiento, y el colegio debe saber dónde se guardan las conversaciones y quién las ve. Es lo primero que revisamos antes de conectar cualquier cosa.</p>"""},
  {'h2': 'Cuándo pautar', 'html': """    <p>Cuando admisiones responde el mismo día y las visitas se agendan solas. Entonces una campaña en la zona del colegio, en la temporada de admisiones, trae familias que sí se atienden. Pautar antes es traer gente a una fila.</p>"""},
 ],
 'cta': {'h3': '¿Admisiones contesta el WhatsApp cuando puede?', 'p': 'Revisamos el flujo de admisiones y la comunicación con padres, y definimos qué automatizar.', 'boton': 'Conversar sobre mi colegio', 'wa': 'Hola, soy de un colegio y quiero mejorar el proceso de admisiones por WhatsApp'},
 'relacionados': ['como-automatizar-whatsapp-business-colombia', 'chatbot-ia-clinicas-colombia', 'seo-local-colombia-guia'],
 'faq': [
  ('¿Un asistente puede responder pensiones y cupos?', 'Sí, si tiene la información del colegio cargada. Responde lo repetitivo y agenda la visita; lo que requiere criterio va a admisiones.'),
  ('¿Qué pasa con los datos de los estudiantes?', 'Son datos sensibles. Se necesita autorización de tratamiento y claridad sobre dónde se guardan las conversaciones. Es lo primero que revisamos.'),
  ('¿Sirve para comunicarse con los padres actuales?', 'Sí: circulares, recordatorios y respuestas frecuentes por WhatsApp, con consentimiento y en horario razonable.'),
 ],
},
{
 'slug': 'pagina-web-clinica-colombia', 'publicado': '2026-05-18', 'categoria': 'Negocio · Salud', 'emoji': '🏥',
 'titulo': 'Página web para clínicas: qué debe tener para traer pacientes',
 'h1': 'Página web para clínicas y consultorios en Colombia: qué debe tener para que un paciente agende',
 'descripcion': 'Una página de clínica no es un folleto: es donde el paciente decide si escribe. Especialidades, profesionales, convenios, cita por WhatsApp, y lo que exige la ley con datos de salud.',
 'consulta': 'pagina web para clinica',
 'intro': """    <p>Un paciente busca "dermatólogo en Ibagué", abre tres páginas, y escribe a la primera que le dice claramente qué hace, quién atiende, si recibe su EPS y cómo pedir cita. La página de una clínica no es para verse bien: es para que esa decisión sea fácil.</p>""",
 'secciones': [
  {'h2': 'Lo que un paciente busca en diez segundos', 'html': """    <ul>
      <li><strong>Especialidades y servicios</strong>, cada uno con su página: es lo que Google indexa y lo que el paciente busca.</li>
      <li><strong>Profesionales</strong> con nombre, especialidad y registro. La confianza en salud es nominal.</li>
      <li><strong>Convenios y formas de pago</strong>: EPS, prepagadas, particular.</li>
      <li><strong>Ubicación, horario y cómo llegar</strong>, con mapa.</li>
      <li><strong>Un botón de WhatsApp que lleve a agendar</strong>, no a un "en un momento te atendemos".</li>
    </ul>"""},
  {'h2': 'La cita: de la página al calendario', 'html': """    <p>El botón de WhatsApp debe caer en un asistente conectado a la agenda de cada profesional: ofrece horarios, toma datos, confirma y recuerda. Sin eso, la página produce mensajes que alguien tiene que contestar a mano, y la ventaja se pierde. Lo explicamos en <a href="/blog/chatbot-ia-clinicas-colombia/">chatbots para clínicas</a>, incluido el límite: el asistente agenda; no responde nada clínico.</p>"""},
  {'h2': 'Lo que exige la ley', 'html': """    <ul>
      <li><strong>Política de tratamiento de datos</strong> publicada (Ley 1581 de 2012), con énfasis en datos de salud, que son sensibles.</li>
      <li><strong>Autorización</strong> del paciente antes de recibir cualquier dato por formulario o WhatsApp.</li>
      <li>Nada de "antes y después" sin consentimiento expreso.</li>
    </ul>"""},
  {'h2': 'Lo técnico que sí importa', 'html': """    <p>Que cargue rápido en un celular con señal regular, que cada especialidad tenga su URL propia con título claro, y que Google la encuentre: ficha de Google Business Profile enlazada, datos estructurados de la clínica (dirección, horario, teléfono) y una página por servicio. Sin eso, la página existe pero nadie llega. El método completo está en nuestra <a href="/blog/seo-local-colombia-guia/">guía de SEO local</a>.</p>"""},
 ],
 'cta': {'h3': '¿Tu página trae pacientes o solo existe?', 'p': 'Revisamos qué le falta para que un paciente agende, y cómo conectarla a tu agenda.', 'boton': 'Revisar la página de mi clínica', 'wa': 'Hola, tengo una clínica y quiero que la página traiga pacientes'},
 'relacionados': ['chatbot-ia-clinicas-colombia', 'seo-local-colombia-guia', 'como-automatizar-whatsapp-business-colombia'],
 'faq': [
  ('¿La página debe tener agendamiento en línea?', 'Lo mejor en Colombia es un botón de WhatsApp que caiga en un asistente conectado a la agenda. La gente prefiere escribir a llenar un formulario.'),
  ('¿Qué exige la ley para una página de clínica?', 'Política de tratamiento de datos publicada, autorización antes de recibir datos, y cuidado especial con datos de salud, que son sensibles.'),
  ('¿Una página por especialidad, o una sola?', 'Una por especialidad. Es lo que el paciente busca y lo que Google indexa.'),
 ],
},
{
 'slug': 'pagina-web-peluqueria-colombia', 'publicado': '2026-06-08', 'categoria': 'Negocio · Belleza', 'emoji': '💇',
 'titulo': 'Página web para peluquería: citas por WhatsApp que no se pierden',
 'h1': 'Página web para peluquería o barbería en Colombia: citas por WhatsApp que no se pierden',
 'descripcion': 'Una peluquería vive de la agenda. Qué debe tener su página, cómo las citas entran a la agenda de cada estilista sin llamadas, y cómo bajar las citas a las que nadie llega.',
 'consulta': 'pagina web para peluqueria',
 'intro': """    <p>Una peluquería o barbería no vende productos: vende horas de cada estilista. La página sirve si convierte a quien la ve en una cita agendada, y si esa cita entra a la agenda real sin que nadie conteste el teléfono a mitad de un corte.</p>""",
 'secciones': [
  {'h2': 'Lo que debe tener la página', 'html': """    <ul>
      <li>Servicios con precio y duración. La duración es lo que permite agendar sin cruces.</li>
      <li>Estilistas, con foto y con lo que hace cada uno. La gente elige persona, no salón.</li>
      <li>Horario, ubicación, mapa, y fotos reales del trabajo.</li>
      <li>Un botón de WhatsApp que agende, no que abra una conversación en blanco.</li>
    </ul>"""},
  {'h2': 'La cita entra a la agenda sin llamadas', 'html': """    <p>El cliente escribe "quiero corte y barba el sábado con Andrés". El asistente mira la agenda de Andrés, ofrece los horarios libres del sábado que caben en la duración del servicio, aparta el que elija y confirma. El estilista sigue trabajando. El día anterior, el recordatorio. Es el mismo mecanismo de agenda que usamos en <a href="/sistemas/para-canchas-sinteticas/">CanchaLibre</a>, donde también se venden horas.</p>"""},
  {'h2': 'Las citas a las que nadie llega', 'html': """    <p>Es la pérdida más grande del sector: una hora reservada y vacía. Dos cosas la reducen: el recordatorio con reconfirmación el día anterior (si cancela, el hueco se ofrece a otro), y para servicios largos, un abono pequeño. El comprobante entra "por verificar" y la cita se confirma cuando alguien lo aprueba.</p>"""},
  {'h2': 'Clientes que vuelven', 'html': """    <p>Cada cliente en el sistema con lo que se hizo y cuándo. "Hace cinco semanas te hiciste el corte, ¿agendamos?" por WhatsApp, con su consentimiento, trae más citas que cualquier promoción a desconocidos. Y el estilista sabe qué le hizo la última vez sin preguntar.</p>"""},
 ],
 'cta': {'h3': '¿Tu agenda vive en un cuaderno y en el WhatsApp?', 'p': 'Te mostramos citas por WhatsApp que caen en la agenda de cada estilista, con recordatorios.', 'boton': 'Ver cómo funciona para mi salón', 'wa': 'Hola, tengo una peluquería y quiero agendar citas por WhatsApp automáticamente'},
 'relacionados': ['como-automatizar-whatsapp-business-colombia', 'software-para-canchas-sinteticas-como-elegir', 'seo-local-colombia-guia'],
 'faq': [
  ('¿El cliente puede elegir estilista?', 'Sí. El asistente agenda sobre la agenda de cada estilista, con la duración del servicio para que no haya cruces.'),
  ('¿Cómo bajan las citas a las que no llegan?', 'Con recordatorio y reconfirmación el día anterior, y con un abono pequeño para servicios largos.'),
  ('¿Necesito una app?', 'No. WhatsApp con un asistente conectado a la agenda hace lo mismo sin que el cliente instale nada.'),
 ],
},
{
 'slug': 'cuanto-cuesta-pagina-web-restaurante-colombia', 'publicado': '2026-05-12', 'categoria': 'Negocio · Costos', 'emoji': '🧮',
 'titulo': '¿Cuánto cuesta una página web para restaurante? Lo que incluye',
 'h1': '¿Cuánto cuesta una página web para un restaurante en Colombia? Lo que incluye cada rango y qué no hace falta',
 'descripcion': 'Desde una página de una sola pantalla con menú y WhatsApp hasta una con reservas y pedidos conectados. Qué incluye cada nivel, qué cuesta mantenerla, y qué no vale la pena pagar.',
 'consulta': 'cuanto cuesta una pagina web para restaurante',
 'intro': """    <p>La respuesta depende de una sola pregunta: ¿la página tiene que <em>hacer</em> algo (reservar, tomar pedidos) o solo <em>mostrar</em> (menú, horario, ubicación)? Lo segundo es barato y suficiente para muchos restaurantes; lo primero es un sistema con una página encima. Aquí están los tres niveles, sin cifras de portada que después no se cumplen.</p>""",
 'secciones': [
  {'h2': 'Nivel 1: mostrar', 'html': """    <p>Una página de una o pocas pantallas: menú con precios, horario, mapa, fotos propias, botón de WhatsApp, y la ficha de Google enlazada. Debe cargar rápido en celular y tener cada dato correcto. Es lo que necesita la mayoría de restaurantes de barrio, y el costo es de días de trabajo, no de meses. Lo que cuesta después es mantenerla: dominio, hosting y cambiar el menú cuando cambia.</p>"""},
  {'h2': 'Nivel 2: reservar', 'html': """    <p>Lo anterior, más un asistente de WhatsApp conectado a la agenda de mesas: responde disponibilidad, aparta, pide abono en fechas especiales, recuerda. Aquí la página es la puerta y el sistema es lo que trabaja. El costo es el del sistema de reservas; la página en sí no sube mucho.</p>"""},
  {'h2': 'Nivel 3: pedidos', 'html': """    <p>Domicilios y para llevar con menú en vivo, pedido armado, medio de pago y entrada a la caja. Exige inventario o al menos disponibilidad por plato, y caja conectada. Es un sistema de operación; la página es una de sus pantallas. Se cotiza como <a href="/sistemas/">sistema a la medida</a>, por módulos.</p>"""},
  {'h2': 'Lo que no vale la pena pagar', 'html': """    <ul>
      <li>Animaciones y "diseño premium" que hacen lenta la página en un celular con señal regular.</li>
      <li>Un formulario de reservas que manda un correo que nadie lee. Las reservas van a WhatsApp o a la agenda.</li>
      <li>Fotos de banco de imágenes. Un plato real fotografiado con el celular convierte más.</li>
      <li>"Posicionamiento garantizado". Nadie garantiza posiciones en Google; lo que sí se puede hacer está en la <a href="/blog/seo-local-colombia-guia/">guía de SEO local</a>.</li>
    </ul>"""},
  {'h2': 'Cómo pedir una cotización que se pueda comparar', 'html': """    <p>Pida que separen: la página (diseño, textos, fotos), el sistema si lo hay (reservas, pedidos), y el mantenimiento mensual. Y pregunte qué pasa si quiere cambiar el menú el próximo mes: si la respuesta es "nos escribe y lo cambiamos", el costo real está escondido ahí.</p>"""},
 ],
 'cta': {'h3': '¿Quieres saber qué nivel necesita tu restaurante?', 'p': 'En una conversación corta te decimos si con mostrar alcanza o si necesitas reservas o pedidos.', 'boton': 'Pedir una cotización clara', 'wa': 'Hola, tengo un restaurante y quiero una cotización de página web'},
 'relacionados': ['marketing-digital-restaurantes-colombia', 'como-automatizar-whatsapp-business-colombia', 'seo-local-colombia-guia'],
 'faq': [
  ('¿Necesito reservas en línea?', 'Si pierdes reservas en el WhatsApp o tienes mesas vacías de gente que no llegó, sí. Si no, con mostrar alcanza.'),
  ('¿Cuánto cuesta mantener la página?', 'Dominio y hosting al año, y el cambio de contenido. Pregunta siempre cómo se cambia el menú: ahí está el costo escondido.'),
  ('¿La página posiciona sola en Google?', 'No. Necesita ficha de Google, datos correctos y una página por servicio. Nadie puede garantizar posiciones.'),
 ],
},
{
 'slug': 'google-ads-colombia-guia-pymes', 'publicado': '2026-06-12', 'categoria': 'Negocio · Pauta', 'emoji': '📣',
 'titulo': 'Google Ads para pymes en Colombia: cuándo sí y cuándo es botar plata',
 'h1': 'Google Ads para pymes en Colombia: cuándo sí, cuándo es botar plata, y qué tener listo antes',
 'descripcion': 'La pauta trae clics; convertirlos depende de lo que hay del otro lado. Qué debe funcionar antes de pautar, cómo medir de verdad, y cuándo el SEO local rinde más que Google Ads.',
 'consulta': 'google ads para pymes',
 'intro': """    <p>Google Ads funciona: pone a la empresa arriba cuando alguien busca lo que vende. Lo que casi nunca se dice es que el clic vale lo mismo si del otro lado hay una página que carga en dos segundos y un WhatsApp que contesta, o una página lenta y un WhatsApp que responde mañana. La pauta amplifica lo que ya existe. Si lo que existe no convierte, la pauta convierte plata en clics.</p>""",
 'secciones': [
  {'h2': 'Lo que tiene que estar listo antes del primer peso', 'html': """    <ul>
      <li><strong>Una página que cargue rápido en celular</strong> y diga en la primera pantalla qué vende, dónde, y cómo escribir.</li>
      <li><strong>Un WhatsApp que responda en minutos</strong>, idealmente con un asistente para lo repetitivo (ver la <a href="/blog/como-automatizar-whatsapp-business-colombia/">guía</a>).</li>
      <li><strong>Una forma de saber qué pasó con cada clic</strong>: cuántos escribieron, cuántos cotizaron, cuántos compraron. Sin eso no se sabe si la pauta rinde.</li>
      <li><strong>Ficha de Google Business Profile completa</strong>, porque muchas búsquedas locales se resuelven en el mapa, gratis.</li>
    </ul>"""},
  {'h2': 'Cuándo Google Ads sí', 'html': """    <ul>
      <li>Cuando la gente busca activamente lo que vendes ("software para ferretería", "cancha sintética en Soacha") y todavía no apareces orgánicamente.</li>
      <li>Para probar rápido si una búsqueda convierte, antes de invertir meses en posicionarla.</li>
      <li>Para una temporada concreta: admisiones de un colegio, diciembre en un restaurante.</li>
    </ul>"""},
  {'h2': 'Cuándo es botar plata', 'html': """    <ul>
      <li>Cuando el WhatsApp no contesta el mismo día.</li>
      <li>Cuando no se mide más allá de "clics" e "impresiones".</li>
      <li>Cuando la búsqueda es local y la ficha de Google ya podría traer esa gente sin pagar.</li>
      <li>Cuando el negocio no tiene capacidad para atender más: pautar para no poder atender es pagar por reseñas malas.</li>
    </ul>"""},
  {'h2': 'Google Ads o SEO', 'html': """    <p>No son alternativas: la pauta trae resultados desde el primer día y se apaga cuando se deja de pagar; el posicionamiento tarda meses y se queda. Lo sensato es probar con pauta qué búsquedas convierten y posicionar orgánicamente esas. Cómo se hace lo segundo está en la <a href="/blog/seo-local-colombia-guia/">guía de SEO local</a>.</p>"""},
 ],
 'cta': {'h3': '¿Vas a pautar? Revisemos primero qué hay del otro lado del clic.', 'p': 'Página, WhatsApp y medición. Si eso no está, te lo decimos antes de que gastes.', 'boton': 'Revisar antes de pautar', 'wa': 'Hola, quiero pautar en Google y primero revisar mi página y WhatsApp'},
 'relacionados': ['seo-local-colombia-guia', 'como-automatizar-whatsapp-business-colombia', 'marketing-digital-restaurantes-colombia'],
 'faq': [
  ('¿Cuánto hay que invertir en Google Ads?', 'Depende del costo por clic de tu sector y ciudad, que Google muestra al crear la campaña. Lo importante no es el monto sino saber cuántos de esos clics terminan en venta.'),
  ('¿Google Ads o ficha de Google?', 'La ficha primero: es gratis y resuelve muchas búsquedas locales. La pauta después, para lo que la ficha no alcanza.'),
  ('¿La pauta mejora el posicionamiento orgánico?', 'No directamente. Sirve para saber qué búsquedas convierten y posicionar esas.'),
 ],
},
{
 'slug': 'seo-local-colombia-guia', 'publicado': '2026-05-30', 'categoria': 'Negocio · Posicionamiento', 'emoji': '📍',
 'titulo': 'SEO local en Colombia: aparecer en Google Maps y en las búsquedas',
 'h1': 'SEO local en Colombia: cómo aparecer en Google Maps y en las búsquedas de tu ciudad, sin pagar por clic',
 'descripcion': 'Ficha de Google completa, una página por servicio y ciudad, datos estructurados que coincidan con lo visible, y reseñas respondidas. Lo que hicimos con nuestros sistemas, paso a paso.',
 'consulta': 'seo local colombia',
 'intro': """    <p>"Cancha sintética cerca", "ferretería en Soacha", "dermatólogo Ibagué": la mayoría de búsquedas de un negocio local se resuelven en el mapa y en los tres primeros resultados. Aparecer ahí no cuesta por clic; cuesta hacer bien unas pocas cosas y no hacer otras. Esta guía es lo que aplicamos en nuestros propios sitios y en los portales de los negocios que usan nuestros sistemas.</p>""",
 'secciones': [
  {'h2': 'La ficha de Google Business Profile', 'html': """    <p>Es lo primero y lo más importante. Categoría correcta, nombre exacto (sin palabras clave metidas a la fuerza), dirección y horario reales, teléfono, fotos propias, y <strong>responder todas las reseñas</strong>, buenas y malas. Google premia las fichas activas. Una ficha desactualizada —horario viejo, teléfono que no contesta— resta más que no tener ficha.</p>"""},
  {'h2': 'Una página por lo que la gente busca', 'html': """    <p>La búsqueda del cliente es "[cosa] en [ciudad]". Una página por servicio, y donde haya varias sedes o ciudades, una por ciudad, cada una con contenido propio: dirección, horario, precios, fotos de <em>ese</em> lugar. Lo que no sirve —y Google castiga desde 2024— es generar cien páginas iguales cambiando solo el nombre de la ciudad. Lo comprobamos en nuestro propio sitio y las retiramos.</p>"""},
  {'h2': 'Lo que Google lee', 'html': """    <ul>
      <li><strong>Título</strong> con la palabra clave primero, menos de 60 caracteres. <strong>Un H1</strong> que diga de qué trata, no un eslogan.</li>
      <li><strong>Datos estructurados</strong> (LocalBusiness o el subtipo del negocio) con dirección, coordenadas, horario en formato exacto y precios, <em>que coincidan con lo visible</em>.</li>
      <li><strong>Velocidad</strong> en celular: imágenes por tamaño, sin cargar código que la página no usa.</li>
      <li>Que el contenido esté en el HTML que manda el servidor, no pintado después por JavaScript. Es el error más común en sitios modernos y el más invisible.</li>
    </ul>"""},
  {'h2': 'Enlaces que valen', 'html': """    <p>Los de clientes, proveedores y aliados reales, con el nombre del negocio en el texto. Los de directorios del sector que ya posicionan. Los de las redes propias, enlazando al sitio. No los comprados: Google los detecta y castiga.</p>
    <p>Un mecanismo que nos funciona: los negocios que usan <a href="/sistemas/para-canchas-sinteticas/">CanchaLibre</a> tienen un botón para poner su portal en la bio de Instagram y en su página. Cada uno es un enlace real hacia el sitio, con el nombre de la cancha.</p>"""},
  {'h2': 'Medir', 'html': """    <p>Google Search Console desde el primer día: propiedad del dominio, sitemap enviado. En dos o tres semanas dice para qué búsquedas aparece el sitio y en qué posición. Lo que está en posición 5 a 20 es lo que hay que reforzar. Todo lo demás es intuición. El método completo, incluidos los errores que cometimos, está en nuestra auditoría interna, y lo aplicamos a cada cliente que lo pide.</p>"""},
 ],
 'cta': {'h3': '¿Tu negocio aparece cuando lo buscan en tu ciudad?', 'p': 'Revisamos ficha, páginas, datos estructurados y velocidad, y te decimos qué corregir primero.', 'boton': 'Pedir una revisión de posicionamiento', 'wa': 'Hola, quiero saber por qué mi negocio no aparece en Google en mi ciudad'},
 'relacionados': ['google-ads-colombia-guia-pymes', 'pagina-web-clinica-colombia', 'marketing-digital-restaurantes-colombia'],
 'faq': [
  ('¿Qué es lo primero para aparecer en Google Maps?', 'La ficha de Google Business Profile completa y activa: categoría, datos reales, fotos propias y reseñas respondidas.'),
  ('¿Sirve hacer una página por cada ciudad?', 'Solo si cada una tiene contenido propio (sede, dirección, precios). Páginas iguales con el nombre cambiado se castigan desde 2024.'),
  ('¿Cuánto tarda el SEO local?', 'La ficha da resultados en semanas. Las páginas, en dos o tres meses. Search Console muestra el avance con datos reales.'),
 ],
 'fuentes': [('Google — Datos estructurados de negocio local', 'https://developers.google.com/search/docs/appearance/structured-data/local-business')],
},
]
