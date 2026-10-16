# AI Company · Fase 4 · Interiores

Autorización: páginas interiores y casos, rama independiente; sin cambios de producción. Base 452d595.

## Alcance y rutas

- `/casos/`: cuatro casos completos en sus anclas existentes. Maderas Montoya, Ferre Láser, ASOERC y **cliente JD Metales / proyecto Láser Ejecutivo**. Un logotipo oficial y una captura real de demostración existente por caso, ampliable en otra pestaña, contexto, problema, solución, uso funcional y CTA. Productos propios separados.
- `/servicios/apps-empresariales/`: capacidades de desarrollo a medida en la URL de aplicaciones existente; H1 y metadatos conservados.
- `/automatizacion-de-procesos-empresariales/`: automatización, reglas, excepciones y proceso.
- `/soluciones/`: capacidades e integraciones en `#integraciones`, conservando enlaces sectoriales.
- `/nosotros/`: enfoque de ingeniería, fundador y proceso, sin personas ficticias.
- `/contacto/`: canales verificados, formulario actual y explicación correcta de WhatsApp.

No existen páginas individuales de clientes ni rutas dedicadas de software/integraciones en el inventario actual. No se añaden rutas: los casos conservan `/casos/#...`. La apertura de nuevas páginas y sus nuevos metadatos requiere un alcance SEO posterior.

## Implementación

`scripts/templates/interiors.js` compone los seis cuerpos; `assets/interiors.css` aplica una capa visual aislada. `scripts/build-site.js` integra esta capa sin cambiar las demás páginas. El encabezado, pie y JavaScript accesible siguen compartidos. Portada sin cambios.

`scripts/content/interiors-seo-approved.json` permite únicamente cambios de texto principal y enlaces internos de esas seis páginas. No permite modificar títulos, descriptions, H1, canonicals ni robots. `scripts/seo-preservation.js` mantiene el contrato de las otras rutas. El sitemap y sus fechas se conservan deliberadamente según la restricción de esta fase; una revisión de fechas puede hacerse en un despliegue autorizado.

## Validación

`npm test` y `npm run build`. Build secuencial: generar, validar, empaquetar y validar salida; bloqueo de release vigente. Las pruebas de interiores verifican alcance de seis rutas, cuatro casos y rechazo de canonical modificado.

Revisión de navegador en 1440, 390, 360, 768 y 1280 px; formularios sin envío real durante pruebas. Demo separada con meta robots noindex, sin captación y sin modificación de hosting de la empresa.

## Recursos y pendientes

Se reutilizan exclusivamente los cuatro logotipos confirmados y las cuatro capturas ya publicadas con rótulo de datos de demostración del archivo del proyecto. No se incorporan otras imágenes del archivo ni información de producción. Las capturas adicionales y sus permisos quedan pendientes; no se fabrica una galería con imágenes repetidas o ajenas.

Pendientes: maestro Concepto C/favicons finales, validación legal/NIT, captación real y aprobación visual. Los precios históricos en páginas ajenas al alcance no se modifican ni se presentan como nuevas ofertas. No hay nuevas promesas de diagnóstico gratuito.

No se modifica aicompanyco.com, no se activa analítica, no se envían solicitudes y no se inicia la siguiente fase.
