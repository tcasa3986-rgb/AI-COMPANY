# Netlify · consulta pendiente y plan de reversión

Estado: el responsable confirmó Netlify; no hay conector Netlify disponible en esta sesión. Se buscaron herramientas y plugins por proveedor. No se usaron credenciales locales, contraseñas o tokens ni se ejecutó una API de escritura. No se dispone de site_id ni published_deploy_id. No se obtuvo un respaldo real de producción. El ZIP de esta entrega NO es un respaldo de aicompanyco.com.

## Consulta necesaria, sin cambios

En el sitio de Netlify que tenga el dominio aicompanyco.com: registrar site_id, nombre, dominio y cuenta/equipo autorizado; desde Deploys registrar el identificador exacto Published, permalink, fecha, estado y SHA si existe. Registrar repositorio/rama/contexto, base directory, build command y publish directory; si el deploy fue manual, indicarlo. No asumir que el vercel.json local representa la configuración efectiva de Netlify.

Inventariar funciones/Edge Functions, Netlify Forms, extensiones, redirecciones/headers, snippet injection, plugins de build, analítica, auto publishing y retención de deploys. Las variables se documentan por nombre/ámbito, sin valores. No abrir ni exportar mensajes de formularios ni datos privados. No modificar ninguna configuración.

## Copia verificable

En el detalle del deploy exitoso actualmente Published, usar Download y luego Download ready. Guardar el ZIP fuera del directorio público, calcular SHA-256 y registrar tamaño, fecha y deploy_id. Revisar sus rutas y listado sin ejecutar código. Conservar el permalink y comprobar que el deploy siga disponible. Un archivo descargado contiene los archivos desplegados; no acredita por sí solo respaldo de ajustes del panel, secretos, datos de servicios, formularios o integraciones externas. Documentar dependencias y configuraciones por separado y revisar el alcance real.

No utilizar Netlify Drop, Retry, Publish Deploy, Lock, API restore, CLI deploy ni cambios de variables durante esta preparación. No conectar el repositorio ni empujar a una rama conectada a producción.

## Reversión futura — requiere autorización de producción

Antes de publicar: identificar el deploy de reversión, verificar su disponibilidad, ZIP y dependencias; confirmar qué ocurre con auto publishing. Probar la restauración en un entorno independiente autorizado. No prometer tiempos de recuperación sin esa prueba.

Ante URLs perdidas, indexación global noindex accidental, canonical incorrecto, fallo de contacto o artefacto equivocado: con autorización específica, seleccionar el deploy exitoso previamente registrado y usar Publish Deploy. Esa operación cambia producción y no se ejecuta ahora. No requiere reconstruir el software anterior, pero no restaura datos ni servicios externos. Confirmar que nuevos deploys automáticos no lo sobrescriban; cualquier bloqueo/cambio de auto publishing también requiere autorización.

Después de la reversión: verificar dominio, certificado, rutas críticas, robots, sitemap, canonicals, 225 URLs/32 artículos según el inventario real previo, identidad y recorrido de contacto sin enviar mensajes. Conservar el registro del incidente. No cambiar DNS ni la integración WhatsApp API anterior.

Fuente: [Netlify: Manage deploys](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/) — descarga de archivos, deploys atómicos y Publish Deploy. El procedimiento queda incompleto hasta insertar identificadores reales, mecanismo efectivo y soporte de la copia.
