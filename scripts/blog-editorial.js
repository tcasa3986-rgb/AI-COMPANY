'use strict';
// Pipeline editorial de las guias del blog.
//
//   node scripts/blog-editorial.js validate <borrador.json>      valida un borrador
//   node scripts/blog-editorial.js validate-all <carpeta>        valida todos (y que se enlacen entre si)
//   node scripts/blog-editorial.js preview <carpeta>             genera _rediseno/borradores/ para revisar
//   node scripts/blog-editorial.js portadas <carpeta>            genera la portada PNG de cada borrador
//   node scripts/blog-editorial.js aprobar <carpeta> "Nombre" AAAA-MM-DD   registra la aprobacion HUMANA
//   node scripts/blog-editorial.js publish <borrador.json>       incorpora una guia aprobada
//   node scripts/blog-editorial.js publish-all <carpeta>         incorpora todas las aprobadas
//   node scripts/blog-editorial.js covers                        (heredado) portada SVG de las guias existentes
//
// COMPUERTA: publicar exige status 'approved', reviewedBy, reviewedAt y sourceVerified:true.
// `aprobar` NO se ejecuta por iniciativa propia: solo cuando la persona que firma haya revisado
// de verdad las fuentes y las afirmaciones y lo diga. La firma queda en el JSON, visible en git.
//
// Formato de un borrador (SEO + AEO + GEO):
//   answer     respuesta directa de 120 a 520 caracteres: es lo que un buscador con IA puede citar.
//   intro      contexto en 1-3 parrafos. Una linea en blanco separa parrafos.
//   sections   [{heading, text, table?:{caption,headers,rows}}]  el heading es la pregunta que se contesta.
//   faq        >=3 preguntas con respuesta propia.
//   sources    >=1 fuente https verificable. Los datos de terceros se citan, no se afirman de memoria.
//   services   slugs de servicios.json a los que pertenece (alimenta el enlazado interno).
//   verificar  (opcional) afirmaciones concretas que la persona revisora debe comprobar.
// Dentro del texto: "- " abre una lista, **negrita**, [texto](/ruta/) enlace interno, [texto](https://...) externo.
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const {spawnSync} = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');
const SERVICIOS = require('./content/servicios.json');

const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

function inline(s) {
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>')
    .replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}
