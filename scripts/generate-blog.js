'use strict';
// Genera UN BORRADOR de guia con el formato editorial vigente (SEO + AEO + GEO + imagenes).
// Nunca publica, ni hace push, ni avisa, ni pide indexacion: el borrador queda en _rediseno/blog-drafts/ y exige
// revision humana (fuentes y afirmaciones) antes de `blog-editorial.js aprobar` y `publish`.
//
//   BLOG_TOPIC="..." BLOG_SOURCES='[{"title":"...","url":"https://..."}]' ANTHROPIC_API_KEY=... node scripts/generate-blog.js
//
// Despues, en el PC de Cristian (necesita el Chrome de Flow): node scripts/blog-imagenes.js generar _rediseno/blog-drafts/<slug>.json
const fs = require('node:fs'), path = require('node:path');
const {validate} = require('./blog-editorial');
const SERVICIOS = require('./content/servicios.json');
const ROOT = path.resolve(__dirname, '..');

const SISTEMA = 'Eres el redactor de AI Company CO (software a la medida y automatización, Soacha, Colombia). Escribes para dueños y gerentes de pymes colombianas. ' +
  'Reglas: no inventes clientes, resultados, cifras, estadísticas, testimonios, garantías, premios ni normas. Los datos de terceros (precios, planes, límites, fechas, umbrales de normas) NO se afirman de memoria: remite al sitio oficial de la fuente. ' +
  'No des asesoría fiscal ni legal. Si el tema toca una norma, dilo en general y remite a la autoridad. No declares que somos los mejores. Declara el interés comercial de AI Company cuando hables de servicios propios. ' +
  'El software a la medida se cotiza por alcance. Nunca otorgues aprobación editorial. Devuelve SOLO JSON válido, sin markdown ni HTML.';

function esquema(existing, topic, sources) {
  const slugsServicio = SERVICIOS.servicios.map(s => `${s.slug} (${s.nombre})`);
  return {
    topic, sources, avoidQueries: existing.map(a => a.query || a.title),
    requirements: {
      words: '800-1200 palabras entre intro, secciones, tablas y FAQ',
      tone: 'claro, específico, sin promesas de ROI ni de posicionamiento',
      estructura: 'El H2 de cada sección es la PREGUNTA que contesta, y la primera frase debajo la responde de inmediato. Usa al menos una tabla cuando compares opciones.',
      servicios: `services = 1 o más slugs de: ${slugsServicio.join('; ')}`,
      related: 'elige dos slugs de related entre los artículos ya publicados que te paso en `relatedCandidates`',
      imagenes: 'Describe en inglés prompts para ilustraciones: una portada y DOS interiores. Estilo plano, sin texto, sin logos, sin marcas, sin personas reales. El estilo común lo agrega el sistema, no lo repitas. antesDeH2 es el número (1 = primero) del H2 ANTES del cual va la figura: usa un número entre 2 y el total de secciones.',
    },
    relatedCandidates: existing.slice(-12).map(a => a.slug),
    schema: {
      slug: 'slug-en-minusculas-con-guiones',
      title: 'Título de 25 a 62 caracteres con la consulta principal',
      description: 'Descripción de 120 a 158 caracteres',
      h1: 'Título principal de 20 a 180 caracteres',
      query: 'Una intención de búsqueda concreta, distinta de avoidQueries',
      category: 'Categoría corta',
      answer: 'Respuesta directa de 120 a 520 caracteres: es lo que un buscador con IA puede citar',
      intro: 'Contexto en 1-3 párrafos (120+ caracteres), separados por una línea en blanco',
      services: ['slug-de-servicio'],
      sections: [{heading: 'Pregunta que responde la sección', text: 'Texto con párrafos separados por una línea en blanco; "- " abre una lista', table: {caption: 'opcional', headers: ['A', 'B'], rows: [['x', 'y']]}}],
      faq: [{question: 'Pregunta', answer: 'Respuesta de 30+ caracteres'}],
      related: ['slug-existente-1', 'slug-existente-2'],
      imagenes: {
        portada: {prompt: 'Scene description in English', alt: 'Texto alternativo en español (15+ caracteres)', caption: 'Pie de foto en español'},
        interiores: [{antesDeH2: 3, prompt: 'Scene description in English', alt: 'Texto alternativo en español', caption: 'Pie de foto en español'}],
      },
      verificar: ['Afirmaciones concretas que un humano debe comprobar contra la fuente oficial antes de aprobar'],
    },
  };
}

async function main() {
  const topic = process.env.BLOG_TOPIC || process.argv[2];
  if (!topic) throw new Error('Define BLOG_TOPIC: la pregunta o proceso concreto que cubrirá la guía.');
  const sources = JSON.parse(process.env.BLOG_SOURCES || '[]');
  if (!sources.length || sources.some(s => !s.title || !/^https:\/\//.test(s.url))) throw new Error('Define BLOG_SOURCES con fuentes oficiales y títulos para revisar.');
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('Falta ANTHROPIC_API_KEY. No se publica ningún artículo.');
  const existing = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/content/articles.json'), 'utf8'));

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST', signal: AbortSignal.timeout(180000),
    headers: {'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01'},
    body: JSON.stringify({model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5', max_tokens: 10000, system: SISTEMA, messages: [{role: 'user', content: JSON.stringify(esquema(existing, topic, sources))}]}),
  });
  if (!response.ok) {
    if ([400, 402].includes(response.status)) throw new Error('La API rechazó la generación. Revisa saldo, modelo y configuración; no se publica contenido.');
    throw new Error(`La API respondió HTTP ${response.status}; no se publica contenido.`);
  }
  const result = await response.json();
  if (result.stop_reason !== 'end_turn') throw new Error('Respuesta incompleta del modelo.');
  const text = result.content.filter(c => c.type === 'text').map(c => c.text).join('').replace(/^```(?:json)?\s*|\s*```$/g, '');
  const draft = JSON.parse(text);

  // Lo que NUNCA decide la máquina: estado, firma y verificación.
  draft.status = 'draft'; draft.sourceVerified = false; delete draft.image; delete draft.reviewedBy; delete draft.reviewedAt;
  const parts = new Intl.DateTimeFormat('en', {timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(new Date());
  const p = t => parts.find(x => x.type === t).value;
  draft.published = `${p('year')}-${p('month')}-${p('day')}`;
  draft.sources = sources;

  validate(draft, existing);
  const dir = path.join(ROOT, '_rediseno', 'blog-drafts'); fs.mkdirSync(dir, {recursive: true});
  const target = path.join(dir, draft.slug + '.json');
  if (fs.existsSync(target)) throw new Error('Ya existe ese borrador; no se sobrescribe.');
  fs.writeFileSync(target, JSON.stringify(draft, null, 2) + '\n');
  console.log(`Borrador validado: _rediseno/blog-drafts/${draft.slug}.json. Siguiente: revisar fuentes, generar imágenes con Flow y aprobar.`);
}

module.exports = {esquema, SISTEMA};
if (require.main === module) main().catch(e => { console.error(e.message); process.exitCode = 1; });
