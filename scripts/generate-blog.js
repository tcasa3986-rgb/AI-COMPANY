#!/usr/bin/env node
/**
 * Automated blog post generator for aicompanyco.com
 * Reads topics from blog-topics.json, picks next unpublished topic,
 * fetches Google News for context, generates full HTML via Claude API,
 * saves the post and updates the sitemap.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const Anthropic = require('@anthropic-ai/sdk');

const ROOT = path.resolve(__dirname, '..');
const TOPICS_FILE = path.join(__dirname, 'blog-topics.json');
const BLOG_DIR = path.join(ROOT, 'blog');
const SITEMAP_SEO  = path.join(ROOT, 'sitemap-seo.xml');
const SITEMAP_MAIN = path.join(ROOT, 'sitemap-main.xml');

// ─── helpers ────────────────────────────────────────────────────────────────

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BlogBot/1.0)' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function fetchGoogleNews(keyword) {
  try {
    const q = encodeURIComponent(`${keyword} Colombia 2026`);
    const url = `https://news.google.com/rss/search?q=${q}&hl=es-419&gl=CO&ceid=CO:es-419`;
    const xml = await fetchUrl(url);
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(xml)) !== null && items.length < 5) {
      const titleMatch = match[1].match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const descMatch = match[1].match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
      if (titleMatch) {
        items.push({
          title: titleMatch[1],
          description: descMatch ? descMatch[1].replace(/<[^>]+>/g, '').slice(0, 200) : '',
        });
      }
    }
    return items;
  } catch {
    return [];
  }
}

function getPublishedSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return new Set();
  return new Set(
    fs.readdirSync(BLOG_DIR).filter((d) =>
      fs.existsSync(path.join(BLOG_DIR, d, 'index.html'))
    )
  );
}

function getTodayISO() {
  return new Date().toISOString().split('T')[0];
}

function monthName(dateStr) {
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const d = new Date(dateStr);
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

const SERVICIO_EMOJI = {
  'chatbot-ia': '🤖',
  'whatsapp-automatico': '💬',
  'paginas-web': '🌐',
  'marketing-digital': '📈',
  'apps-empresariales': '📱',
  'asistente-ia': '⚡',
};

// ─── cover image generator (brand gradient SVG, zero-dependency) ─────────────

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}

function wrapTitle(title, maxChars) {
  const words = String(title).split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars) {
      if (line) lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, 4); // máx 4 líneas
}

/**
 * Genera una portada SVG on-brand (1200x630, ideal para hero + og:image).
 * Gradiente azul→violeta de AI Company CO, categoría y título.
 */
