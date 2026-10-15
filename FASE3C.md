# Fase 3C · Portada corporativa completa

Rama independiente `codex/fase3c-portada-20261015`; base `e1642951549e350d16f0c138f5ec04b1c06bae69`.

Implementación autorizada por el documento «AI COMPANY — FASE 3C: COMPLETAR TODA LA PORTADA CORPORATIVA», recibido el 15 de octubre de 2026. Esta fase incluye una demo pública independiente sin cuenta, con noindex y sin envíos. No autoriza publicar en aicompanyco.com.

Se conservan byte por byte el encabezado y el bloque superior aprobado: hero amarillo, servicios y franja de empresas. También permanecen el footer, los datos institucionales y las páginas internas. Continúa la arquitectura de HTML estático generado con Node.js.

`scripts/templates/home-corporate.js` completa problemas, sectores, casos, metodología, nosotros, blog, FAQ y contacto. `assets/home-corporate.css` mantiene la paleta, tipografía y proporciones del sistema aprobado con estilos aislados de ese bloque superior. La home integra estos componentes reutilizando botones, FAQ, formulario y logotipos existentes.

Los cuatro proyectos conservan `/casos/#maderas-montoya`, `#ferre-laser`, `#asoerc` y `#laser-ejecutivo`. No existían páginas individuales publicadas y no se crean rutas nuevas: las capturas y el detalle permanecen en los destinos actuales. La portada presenta logotipos y contexto sin las capturas de los cuatro casos. Los borradores futuros siguen sin publicarse.

La foto de madera procede del archivo existente de Maderas Montoya. Los esquemas de corte y reciclaje se identifican como esquemas del proceso, sin simular capturas o fotografías de clientes. La presentación institucional es tipográfica: no se inventan personas, fotos, cifras, testimonios o resultados.

## Comprobación

`npm test` y `npm run build`. La excepción editorial de inicio en `home-seo-approved.json` se actualiza tras comparar la base. H1, title, descripción, canonical, robots y schema se conservan, al igual que 225 rutas, 56 indexables, 169 noindex y 32 artículos. Sitemap y robots.txt siguen idénticos a la base.

Las pruebas de navegador se entregan en el workspace de revisión, separadas del paquete web. Incluyen 1440, 390, 360, 768 y 1280 px; fuentes, imágenes, enlaces y anclas; menú, Escape, ciclo de foco, salto al contenido; metodología horizontal/vertical; etiquetas del formulario y estados local/demo, sin clic de envío. Las capturas provienen del navegador real y no de IA.

El formulario existente prepara WhatsApp en la versión de desarrollo. En la demo se intercepta antes del envío y se aclara expresamente que no recibe solicitudes. No se añade backend, analítica, base de datos ni integración externa.

## Publicación y pendientes

La demo de Fase 3C se crea en un proyecto independiente para conservar Fase 2 y Fase 3. Su fuente incluye una copia del paquete verificado y protecciones exclusivas de revisión. La versión corporativa definitiva sigue bloqueada mientras falte el recurso maestro Concepto C y su integración final.

Pendientes: aprobación visual completa, recurso maestro y favicon de AI Company, validación legal/NIT y condiciones comerciales históricas de otras páginas. La captación real y un despliegue empresarial requieren autorización separada. No se inicia Fase 4.