function blocks(text) {
  return String(text).split(/\n\s*\n/).map(b => {
    const lines = b.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return '';
    if (lines.every(l => /^-\s+/.test(l))) return `<ul>${lines.map(l => `<li>${inline(l.replace(/^-\s+/, ''))}</li>`).join('')}</ul>`;
    return `<p>${inline(lines.join(' '))}</p>`;
  }).join('\n');
}
function tabla(t) {
  return `<div class="tabla-guia"><table>${t.caption ? `<caption>${esc(t.caption)}</caption>` : ''}<thead><tr>${t.headers.map(h => `<th scope="col">${inline(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function wordcount(a) {
  const cells = (a.sections || []).flatMap(s => s.table ? [...s.table.headers, ...s.table.rows.flat()] : []);
  return [a.answer || '', a.intro, ...a.sections.map(s => s.text), ...cells, ...a.faq.flatMap(f => [f.question, f.answer])].join(' ').split(/\s+/).filter(Boolean).length;
}

function validate(a, existing = [], options = {}) {
  const errors = [];
  for (const [name, min, max] of [['slug', 3, 90], ['title', 25, 80], ['description', 120, 158], ['h1', 20, 180], ['query', 10, 160], ['intro', 120, 2400], ['category', 3, 60]]) {
    const v = a[name];
    if (typeof v !== 'string' || v.trim() !== v || v.length < min || v.length > max) errors.push(`${name}: debe tener entre ${min} y ${max} caracteres`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug || '')) errors.push('slug inválido');
  const validDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s || '') && !Number.isNaN(Date.parse(s));
  if (!validDate(a.published)) errors.push('fecha de publicación inválida');
  if (!Array.isArray(a.sections) || a.sections.length < 4 || a.sections.length > 10) errors.push('se requieren de 4 a 10 secciones');
  else a.sections.forEach((s, i) => {
    if (typeof s.heading !== 'string' || s.heading.length < 8 || typeof s.text !== 'string' || s.text.length < (s.table ? 40 : 100)) errors.push(`sección ${i + 1} incompleta`); // con tabla basta una frase de entrada
    if (s.table && (!Array.isArray(s.table.headers) || !Array.isArray(s.table.rows) || !s.table.rows.length || s.table.rows.some(r => !Array.isArray(r) || r.length !== s.table.headers.length))) errors.push(`sección ${i + 1}: tabla mal formada`);
  });
  if (!Array.isArray(a.faq) || a.faq.length < 3) errors.push('se requieren al menos 3 preguntas frecuentes');
  else a.faq.forEach((f, i) => { if (!f.question || typeof f.answer !== 'string' || f.answer.length < 30) errors.push(`FAQ ${i + 1} incompleta`); });
  if (typeof a.answer !== 'string' || a.answer.length < 120 || a.answer.length > 520) errors.push('answer: la respuesta corta debe tener entre 120 y 520 caracteres');
  if (!Array.isArray(a.services) || !a.services.length || a.services.some(s => !SERVICIOS.servicios.some(x => x.slug === s))) errors.push('services: indica al menos un slug válido de servicios.json');
  if (!Array.isArray(a.related) || a.related.length < 2) errors.push('se requieren dos artículos relacionados');
  else for (const slug of a.related) if (!existing.some(p => p.slug === slug)) errors.push('relacionado inexistente: ' + slug);
  if (!Array.isArray(a.sources) || a.sources.length < 1) errors.push('se requiere al menos una fuente verificable');
  else for (const s of a.sources) { try { const u = new URL(s.url); if (u.protocol !== 'https:' || !s.title) throw new Error(); } catch { errors.push('fuente inválida'); } }
  if (existing.some(p => p.slug === a.slug)) errors.push('slug ya publicado');
  if (existing.some(p => normalize(p.query || p.title) === normalize(a.query))) errors.push('consulta ya cubierta');
  if (Array.isArray(a.sections) && Array.isArray(a.faq) && typeof a.intro === 'string' && wordcount(a) < 700) errors.push('contenido insuficiente: mínimo editorial de 700 palabras');
  const text = JSON.stringify(a);
  if (/<\/?(?:script|iframe|style)|javascript:|\[CONFIRMAR\]|index_con_logo|sitemap-seo/i.test(text)) errors.push('contenido no permitido o referencia antigua');
  if (/garantiza.{0,30}(?:primer|posici[oó]n|ventas)|100\s*%\s*(?:seguro|garantizado)|clientes satisfechos|sin riesgo|DIAN.*certificad/i.test(text)) errors.push('afirmación comercial que requiere corrección');
  if (/\bsomos (?:los|las|el|la) (?:mejor|mejores|l[ií]der|l[ií]deres|n[úu]mero\s*1)\b/i.test(text)) errors.push('no se afirma que seamos los mejores: se muestra, no se declara');
  if (options.publish && (a.status !== 'approved' || !a.reviewedBy || !validDate(a.reviewedAt))) errors.push('falta aprobación editorial registrada de Cristian');
  if (options.publish && a.reviewedBy !== 'Cristian Gutierrez') errors.push('la aprobación editorial debe ser de Cristian Gutierrez');
  if (options.publish && a.sourceVerified !== true) errors.push('falta verificación humana de fuentes y afirmaciones');
  if (options.publish) {
    const image = a.image;
    if (!image || image.approved !== true || !/^\/assets\/(work|editorial)\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/.test(image.src || '') || typeof image.alt !== 'string' || image.alt.length < 15 || !Number.isInteger(image.width) || !Number.isInteger(image.height) || image.width < 300 || image.height < 200) errors.push('falta una imagen fotográfica revisada con texto alternativo y dimensiones');
    else {
      if (!fs.existsSync(path.join(ROOT, image.src.slice(1)))) errors.push('la imagen seleccionada no existe');
      if (existing.some(p => p.cover === image.src)) errors.push('imagen ya utilizada en otra guía');
      if (!image.credit?.author || !image.credit?.license || !image.caption) errors.push('faltan créditos y contexto de la imagen');
    }
  }
  if (errors.length) throw new Error(errors.join('\n'));
  return a;
}

// La respuesta corta NO va en el cuerpo: build-site la pinta encima de la imagen (lo primero que se lee) a partir de `answer`.
const cajaRespuesta = answer => `<div class="respuesta-corta" role="note"><strong>Respuesta corta</strong><p>${inline(answer)}</p></div>`;
function toPost(a, existing) {
  const usados = new Set();
  const id = s => { let base = normalize(s).replace(/ /g, '-'), n = base, i = 2; while (usados.has(n)) n = `${base}-${i++}`; usados.add(n); return n; };
  const wa = 'https://wa.me/573224807767?text=' + encodeURIComponent(a.waText || `Hola, leí la guía «${a.h1}» en aicompanyco.com y quiero conversar sobre mi caso.`);
  const revisada = a.reviewedAt || a.published;
  const body = `<div class="container">${blocks(a.intro)}${a.sections.map(s => `<h2 id="${id(s.heading)}">${esc(s.heading)}</h2>${blocks(s.text)}${s.table ? tabla(s.table) : ''}${s.after ? blocks(s.after) : ''}`).join('\n')}<div class="cta-inline"><h3>${esc(a.ctaTitle || 'Revisemos el proceso de tu negocio')}</h3><p>${esc(a.ctaText || 'Cuéntanos cómo trabajas hoy y qué quieres organizar. El diagnóstico inicial es gratuito.')}</p><a href="${esc(wa)}" class="btn-wa" target="_blank" rel="noopener">Escribirnos por WhatsApp</a></div><p class="nota-autoria"><strong>Sobre esta guía.</strong> La escribe AI Company CO, una empresa de software a la medida y automatización de Soacha, Cundinamarca. Tenemos interés comercial en el tema y por eso te lo decimos. Es información general: precios, planes y normas cambian, así que verifica los datos en la fuente oficial antes de decidir. Última revisión: ${revisada}.</p><p class="fuentes"><strong>Fuentes y referencias:</strong> ${a.sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>`).join(' · ')}</p></div><section class="related-section"><h3 class="related-title">Seguir leyendo</h3><div class="related-grid">${a.related.map(slug => `<a class="rel-card" href="/blog/${slug}/"><span class="rel-titulo">${esc(existing.find(p => p.slug === slug).title)}</span><span class="rel-arrow">→</span></a>`).join('')}</div></section><section class="faq-section" id="preguntas-frecuentes"><h2 class="faq-title">Preguntas frecuentes</h2>${a.faq.map(f => `<details class="faq-item"><summary class="faq-q">${esc(f.question)}<span class="faq-icon">+</span></summary><p class="faq-a">${inline(f.answer)}</p></details>`).join('')}</section>`;
  return {slug: a.slug, title: a.title, description: a.description, h1: a.h1, category: a.category, query: a.query, answer: a.answer, published: a.published, modified: a.reviewedAt, body, cover: a.image.src, coverAlt: a.image.alt, coverWidth: a.image.width, coverHeight: a.image.height, imageType: a.image.type || 'editorial-photo', imageCaption: a.image.caption, imageCredit: a.image.credit, source: 'editorial-reviewed'};
}

// Portada de marca (violeta). Se usa como PNG: los SVG no sirven como imagen al compartir en WhatsApp o LinkedIn.
function cover(title, category) {
  const words = title.split(/\s+/), lines = [];
  let line = '';
  for (const word of words) { if ((line + ' ' + word).trim().length > 30) { lines.push(line); line = word; } else line = (line + ' ' + word).trim(); }
  if (line) lines.push(line);
  const font = lines.length > 4 ? 40 : 48;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7024C4"/><stop offset="1" stop-color="#4C168E"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><text x="64" y="88" font-family="Arial,sans-serif" font-size="25" font-weight="700" fill="#ffffff">AI Company</text><text x="64" y="132" font-family="Arial,sans-serif" font-size="16" letter-spacing="3" fill="#E4CCF5">${esc(String(category).toUpperCase())}</text><text x="64" y="244" font-family="Arial,sans-serif" font-size="${font}" font-weight="700" fill="#ffffff">${lines.slice(0, 7).map((l, i) => `<tspan x="64" dy="${i ? font + 14 : 0}">${esc(l)}</tspan>`).join('')}</text><text x="64" y="574" font-family="Arial,sans-serif" font-size="18" fill="#E4CCF5">Guías para tu negocio · aicompanyco.com</text></svg>`;
}