function generateCoverSVG(topic) {
  const W = 1200, H = 630;
  const titleLines = wrapTitle(topic.titulo, 24);
  const lineH = 62;
  const startY = Math.round(H / 2 - ((titleLines.length - 1) * lineH) / 2 - 6);
  const tspans = titleLines
    .map((l, i) => `<tspan x="80" y="${startY + i * lineH}">${escapeXml(l)}</tspan>`)
    .join('');
  const cat = escapeXml(String(topic.categoria || 'Blog').toUpperCase());
  const pillW = cat.length * 11 + 44;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(topic.titulo)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2563EB"/>
      <stop offset="1" stop-color="#7C3AED"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1060" cy="110" r="230" fill="#ffffff" opacity="0.06"/>
  <circle cx="150" cy="580" r="190" fill="#ffffff" opacity="0.05"/>
  <rect x="80" y="68" width="${pillW}" height="40" rx="20" fill="#ffffff" opacity="0.18"/>
  <text x="102" y="95" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="600" fill="#ffffff" letter-spacing="1.5">${cat}</text>
  <text font-family="'Space Grotesk', Inter, Arial, sans-serif" font-size="52" font-weight="700" fill="#ffffff">${tspans}</text>
  <text x="80" y="${H - 58}" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="#ffffff">AI Company CO</text>
  <text x="80" y="${H - 30}" font-family="Inter, Arial, sans-serif" font-size="16" fill="#ffffff" opacity="0.85">aicompanyco.com · Automatización · IA · Crecimiento</text>
</svg>`;
}

function updateBlogIndex(topic, dateStr) {
  const indexPath = path.join(BLOG_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) return;

  let html = fs.readFileSync(indexPath, 'utf8');

  // Don't add duplicate
  if (html.includes(`"${topic.slug}/"`)) return;

  const fecha = monthName(dateStr);
  const cat = String(topic.categoria || 'Blog').toUpperCase();

  // Tarjeta con el nuevo diseño (Tailwind), usando la portada SVG como miniatura
  const card = `
<!-- post -->
<article class="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
<a href="${topic.slug}/" class="block h-48 overflow-hidden relative">
<div class="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style="background-image: url('/blog/${topic.slug}/portada.svg')"></div>
<div class="absolute top-sm left-sm bg-white/90 backdrop-blur-sm px-xs py-base rounded text-label-sm font-bold text-primary">${cat}</div>
</a>
<div class="p-md">
<h3 class="font-headline-md text-headline-md mb-sm group-hover:text-primary transition-colors"><a href="${topic.slug}/">${topic.titulo}</a></h3>
<p class="text-on-surface-variant text-body-md line-clamp-2 mb-md">Guía práctica sobre ${topic.keyword} para empresas colombianas.</p>
<div class="flex justify-between items-center text-label-sm text-outline border-t border-outline-variant/10 pt-md">
<span>${fecha}</span>
<a href="${topic.slug}/" class="text-primary font-semibold">Leer →</a>
</div>
</div>
</article>`;

  // Insertar tras el marcador del nuevo índice (o, si no existe, en el grid viejo)
  if (html.includes('<!-- BLOG_POSTS_INSERT -->')) {
    html = html.replace('<!-- BLOG_POSTS_INSERT -->', '<!-- BLOG_POSTS_INSERT -->' + card);
  } else if (html.includes('<div class="posts-grid">')) {
    html = html.replace('<div class="posts-grid">', `<div class="posts-grid">${card}`);
  } else {
    return;
  }
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Blog index updated');
}

// ─── sitemap updater ─────────────────────────────────────────────────────────

function updateSitemap(slug, dateStr) {
  const url   = `https://aicompanyco.com/blog/${slug}/`;
  const entry = `  <url>\n    <loc>${url}</loc>\n    <lastmod>${dateStr}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n  </url>`;

  // ── sitemap-seo.xml ──────────────────────────────────────────────────────
  if (!fs.existsSync(SITEMAP_SEO)) {
    fs.writeFileSync(SITEMAP_SEO,
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entry}\n</urlset>`,
      'utf8');
  } else {
    let s = fs.readFileSync(SITEMAP_SEO, 'utf8');
    if (!s.includes(url)) {
      s = s.replace('</urlset>', `${entry}\n</urlset>`);
      fs.writeFileSync(SITEMAP_SEO, s, 'utf8');
    }
  }

  // ── sitemap-main.xml (el que Google usa para indexar el blog) ────────────
  if (fs.existsSync(SITEMAP_MAIN)) {
    let s = fs.readFileSync(SITEMAP_MAIN, 'utf8');
    if (!s.includes(url)) {
      s = s.replace('</urlset>', `${entry}\n</urlset>`);
      fs.writeFileSync(SITEMAP_MAIN, s, 'utf8');
      console.log(`  → sitemap-main.xml actualizado con ${url}`);
    }
  }
}

// ─── Google Indexing ping ────────────────────────────────────────────────────

async function pingGoogle(slug) {
  const blogUrl = `https://aicompanyco.com/blog/${slug}/`;
  const sitemapUrl = 'https://aicompanyco.com/sitemap.xml';

  // Ping 1: notificar sitemap actualizado
  try {
    await fetchUrl(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    console.log(`  → Google sitemap ping OK`);
  } catch (e) {
    console.log(`  → Google sitemap ping falló: ${e.message}`);
  }

  // Ping 2: Google Indexing API (si hay credenciales configuradas)
  const indexingKey = process.env.GOOGLE_INDEXING_KEY;
  if (indexingKey) {
    try {
      const creds = JSON.parse(indexingKey);
      const token = await getGoogleToken(creds);
      await notifyGoogleIndexing(blogUrl, token);
      console.log(`  → Google Indexing API: ${blogUrl} notificada`);
    } catch (e) {
      console.log(`  → Google Indexing API falló: ${e.message}`);
    }
  }
}

async function getGoogleToken(creds) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })).toString('base64url');

  const { createSign } = require('crypto');
  const sign = createSign('RSA-SHA256');
  sign.update(`${header}.${payload}`);
  const sig = sign.sign(creds.private_key, 'base64url');
  const jwt = `${header}.${payload}.${sig}`;

  const body = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;
  const res = await fetchUrl('https://oauth2.googleapis.com/token', {
    method: 'POST', body, contentType: 'application/x-www-form-urlencoded'
  });
  const data = JSON.parse(res);
  if (!data.access_token) throw new Error(data.error_description || 'No token');
  return data.access_token;
}

