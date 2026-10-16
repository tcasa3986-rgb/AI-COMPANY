# Google Analytics · evidencia parcial, sin activación

El responsable recuerda una configuración de GA. Esa declaración no confirma una propiedad, un ID ni una instalación actual. Se revisó el código como texto y se obtuvieron, sin JavaScript, la home pública, /contacto/ y /assets/site.js: las tres respuestas fueron HTTP 200, no presentaron ID G-/GTM-/UA- ni Set-Cookie. En las dos páginas el único script referenciado fue /assets/site.js. Sus hashes y URLs están en analytics-evidencia.json. Esta muestra no cubre todas las páginas ni descarta inyección condicional.

El repositorio contiene scripts/instalar-medicion.js, una utilidad opcional que recibe --ga y genera gtag.js/config. Los IDs G-XXXX en sus ejemplos son marcadores, no una propiedad identificada. No está en los comandos activos de package.json ni se ejecutó. El generador de las 225 páginas no carga GA4. No se deben tomar comentarios históricos de la utilidad como evidencia actual.

Existe el evento opcional whatsapp_contact_click en assets/site.js, condicionado a que window.gtag exista. No configura GA4 y no demuestra que un evento llegue a Analytics. Sus parámetros son source:contacto, sin los datos del formulario. No se añadieron eventos ni herramientas nuevas.

No hay evidencia confirmada de Meta Pixel, Ads o GTM en el contenido examinado. No se accedió a la propiedad GA4, a informes, DebugView ni a Netlify snippet injection. Las cookies creadas por JavaScript y las peticiones reales de medición NO se verificaron: requieren un navegador aislado. No se afirma que GA4 esté inexistente en toda producción.

Si se confirma GA4, documentar ID, método de instalación, eventos, destinos, finalidades, conservación, consentimiento y posibles vinculaciones publicitarias antes de aprobar la política. La documentación de Google identifica _ga y _ga_<container-id> con duración predeterminada de dos años; no se observaron esas cookies aquí y no se deben describir como cookies efectivas de AI Company por suposición. No se confirmó mecanismo de elección de analítica. La casilla de consulta no autoriza seguimiento ni publicidad.

Fuente: [Google: uso de cookies GA4](https://support.google.com/analytics/answer/11397207). Ninguna etiqueta se instaló o activó.
