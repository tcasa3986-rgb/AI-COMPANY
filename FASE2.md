# AI Company — Fase 2, revisión local

Rama: `codex/fase2-identidad-20261014`. Base: `13b4418782257a54087656895d039c59eb406115`.

La paleta es violeta #7024C4, profundo #4C168E, grafito #191923, blanco, gris hielo #F7F8FA y lavanda #F0E5FA. Manrope e Inter se sirven localmente en WOFF2 con licencias adjuntas.

El archivo oficial Concepto C no está disponible. Las vistas usan solo marca textual; no hay símbolo nuevo ni reinterpretación. Los recursos históricos permanecen en el historial/checkout, pero no se enlazan en el HTML nuevo ni se copian al paquete de revisión.

## Revisar en local

1. `npm test`: pruebas editoriales y regresiones del pipeline.
2. `npm run build`: genera HTML, valida preservación SEO, empaqueta en `dist`, vuelve a validar y registra hashes en `_rediseno/fase2/build-result.json`.
3. `npm run review`: crea la galería local de componentes.
4. `npm run preview`: sirve `http://127.0.0.1:4175/` y la galería `http://127.0.0.1:4175/__revision__/`.

Las respuestas del preview llevan `X-Robots-Tag: noindex`; la galería no forma parte de sitemap ni `dist`. El preview rechaza métodos distintos de GET/HEAD. La prueba visual del formulario solo prepara datos ficticios en el navegador: no abrir el enlace de WhatsApp durante QA.

`npm run build:release` está bloqueado por el recurso oficial pendiente. La integración definitiva y los controles de release deben revisarse después de recibir los originales y de la aprobación del responsable. No basta con cambiar una bandera en brand-status.json. El proveedor no cambia; la configuración existente invoca esa entrada de release para impedir que un paquete de revisión se tome como producción.

## Protección SEO

`scripts/content/seo-contract.json` conserva el estado previo de 225 URLs: title, description, H1, canonical, robots, enlaces del contenido y hash del texto principal. `seo-preservation.js` comprueba tanto el HTML generado como `dist`. Permanecen 56 indexables y 169 noindex. Las rutas nuevas de software, integraciones y casos siguen siendo planificación/borradores.

El generador registra `contentHash` además del hash de HTML. Los cambios de presentación y navegación no adelantan el lastmod de contenidos que no cambiaron. Los dos sitemaps y robots.txt conservan su contenido previo en esta fase.

No cambiar el contrato SEO solo para conseguir un resultado verde. La Fase 3 requiere aprobación aparte, registro de sus cambios de contenido y una actualización explícita del contrato cuando proceda.

## Componentes

`scripts/templates/components.js`: marca textual de revisión, header/nav, footer, button, section, FAQ, tarjetas sectoriales, casos, servicios y formulario. `site.js` mantiene demo y blog; mejora foco del menú y errores de campos/consentimiento. `build-review.js` presenta los mismos componentes con casos/capturas de demostración y estados visuales identificados.

## Pendientes

- Original oficial del logo y sus versiones, favicon, iconos y piezas sociales. El marcado Organization no atribuye un logo histórico y las páginas no editoriales esperan su imagen social definitiva; los artículos conservan sus portadas.
- Marcador NIT y conciliación de política de privacidad: se notifican como pendientes, no se inventan datos ni se presentan como resueltos.
- Formulario con recepción en servidor: corresponde a fase posterior. No se ha añadido analítica, DB ni endpoint.
- Comparación renovada con producción y proveedor real antes de cualquier despliegue autorizado. No se han hecho push ni despliegues.

La home conserva contenido y secciones; no se inició Fase 3.