async function notifyGoogleIndexing(url, token) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ url, type: 'URL_UPDATED' });
    const req = require('https').request({
      hostname: 'indexing.googleapis.com',
      path: '/v3/urlNotifications:publish',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        const json = JSON.parse(d || '{}');
        if (res.statusCode !== 200) reject(new Error(json.error?.message || d));
        else resolve(json);
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── IndexNow ────────────────────────────────────────────────────────────────
async function pingIndexNow(url) {
  const key  = 'a7f3c9e2b8d1f4e6a2c5b9d3e7f1a4c8';
  const body = JSON.stringify({ host: 'aicompanyco.com', key, urlList: [url] });
  return new Promise((resolve) => {
    const req = require('https').request({
      hostname: 'api.indexnow.org', path: '/indexnow', method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body) },
    }, res => { res.resume(); console.log(`  → IndexNow: ${res.statusCode}`); resolve(); });
    req.on('error', e => { console.log(`  → IndexNow error: ${e.message}`); resolve(); });
    req.write(body); req.end();
  });
}

// ─── HTML builder (used as fallback structure context for Claude) ────────────

function buildSystemPrompt() {
  return `Eres un redactor SEO experto para aicompanyco.com, una agencia de tecnología e inteligencia artificial en Colombia.

CONTEXTO DE LA EMPRESA:
- Nombre: AI Company CO
- Servicios: Chatbot con IA, WhatsApp Automático, Páginas Web, Marketing Digital, Apps Empresariales, Asistente IA
- Ubicación: Soacha, Cundinamarca, Colombia
- Teléfono WhatsApp: +57 321 267 4754
- URL: https://aicompanyco.com
- Autor schema: César Granados

ESTILO DE ESCRITURA:
- Directo, práctico, enfocado en resultados reales para empresas colombianas
- Incluir datos concretos, precios en COP, ejemplos locales
- Sin fluff corporativo, sin clichés vacíos
- Párrafos cortos, lectores en pantalla móvil

FORMATO DE SALIDA:
Devuelve SOLO el HTML completo del artículo. Sin explicaciones adicionales, sin markdown, sin bloques de código.
El HTML debe comenzar con <!DOCTYPE html> y terminar con </html>.`;
}