// ---------- utilidades de archivos ----------
const leerJson = f => JSON.parse(fs.readFileSync(f, 'utf8'));
function escribirJson(f, obj) { // conserva CRLF si el archivo ya lo usaba
  const crlf = fs.existsSync(f) && fs.readFileSync(f, 'utf8').includes('\r\n');
  let out = JSON.stringify(obj, null, 2) + '\n';
  if (crlf) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(f, out);
}
const borradores = dir => fs.readdirSync(path.resolve(dir)).filter(f => f.endsWith('.json')).sort().map(f => ({file: path.join(path.resolve(dir), f), a: leerJson(path.join(path.resolve(dir), f))}));
const POSTS = path.join(ROOT, 'scripts/content/articles.json');

// Agrega la guia a servicios.json por insercion de texto (no reformatea el archivo).
function asignarServicios(a) {
  const f = path.join(__dirname, 'content/servicios.json');
  let s = fs.readFileSync(f, 'utf8');
  for (const svc of a.services) {
    const i = s.indexOf(`"slug": "${svc}"`);
    const j = s.indexOf('"articulos": [', i), k = s.indexOf(']', j);
    if (i < 0 || j < 0 || k < 0) throw new Error('servicio no encontrado: ' + svc);
    if (s.slice(j, k).includes(`"${a.slug}"`)) continue;
    s = s.slice(0, k).replace(/\s*$/, '') + `,\n        "${a.slug}"\n      ` + s.slice(k);
  }
  fs.writeFileSync(f, s);
}

