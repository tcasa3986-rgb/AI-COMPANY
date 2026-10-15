# Fase 3 · Portada de AI Company

15 de octubre de 2026. Rama `codex/fase3-home-20261015`; base Fase 2 `66cfc105fbe936da8f9346f5a428c1d85c9aaf58`.

La home prioriza ingeniería y desarrollo de software a medida para empresas en Colombia. Automatización e integraciones son capacidades complementarias. La aprobación del usuario permite modificar la intención comercial, H1, metadatos y contenido de inicio, conservando URL, canonical y robots.

## Implementación

- `scripts/templates/home.js`: hero, servicios jerarquizados, problemas operativos, sectores, casos existentes, demostración real, metodología, fundador, guías, FAQ y CTA final.
- `assets/home.css`: diseño exclusivo de inicio y ajustes de navegación responsiva de esa vista. Paleta oficial, Manrope e Inter locales.
- `scripts/build-site.js`: integra la plantilla, CSS y schema Service de inicio; normaliza Organization/WebSite/OG de inicio a AI Company.
- `scripts/templates/components.js`: navegación compartida prioriza software a medida con un ancla de la home; atribución comercial y nombre del fundador normalizados. Los textos legales originales no se modifican.
- `scripts/seo-preservation.js`: conserva el contrato de Fase 2 para las 225 rutas. Solo permite cinco campos editoriales de inicio desde `home-seo-approved.json`; canonical, robots y noindex nunca se sustituyen.
- `scripts/tests/home-seo.test.js`: inventario/noindex, rechazo de canonical alterado y contenido de otras páginas, ausencia de ofertas sin autorización en la home.

Los 225 HTML se regeneran por la navegación y el pie compartidos. Solo cambia el contenido principal de inicio. El sitemap conserva las rutas; únicamente cambia lastmod de inicio a 2026-10-15 y la fecha agregada del índice.

## Verificación y revisión

`npm test` · `npm run build` · `npm run preview`.

Home local: http://127.0.0.1:4175/ (requiere servidor iniciado).

Se verificaron 360, 390, 768, 1280 y 1440 px, fuentes locales, imágenes, H1 único, enlaces, FAQ, menú, Escape, ciclo de foco y salto al contenido. El formulario existente se probó con datos sintéticos hasta preparar el mensaje; no se abrió WhatsApp ni se envió información. Las capturas y el informe se entregan fuera del paquete web, en el workspace de revisión.

No se activa analítica, backend, base de datos ni proveedor externo. No hay publicación ni push. La salida `review` continúa con `releaseReady: false`; `build:release` permanece bloqueado.

## Pendientes

Recurso maestro Concepto C y favicon; validación de datos legales; condiciones comerciales y nombres históricos de otras páginas (sin reescritura en esta fase). La home no promete gratuidad ni un precio mensual. Las capturas existentes son interfaces reales con datos de demostración, sin cifras de resultados inventadas. No se añadieron nuevas autorizaciones de publicación de casos ni páginas individuales.

La comprobación de accesibilidad es acotada; no equivale a certificación WCAG, revisión completa con lector de pantalla o medición de Core Web Vitals en producción. Fase 4 no iniciada.