function buildUserPrompt(topic, newsItems, dateStr) {
  const newsContext = newsItems.length > 0
    ? `\n\nNOTICIAS RECIENTES RELEVANTES (úsalas para añadir frescura y contexto actual):\n${newsItems.map((n, i) => `${i + 1}. ${n.title}\n   ${n.description}`).join('\n\n')}`
    : '';

  const serviceLinks = {
    'chatbot-ia': '../../servicios/chatbot-ia/',
    'whatsapp-automatico': '../../servicios/whatsapp-automatico/',
    'paginas-web': '../../servicios/paginas-web/',
    'marketing-digital': '../../servicios/marketing-digital/',
    'apps-empresariales': '../../servicios/apps-empresariales/',
    'asistente-ia': '../../servicios/asistente-ia/',
  };
  const serviceLink = serviceLinks[topic.servicio] || '../../index_con_logo.html#servicios';
  const serviceName = {
    'chatbot-ia': 'Chatbot con IA',
    'whatsapp-automatico': 'WhatsApp Automático',
    'paginas-web': 'Páginas Web',
    'marketing-digital': 'Marketing Digital',
    'apps-empresariales': 'Apps Empresariales',
    'asistente-ia': 'Asistente IA',
  }[topic.servicio] || 'Nuestro Servicio';

  const waText = encodeURIComponent(`Hola, leí el artículo sobre ${topic.keyword} y quiero más información.`);
  const waLink = `https://wa.me/573212674754?text=${waText}`;

  return `Escribe un artículo de blog SEO completo en HTML para el siguiente tema:

TÍTULO: ${topic.titulo}
KEYWORD PRINCIPAL: ${topic.keyword}
CATEGORÍA: ${topic.categoria}
INDUSTRIA OBJETIVO: ${topic.industria || 'general Colombia'}
SERVICIO RELACIONADO: ${serviceName}
FECHA DE PUBLICACIÓN: ${dateStr}${newsContext}

SISTEMA DE DISEÑO (NUEVO, claro/moderno — OBLIGATORIO seguirlo):
- Tema CLARO. Variables CSS exactas: --primary:#2563EB; --secondary:#7C3AED; --bg:#FFFFFF; --bg2:#F8FAFC; --text:#0F172A; --text-muted:#475569; --border:#E2E8F0; --wa:#25D366;
- Gradiente de marca: linear-gradient(135deg,#2563EB 0%,#7C3AED 100%). Úsalo en el badge de categoría, botones primarios y banners CTA.
- Tipografía: títulos (h1,h2,h3) en 'Space Grotesk' (700); cuerpo en 'Inter' (400/500/600). Google Fonts: https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap
- Esquinas redondeadas 12px en tarjetas/botones; sombras suaves; mucho aire en blanco.
- Botón primario .btn: fondo gradiente de marca, texto blanco, radius 12px. Botón WhatsApp .btn-wa: fondo verde var(--wa), texto blanco.

ESTRUCTURA REQUERIDA DEL HTML:
- DOCTYPE html, lang="es-CO"
- Meta charset, viewport, title (con "| AI Company CO"), meta description única (150-160 chars)
- Canonical: https://aicompanyco.com/blog/${topic.slug}/
- Favicon: ../../logo.png
- Open Graph + Twitter Card: og:title, og:description, og:type=article, og:url canonical, og:image="https://aicompanyco.com/blog/${topic.slug}/portada.svg", twitter:card=summary_large_image, twitter:image igual.
- Schema.org Article JSON-LD con datePublished="${dateStr}", dateModified="${dateStr}", author Organization "AI Company CO". OBLIGATORIO incluir campo "image": {"@type":"ImageObject","url":"https://aicompanyco.com/blog/${topic.slug}/portada.svg","width":1200,"height":630} dentro del schema Article.
- Schema.org FAQPage JSON-LD adicional (segundo bloque <script type="application/ld+json">) con las mismas 4 preguntas frecuentes del artículo en formato {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Pregunta?","acceptedAnswer":{"@type":"Answer","text":"Respuesta."}},...]}.
- CSS inline usando las variables del sistema de diseño de arriba.
- Clases CSS: .container (max-width:760px, margin auto, padding lateral), .nav (sticky, fondo blanco, sombra suave), .breadcrumb, .post-category (píldora con gradiente de marca, texto blanco), .post-meta (texto var(--text-muted)), .cover (imagen de portada), .article-body, .callout (fondo gradiente suave azul→violeta al 8%, borde izquierdo azul), .cta-inline (banner con gradiente de marca, texto blanco), .btn, .btn-wa, blockquote (borde izquierdo azul).
- NAV sticky arriba: logo "AI Company CO" enlazando a ../../ y botón .btn-wa "Hablar con un asesor" a ${waLink}.
- BREADCRUMB: Inicio / Blog / [título corto]
- HERO del artículo: .post-category, <h1> con el título, .post-meta con "Por AI Company CO · ${monthName(dateStr)} · X min de lectura · Generado con IA".
- IMAGEN DE PORTADA (OBLIGATORIA) inmediatamente debajo del meta: <img class="cover" src="portada.svg" alt="${topic.titulo}" width="1200" height="630" style="width:100%;height:auto;border-radius:16px;display:block;margin:1.5rem 0;"> (ruta relativa, el archivo ya existe en la misma carpeta).

CONTENIDO DEL ARTÍCULO (mínimo 800 palabras):
1. Párrafo de apertura: problema real que enfrenta la industria objetivo en Colombia hoy
2. Sección principal con h2: qué es la solución / cómo funciona
3. Casos de uso o ejemplos concretos (lista con viñetas o tarjetas)
4. CTA inline en medio del artículo (.cta-inline con gradiente + .btn-wa con link: ${waLink})
5. Sección de costos/inversión: explica que el precio es A LA MEDIDA según los requerimientos (no manejamos precios fijos); invita a agendar un diagnóstico gratis. Puedes dar rangos orientativos si ayuda, aclarando que varían.
6. .callout con dato estadístico o ROI concreto
7. Sección "Preguntas frecuentes" (mínimo 3 Q&A) que coincidan con el FAQPage JSON-LD
8. CTA final (.cta-inline)

FOOTER (fondo oscuro #0F172A, texto claro):
- Logo "AI Company CO"
- Links internos: ${serviceLink} (${serviceName}), ../../blog/ (Blog), ../../#contacto (Contacto)
- Contacto: WhatsApp +57 321 267 4754, agencia@aicompanyco.com, Soacha, Cundinamarca
- Copyright: © 2026 AI Company CO · Soacha, Cundinamarca, Colombia

IMPORTANTE:
- Rutas relativas: portada "portada.svg", logo ../../logo.png, nav/links ../../...
- La ÚNICA imagen es la portada local (portada.svg). No uses imágenes externas ni de bancos.
- El artículo debe ser ÚNICO, con datos reales de Colombia, no solo variables intercambiadas.
- Asegúrate de que el HTML esté completo y bien formado, y que use el tema CLARO (fondo blanco), NO oscuro.`;
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ERROR: ANTHROPIC_API_KEY not set');
    process.exit(1);
  }

  const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, 'utf8'));
  const published = getPublishedSlugs();

  const pending = topics.filter((t) => !published.has(t.slug));
  if (pending.length === 0) {
    console.log('All topics already published. Nothing to do.');
    return;
  }

  // pick the first unpublished topic (ordered list = editorial calendar)
  const topic = pending[0];
  console.log(`\nGenerating: ${topic.titulo}`);
  console.log(`Slug: ${topic.slug}`);

  // fetch news for freshness context
  console.log('Fetching Google News...');
  const newsItems = await fetchGoogleNews(topic.keyword);
  console.log(`Found ${newsItems.length} news items`);

  // call Claude API
  const client = new Anthropic({ apiKey });
  const dateStr = getTodayISO();

  console.log('Calling Claude API...');
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8192,
    system: buildSystemPrompt(),
    messages: [{ role: 'user', content: buildUserPrompt(topic, newsItems, dateStr) }],
  });

  const html = message.content[0].text.trim();

  if (!html.includes('<!DOCTYPE html>') && !html.includes('<!doctype html>')) {
    console.error('ERROR: Claude did not return valid HTML');
    console.error(html.slice(0, 500));
    process.exit(1);
  }

  // save file
  const outDir = path.join(BLOG_DIR, topic.slug);
  fs.mkdirSync(outDir, { recursive: true });

  // generar portada de marca (SVG on-brand, hero + og:image, sin dependencias)
  const coverSvg = generateCoverSVG(topic);
  fs.writeFileSync(path.join(outDir, 'portada.svg'), coverSvg, 'utf8');
  console.log(`Portada generada: blog/${topic.slug}/portada.svg`);

  const outFile = path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf8');
  console.log(`Saved: blog/${topic.slug}/index.html`);

  // update sitemaps (seo + main)
  updateSitemap(topic.slug, dateStr);
  console.log('Sitemaps updated');

  // update blog index
  updateBlogIndex(topic, dateStr);

  // notify Google + IndexNow
  await pingGoogle(topic.slug);
  await pingIndexNow(`https://aicompanyco.com/blog/${topic.slug}/`);

  // print summary for CI log
  console.log(`\n✓ Published: ${topic.titulo}`);
  console.log(`  URL: https://aicompanyco.com/blog/${topic.slug}/`);
  console.log(`  Date: ${dateStr}`);

  // Exportar tokens usados para que el workflow reporte el saldo
  const usage = message.usage;
  if (outFile) {
    fs.appendFileSync(outFile, `input_tokens=${usage.input_tokens}\n`);
    fs.appendFileSync(outFile, `output_tokens=${usage.output_tokens}\n`);
  }
  console.log(`  Tokens: ${usage.input_tokens} in / ${usage.output_tokens} out`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { generateCoverSVG, wrapTitle, escapeXml, updateBlogIndex };
