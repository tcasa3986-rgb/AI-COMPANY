# AI Company CO — sitio y marca

Sitio estático de https://aicompanyco.com. Plantillas compartidas, HTML con contenido completo y exportación explícita de archivos públicos a `dist/`.

## Trabajo local

Requiere Node.js 22 o posterior. El sitio y el flujo editorial no necesitan instalar dependencias para estos comandos:

```text
npm run build
npm run check
npm test
npm run preview
```

La vista previa sirve en http://127.0.0.1:4175. El contenido de las páginas comerciales está en `scripts/build-site.js`; el blog está en `scripts/content/articles.json`. Diseño compartido: `assets/site.css` y `assets/site.js`. La información legal conservada está en `scripts/content/legal.json`.

## Marca y exportaciones

Identidad: azul profundo `#142b43`, lima `#d4f775`, fondo `#f7f8f4`. Tipografías Manrope y DM Sans. Logo vectorial, favicon y portada social en `assets/brand/`. `scripts/brand-assets.py` exporta PNG e ICO con Pillow, a partir de la geometría del símbolo; se ejecuta solamente para cambiar las exportaciones de marca. Los PNG se versionan y no se necesita Python en Vercel.

## Blog editorial

Los publicadores antiguos dejaron de publicar directamente. El workflow **Blog editorial — generar borrador** se ejecuta manualmente con un tema y fuentes oficiales. Requiere `ANTHROPIC_API_KEY` en GitHub Secrets y saldo disponible. Produce un artefacto revisable; no publica ni manda mensajes.

Para generar localmente, define `BLOG_TOPIC`, `BLOG_SOURCES` (JSON con títulos y URLs HTTPS) y `ANTHROPIC_API_KEY` en el entorno y ejecuta `npm run generate`. `ANTHROPIC_MODEL` permite configurar el modelo. No guardar claves en archivos ni en el repositorio.

```text
npm run blog:validate -- /ruta/al/borrador.json
```

Revisar contenido, intención de búsqueda, fuentes, afirmaciones, relacionados y fecha. Una revisión editorial real se registra con `status: approved`, `reviewedBy: Cristian Gutierrez`, `reviewedAt: AAAA-MM-DD` y `sourceVerified: true`. Estos campos los registra quien revisa; no se asignan al generar.

```text
npm run blog:publish -- /ruta/al/articulo-revisado.json
npm run build
npm run check
npm test
```

`blog:publish` incorpora el artículo al contenido local. Antes se debe asignar una fotografía o captura revisada en `image`, con `src` dentro de `/assets/work/` o `/assets/editorial/`, `alt`, `width`, `height`, `caption`, `credit` (autor y licencia), `type` y `approved: true`. El publicador rechaza una portada ya usada en otra guía. El generador prepara un `imageBrief` y deja `image: null` para la selección editorial; no publica una portada genérica como sustituto.

El despliegue ocurre al versionar y publicar los cambios verificados. No existe una programación de consumo de IA activada en este flujo. Los borradores viven en `_rediseno/blog-drafts/`, fuera de Git y del sitio publicado.

Las consultas ya cubiertas y slugs publicados se rechazan. El validador controla estructura, relacionados, fuentes HTTPS, texto activo y afirmaciones evidentes. No sustituye la revisión factual ni garantiza posicionamiento. El mínimo de 700 palabras es una regla editorial de este proyecto, no un requisito de Google.

## Publicación y SEO

Vercel ejecuta `node scripts/package-site.js` y publica únicamente `dist/`. La compilación empaqueta HTML, activos, portadas, iconos, manifest, robots y sitemaps; no incluye scripts, borradores, Git, archivos de trabajo ni dependencias.

Los redirects históricos se conservan en `vercel.json`. El sitemap incluye páginas indexables y excluye área de clientes, página 404 y combinaciones genéricas de ciudad/sector con `noindex`. El `lastmod` conserva la fecha anterior cuando el contenido no cambia. El código genera metadatos Open Graph, Twitter, canonical y JSON-LD de organización, sitio, página, servicio o artículo según corresponda. No se agregan testimonios, estadísticas de clientes ni reseñas ficticias.

El formulario prepara un mensaje de WhatsApp en el navegador; el usuario completa el envío allí. La señal `whatsapp_contact_click` mide un clic si existe una instalación de analítica; no registra una venta ni una conversación recibida. No se agregó una cuenta de analítica nueva.

Search Console y el rendimiento comercial necesitan revisión en las cuentas del propietario. Los antiguos pings de Google fueron retirados; sitemap y robots permanecen como mecanismos de descubrimiento.

## Continuación local del 13 de octubre

El propietario pidió dejar los ajustes posteriores en local para coordinar su despliegue con Claude Code. La producción verificada anterior es `f034470`; las fotografías, capturas reales, casos ampliados y reglas editoriales de imágenes permanecen locales.

Las 32 guías tienen 32 imágenes distintas. Los casos muestran capturas de las aplicaciones reales de Maderas Montoya, Ferre Láser, Láser Ejecutivo y ASOERC, tomadas con APIs locales sintéticas y escrituras bloqueadas. Las capturas de CanchaLibre proceden de sus revisiones con datos ficticios. Se rotulan como interfaces reales con datos de demostración. No son capturas de movimientos privados de clientes.

Las fotografías editoriales de terceros tienen autor, licencia y enlace a Wikimedia Commons en la guía y el índice. Se seleccionaron visualmente y no se presentan como fotografías de clientes. El registro está en `scripts/content/media.json`; cada artículo conserva sus propios créditos. El paquete publica únicamente las fotografías utilizadas; las candidatas descartadas no entran en `dist/`.

Los workflows nuevos están preparados localmente. GitHub mantiene desactivados los antiguos; no habilitarlos antes de instalar las definiciones nuevas. No se amplió el permiso de la sesión de GitHub. La generación pagada necesita saldo disponible de API y no se ejecutó en esta tarea.