function previewHtml(items, posts) {
  const todos = [...posts, ...items.map(x => x.a)];
  const art = ({a}) => {
    const p = toPost({...a, image: a.image || {src: '/x.png', alt: 'portada', width: 1200, height: 630}}, todos);
    const verificar = (a.verificar || []).length ? `<div class="verificar"><strong>Para la persona que revisa — comprobar antes de aprobar:</strong><ul>${a.verificar.map(v => `<li>${esc(v)}</li>`).join('')}</ul></div>` : '';
    return `<section class="borrador" id="${a.slug}"><p class="etiqueta">BORRADOR · no publicado · servicios: ${esc(a.services.join(', '))} · consulta: ${esc(a.query)}</p><h1>${esc(a.h1)}</h1><p class="desc"><em>Meta descripción (${a.description.length} car.):</em> ${esc(a.description)}</p>${verificar}<article class="prose">${cajaRespuesta(a.answer)}${p.body}</article></section>`;
  };
  const indice = items.map(({a}) => `<li><a href="#${a.slug}">${esc(a.h1)}</a><br><small>${esc(a.query)} · ${wordcount(a)} palabras</small></li>`).join('');
  return `<!doctype html><html lang="es-CO"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Borradores del blog — revisión</title><link rel="stylesheet" href="../../assets/site.css"><style>body{background:#fff;color:#191923;font:16px/1.7 Inter,Arial,sans-serif}.rev{max-width:860px;margin:0 auto;padding:32px 20px}.rev h1{font-size:34px;line-height:1.2;margin:8px 0 12px}.aviso{background:#FEF3C7;border:1px solid #F59E0B;padding:14px 18px;border-radius:10px;margin-bottom:28px}.borrador{border-top:4px solid #7024C4;margin-top:60px;padding-top:24px}.etiqueta{font:700 12px Arial;letter-spacing:.08em;text-transform:uppercase;color:#4C168E}.desc{color:#565664}.verificar{background:#F0E5FA;border-left:4px solid #7024C4;padding:12px 18px;border-radius:8px;margin:16px 0}.respuesta-corta{background:#F0E5FA;border-left:4px solid #7024C4;padding:14px 20px;border-radius:8px;margin:0 0 22px}.respuesta-corta p{margin:6px 0 0}.nota-autoria{font-size:13px;color:#565664;border-top:1px solid #ddd;padding-top:14px}.tabla-guia{overflow-x:auto}.tabla-guia table{border-collapse:collapse;width:100%;font-size:14px}.tabla-guia th,.tabla-guia td{border:1px solid #e6dfed;padding:8px 10px;text-align:left;vertical-align:top}.tabla-guia thead th{background:#F7F8FA}.related-section,.faq-section{margin-top:24px}.faq-item{border-bottom:1px solid #e6dfed;padding:12px 0}.faq-q{cursor:pointer;font-weight:700}.rel-card{display:block;padding:8px 0}</style></head><body><div class="rev"><div class="aviso"><strong>Borradores para revisión.</strong> Nada de esto está publicado. Cada guía lista, en un recuadro, las afirmaciones concretas que hay que comprobar contra la fuente oficial antes de aprobarla.</div><h1>Guías pendientes de aprobación (${items.length})</h1><ol>${indice}</ol>${items.map(art).join('')}</div></body></html>`;
}

