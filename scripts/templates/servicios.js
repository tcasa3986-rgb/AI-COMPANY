'use strict';
// Páginas de servicio y su hub (/servicios/). Todo el contenido sale de
// scripts/content/servicios.json: aquí solo hay estructura HTML.
//
// Regla de honestidad: un servicio sin caso de cliente publicado lo dice. No se
// rellena con casos inventados ni con proyectos que no corresponden. Los casos
// "cercanos" se rotulan como lo que son (producto propio, bot de Telegram...).
const {btn, waUrl, waTexto} = require('./components');
const data = require('../content/servicios.json');
const articles = require('../content/articles.json');
const media = require('../content/media.json').cases;
const clients = require('../content/portfolio-assets.json');

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const servicios = data.servicios;
const hub = data.hub;
const porRuta = Object.fromEntries(servicios.map(s => [s.ruta, s]));
const artPorSlug = Object.fromEntries(articles.map(a => [a.slug, a]));
const plain = s => String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const nombreCliente = n => n === 'Láser Ejecutivo' ? 'JD Metales' : n;

const wa = (texto, label = 'Escribir por WhatsApp') =>
  `<a class="btn outline btn-wa" href="${esc(waUrl(texto))}" target="_blank" rel="noopener">${label}</a>`;

// Migas de pan visibles. El JSON-LD equivalente lo arma page() con options.trail.
const migas = actual => `<nav class="inter-back inter-crumbs" aria-label="Ruta de navegación"><a href="/">Inicio</a> / ${actual === hub.ruta ? 'Servicios' : `<a href="${hub.ruta}">Servicios</a> / ${esc(actual)}`}</nav>`;

function hero(kicker, h, desc, actual, extra = '') {
  return `<section class="inter-hero"><div class="wrap">${migas(actual)}<span class="eyebrow">${esc(kicker)}</span><h1>${h}</h1><p>${desc}</p><div class="actions">${btn('Solicitar diagnóstico')}${extra}</div></div></section>`;
}

function casoCard(c) {
  if (c.tipo === 'cliente') {
    const cli = clients.find(x => x.name === c.cliente), m = media[c.cliente], nombre = nombreCliente(c.cliente);
    return `<article class="srv-case"><figure><img src="${m.src}" width="${m.width}" height="${m.height}" alt="${esc(m.alt)}" loading="lazy"></figure><div class="srv-case-body"><span class="srv-tag">Caso de éxito${c.cliente === 'Láser Ejecutivo' ? ' · proyecto Láser Ejecutivo' : ''}</span><h3>${esc(nombre)}</h3><p><strong>Problema.</strong> ${esc(m.problem)}</p><p><strong>Solución.</strong> ${esc(m.solution)}</p><a class="text-link" href="${cli.href}">Ver el caso completo</a></div></article>`;
  }
  if (c.tipo === 'sitio') {
    const img = `<img src="${c.imagen}" width="1280" height="800" alt="${esc(c.alt)}" loading="lazy">`;
    return `<article class="srv-case"><figure>${c.href ? `<a href="${esc(c.href)}"${c.externo ? ' target="_blank" rel="noopener"' : ''} aria-label="${esc(c.cta)}: ${esc(c.titulo)}">${img}</a>` : img}</figure><div class="srv-case-body"><span class="srv-tag">${esc(c.etiqueta)}</span><h3>${esc(c.titulo)}</h3><p>${esc(c.texto)}</p><span class="srv-estado">${esc(c.estado)}</span>${c.href ? `<a class="text-link" href="${esc(c.href)}"${c.externo ? ' target="_blank" rel="noopener"' : ''}>${esc(c.cta)}</a>` : ''}</div></article>`;
  }
  return `<article class="srv-case srv-case--texto"><div class="srv-case-body"><span class="srv-tag">${esc(c.etiqueta)}</span><h3>${esc(c.titulo)}</h3><p>${esc(c.texto)}</p><a class="text-link" href="${esc(c.href)}">${esc(c.cta)}</a></div></article>`;
}

function casosSeccion(s, H) {
  if (s.casos && s.casos.length) {
    return H.section('Casos de éxito', `${s.etiquetaCasos}: lo que ya está construido.`,
      `<div class="srv-case-grid">${s.casos.map(casoCard).join('')}</div><p class="srv-nota"><a class="text-link" href="/casos/">Ver todos los casos por servicio</a></p>`).replace('<section class="inter-section', '<section id="casos-servicio" class="inter-section');
  }
  const cercanos = (s.cercanos || []).length
    ? `<h3 class="srv-sub">Lo más cercano que sí está documentado</h3><div class="srv-case-grid">${s.cercanos.map(casoCard).join('')}</div>`
    : '';
  return H.section('Casos de éxito', 'Todavía no publicamos un caso de cliente de este servicio.',
    `<p class="inter-lead">Preferimos decírtelo antes que mostrarte uno que no existe. Si quieres ser de los primeros en probarlo, empezamos con un proceso acotado y un diagnóstico inicial gratuito. Y si quieres ver cómo trabajamos, estos son los proyectos que sí podemos mostrar.</p>${cercanos}<div class="actions srv-acciones">${btn('Ver los casos que sí tenemos', '/casos/', 'outline')}${wa(s.wa, 'Consultar por este servicio')}</div>`)
    .replace('<section class="inter-section', '<section id="casos-servicio" class="inter-section');
}