function chrome() {
  for (const c of ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe']) if (fs.existsSync(c)) return c;
  throw new Error('No encontré Chrome/Edge para generar las portadas');
}
function portadaHtml(a) {
  const t = a.h1.length > 90 ? 46 : a.h1.length > 70 ? 52 : 58;
  const base = 'file:///' + ROOT.replace(/\\/g, '/');
  return `<!doctype html><html><head><meta charset="utf-8"><style>@font-face{font-family:Manrope;src:url("${base}/assets/fonts/manrope-latin.woff2") format("woff2");font-weight:200 800}*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;overflow:hidden;background:#fff;font-family:Manrope,Arial,sans-serif;position:relative}.bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 100% at 100% 0%,#EBDDF8,rgba(240,229,250,0) 70%)}.bar{position:absolute;left:0;top:0;bottom:0;width:14px;background:linear-gradient(#7024C4,#4C168E)}img{position:absolute;left:70px;top:40px;width:330px}.cat{position:absolute;left:70px;top:178px;font-weight:700;font-size:20px;letter-spacing:.12em;text-transform:uppercase;color:#7024C4}h1{position:absolute;left:70px;top:222px;width:1060px;font-weight:800;font-size:${t}px;line-height:1.12;letter-spacing:-.03em;color:#191923}.pie{position:absolute;left:70px;bottom:36px;font-weight:600;font-size:22px;color:#565664}.pie b{color:#7024C4}</style></head><body><div class="bg"></div><div class="bar"></div><img src="${base}/assets/identity/logo-official.png"><div class="cat">${esc(a.category)}</div><h1>${esc(a.h1)}</h1><div class="pie"><b>aicompanyco.com</b> · Guías para tu negocio</div></body></html>`;
}

if (require.main === module) {
  const [command, arg, ...rest] = process.argv.slice(2);
  const posts = leerJson(POSTS);
  if (command === 'covers') {
    for (const a of posts) { const dir = path.join(ROOT, 'blog', a.slug); fs.mkdirSync(dir, {recursive: true}); fs.writeFileSync(path.join(dir, 'portada.svg'), cover(a.title, a.category)); }
    console.log(`${posts.length} portadas de marca exportadas`);
  } else if (command === 'validate' && arg) {
    validate(leerJson(path.resolve(arg)), posts); console.log('Borrador válido; requiere revisión de fuentes y aprobación.');
  } else if (command === 'validate-all' && arg) {
    const items = borradores(arg), todos = [...posts, ...items.map(x => x.a)];
    let malos = 0;
    for (const {file, a} of items) { try { validate(a, todos.filter(p => p.slug !== a.slug)); console.log('OK   ', path.basename(file), `${wordcount(a)} palabras`); } catch (e) { malos++; console.log('FALLA', path.basename(file)); console.log('     ' + e.message.split('\n').join('\n     ')); } }
    if (malos) { console.error(`${malos} borradores con errores`); process.exit(1); }
    console.log(`${items.length} borradores válidos; requieren revisión de fuentes y aprobación.`);
  } else if (command === 'preview' && arg) {
    const items = borradores(arg), out = path.join(ROOT, '_rediseno/borradores');
    fs.mkdirSync(out, {recursive: true}); fs.writeFileSync(path.join(out, 'index.html'), previewHtml(items, posts));
    console.log(`Vista previa: ${path.join(out, 'index.html')}`);
  } else if (command === 'portadas' && arg) {
    for (const {a} of borradores(arg)) {
      const tmp = path.join(os.tmpdir(), `portada-${a.slug}.html`); fs.writeFileSync(tmp, portadaHtml(a));
      const dest = path.join(ROOT, 'assets/editorial', `${a.slug}.png`);
      const r = spawnSync(chrome(), ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', '--virtual-time-budget=4000', `--screenshot=${dest}`, 'file:///' + tmp.replace(/\\/g, '/')], {stdio: 'ignore'});
      console.log(r.status === 0 && fs.existsSync(dest) ? 'ok   ' : 'FALLA', path.relative(ROOT, dest));
    }
  } else if (command === 'aprobar' && arg && rest[0] && /^\d{4}-\d{2}-\d{2}$/.test(rest[1] || '')) {
    for (const {file, a} of borradores(arg)) {
      Object.assign(a, {status: 'approved', reviewedBy: rest[0], reviewedAt: rest[1], sourceVerified: true,
        image: {src: `/assets/editorial/${a.slug}.png`, alt: `Portada de la guía: ${a.h1}`, width: 1200, height: 630, approved: true, type: 'brand-cover', caption: 'Portada de AI Company CO.', credit: {author: 'AI Company CO', license: 'Imagen propia de AI Company CO'}}});
      fs.writeFileSync(file, JSON.stringify(a, null, 2) + '\n');
    }
    console.log(`Aprobación registrada por ${rest[0]} (${rest[1]}). Revisa el diff antes de publicar.`);
  } else if (['publish', 'publish-all'].includes(command) && arg) {
    const items = command === 'publish' ? [{a: leerJson(path.resolve(arg))}] : borradores(arg);
    const todos = [...posts, ...items.map(x => x.a)];
    for (const {a} of items) validate(a, todos.filter(p => p.slug !== a.slug), {publish: true}); // todo o nada
    const nuevos = items.map(({a}) => toPost(a, todos));
    escribirJson(POSTS, [...posts, ...nuevos]);
    for (const {a} of items) { const dir = path.join(ROOT, 'blog', a.slug); fs.mkdirSync(dir, {recursive: true}); fs.writeFileSync(path.join(dir, 'portada.svg'), cover(a.title, a.category)); asignarServicios(a); }
    console.log(`${items.length} guía(s) incorporada(s). Ejecuta build-site, registrar-seo y check-site antes de publicar.`);
  } else throw new Error('Uso: node scripts/blog-editorial.js validate|validate-all|preview|portadas|aprobar|publish|publish-all|covers');
}
module.exports = {validate, toPost, cover, normalize, wordcount};