const faqHtml = faq => `<div class="faqs srv-faq">${faq.map(([q, a, href, label]) =>
  `<details><summary>${esc(q)}</summary><p>${esc(a)}</p>${href ? `<p><a class="text-link" href="${esc(href)}">${esc(label)}</a></p>` : ''}</details>`).join('')}</div>`;

const guias = s => {
  const lista = s.articulos.map(sl => artPorSlug[sl]).filter(Boolean);
  return `<div class="srv-guias">${lista.map(a => `<a href="/blog/${a.slug}/"><span>${esc(plain(a.category))}</span><h3>${esc(plain(a.title))}</h3><strong>Leer la guía →</strong></a>`).join('')}</div>`;
};

const otrosServicios = s => `<nav class="srv-otros" aria-label="Otros servicios">${servicios.filter(x => x.ruta !== s.ruta).map(x => `<a href="${x.ruta}">${esc(x.nombre)}</a>`).join('')}<a href="${hub.ruta}">Ver todos los servicios</a></nav>`;

const sectores = s => (s.sectores || []).length
  ? `<div class="actions">${s.sectores.map(([n, sl]) => btn(n, '/sistemas/' + sl + '/', 'outline')).join('')}${btn('Ver todos los sistemas por sector', '/sistemas/', 'outline')}</div>`
  : '';

function servicio(s, h, desc, H) {
  const grid = `<div class="inter-feature-grid">${s.incluye.map(([t, p], i) => `<article><span>0${i + 1}</span><h3>${esc(t)}</h3><p>${esc(p)}</p></article>`).join('')}</div>`;
  const checks = `<ul class="srv-checks">${s.paraQuien.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
  const cierre = H.section('Conversemos sobre tu operación', `¿Quieres revisar ${esc(s.nombre.toLowerCase())} en tu empresa?`,
    `<div class="inter-closing"><p>Cuéntanos cómo trabajas hoy. El diagnóstico inicial es gratuito y sin compromiso de contratación.</p><div class="actions">${btn('Solicitar diagnóstico')}${wa(s.wa)}</div></div>`, 'inter-lavender');
  return hero(s.kicker, h, desc, s.nombre, `<a class="btn outline" href="#casos-servicio">Ver casos de este servicio</a>`) +
    H.section('Punto de partida', 'El punto de partida es tu operación.', `<div class="inter-split"><p>${esc(s.problema)}</p><aside class="inter-quote"><p>Definimos el proceso, los datos y el alcance antes de construir.</p></aside></div>`) +
    H.section('¿Es para ti?', 'Este servicio te sirve si…', checks, 'inter-lavender') +
    H.section('Qué incluye', 'Lo que podemos construir para ti.', grid) +
    casosSeccion(s, H) +
    H.section('Sin rodeos', 'Lo que te diremos de frente.', `<p class="inter-lead">${esc(s.deFrente)}</p>`, 'inter-lavender') +
    H.section('Metodología', 'Del proceso a la solución, por fases.', H.steps()) +
    (s.sectores ? H.section('Por sector', 'Sistemas listos para tu tipo de negocio.', `<p>Si tu negocio es de alguno de estos sectores, ya tenemos una solución de referencia que puedes ver en funcionamiento.</p>${sectores(s)}`, 'inter-lavender') : '') +
    H.section('Preguntas frecuentes', `Preguntas sobre ${esc(s.nombre.toLowerCase())}.`, faqHtml(s.faq), s.sectores ? '' : 'inter-lavender') +
    H.section('Guías', 'Para decidir con información.', guias(s)) +
    H.section('Otros servicios', 'Lo que más se combina con este servicio.', otrosServicios(s), 'inter-lavender') +
    cierre;
}

const conteo = s => {
  if (s.casos && s.casos.length) {
    const n = s.casos.length;
    return s.slug === 'paginas-web' ? `${n} sitios` : n === 1 ? '1 caso documentado' : `${n} casos documentados`;
  }
  return (s.cercanos || []).length ? 'Sin caso de cliente · hay un producto propio relacionado' : 'Sin caso publicado todavía';
};

function hubPagina(h, desc, H) {
  const tarjetas = `<div class="srv-grid">${servicios.map((s, i) => `<a class="srv-card" href="${s.ruta}"><span class="srv-num">0${i + 1}</span><h3>${esc(s.nombre)}</h3><p>${esc(s.resumen)}</p><small>${esc(conteo(s))}</small><strong>Conocer el servicio →</strong></a>`).join('')}</div>`;
  const elegir = [
    ['Mi información está en archivos, chats y cuadernos', 'apps-empresariales'],
    ['Mi equipo repite la misma tarea todos los días', 'automatizacion'],
    ['Mis clientes escriben por WhatsApp todo el día', 'whatsapp-automatico'],
    ['Me hacen las mismas preguntas una y otra vez', 'chatbot-ia'],
    ['Mi equipo pierde tiempo consultando el sistema', 'asistente-ia'],
    ['Mi negocio no aparece cuando lo buscan en Google', 'paginas-web'],
    ['Publico en redes pero no se convierte en ventas', 'marketing-digital']
  ];
  const lista = `<ul class="srv-elegir">${elegir.map(([t, sl]) => { const s = servicios.find(x => x.slug === sl); return `<li><span>${esc(t)}</span><a href="${s.ruta}">${esc(s.nombre)} →</a></li>`; }).join('')}</ul>`;
  const casos = `<div class="srv-grid srv-grid--chicas">
<a class="srv-card" href="/casos/#sistemas-a-medida"><h3>Software a la medida</h3><p>Maderas Montoya, Ferre Láser, JD Metales y ASOERC.</p><strong>4 casos documentados →</strong></a>
<a class="srv-card" href="/casos/#automatizacion"><h3>Automatización</h3><p>Reporte de producción por Telegram en Maderas Montoya.</p><strong>1 caso documentado →</strong></a>
<a class="srv-card" href="/casos/#paginas-web"><h3>Páginas web</h3><p>Los sitios de Maderas Montoya y JD Metales.</p><strong>2 sitios →</strong></a>
<a class="srv-card" href="/casos/#productos-propios"><h3>WhatsApp y asistentes</h3><p>El asistente de WhatsApp de CanchaLibre, un producto propio.</p><strong>1 producto propio →</strong></a></div><p class="srv-nota">Chatbot con IA, asistente de IA y marketing digital todavía no tienen un caso de cliente publicado, y cada una de esas páginas lo dice.</p>`;
  const sect = `<div class="actions">${[['Depósitos de madera', 'para-depositos-de-madera'], ['Corte láser', 'para-corte-laser'], ['Ferreterías', 'para-ferreterias'], ['Reciclaje', 'para-reciclaje'], ['Canchas sintéticas', 'para-canchas-sinteticas'], ['Clubes de póker', 'para-clubes-de-poker']].map(([n, sl]) => btn(n, '/sistemas/' + sl + '/', 'outline')).join('')}</div>`;
  return hero('Servicios', h, desc, hub.ruta, '<a class="btn outline" href="#como-elegir">¿Por dónde empezar?</a>') +
    H.section('Qué hacemos', 'Siete servicios, un mismo método.', `<p class="inter-lead">${esc(hub.intro)}</p>${tarjetas}`) +
    H.section('Cómo elegir', '¿Por dónde empezar?', `<p>Si te identificas con alguna de estas frases, esa es la puerta de entrada.</p>${lista}`, 'inter-lavender').replace('<section class="inter-section', '<section id="como-elegir" class="inter-section') +
    H.section('Casos de éxito por servicio', 'Lo que ya está construido, separado por servicio.', casos) +
    H.section('Por sector', 'Sistemas listos para tu tipo de negocio.', `<p>Además de los servicios, tenemos soluciones de referencia por sector que puedes ver en funcionamiento.</p>${sect}`, 'inter-lavender') +
    H.section('Metodología', 'Del proceso a la solución, por fases.', H.steps()) +
    H.section('Conversemos sobre tu operación', '¿No sabes cuál servicio necesitas?', `<div class="inter-closing"><p>Cuéntanos cómo trabajas hoy y te decimos por dónde empezar. El diagnóstico inicial es gratuito.</p><div class="actions">${btn('Solicitar diagnóstico')}${wa(waTexto(hub.ruta))}</div></div>`, 'inter-lavender');
}

// Bloque para el pie de cada guía del blog: empuja autoridad hacia el servicio
// y le da al lector el siguiente paso.
function servicioDeArticulo(slug) {
  const lista = servicios.filter(s => s.articulos.includes(slug));
  return lista;
}
function bloqueArticulo(slug) {
  const lista = servicioDeArticulo(slug);
  if (!lista.length) return '';
  const [p, ...otros] = lista;
  return `<aside class="post-servicio" aria-label="Servicio relacionado"><span>Servicio relacionado</span><h3>${esc(p.nombre)}</h3><p>${esc(p.resumen)}</p><div class="actions"><a class="text-link" href="${p.ruta}">Conocer ${esc(p.nombre.toLowerCase())}</a>${otros.slice(0, 2).map(o => `<a class="text-link" href="${o.ruta}">${esc(o.nombre)}</a>`).join('')}<a class="text-link" href="/casos/">Ver casos de éxito</a></div></aside>`;
}

function render(route, h, desc, H) {
  if (route === hub.ruta) return hubPagina(h, desc, H);
  const s = porRuta[route];
  return s ? servicio(s, h, desc, H) : null;
}

module.exports = {render, servicios, hub, porRuta, bloqueArticulo, servicioDeArticulo, conteo, casoCard};
