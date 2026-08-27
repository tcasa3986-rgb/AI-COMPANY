#!/usr/bin/env node
/**
 * completar-seo-head.js — asegura que cada página tenga el <head> de SEO completo.
 *
 * Las plantillas del rediseño se construyeron centradas en el diseño y quedaron sin
 * canonical, Open Graph, Twitter Card, robots ni favicon. La home vieja sí los tenía, así
 * que publicar sin esto sería un retroceso: sin Open Graph, cualquier enlace compartido
 * por WhatsApp — que es el canal principal de este negocio — sale sin título ni imagen.
 *
 * Deriva el canonical de la ruta del archivo, y el título y la descripción de la propia
 * página. No inventa nada: si a una página le falta <title> o meta description, lo avisa
 * en vez de rellenarlo.
 *
 *   node scripts/completar-seo-head.js                    (simula, todo el sitio)
 *   node scripts/completar-seo-head.js --aplicar
 *   node scripts/completar-seo-head.js --solo=index.html,sistemas/index.html --aplicar
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const BASE = 'https://aicompanyco.com';
const OG_IMAGE = `${BASE}/logo_MASTER.png`; // TODO: reemplazar por una imagen 1200x630 propia
const APLICAR = process.argv.includes('--aplicar');
const SOLO = (process.argv.find(a => a.startsWith('--solo=')) || '')
  .replace('--solo=', '').split(',').filter(Boolean);

const ORGANIZACION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Company CO',
  url: BASE,
  logo: `${BASE}/logo_MASTER.png`,
  email: 'agencia@aicompanyco.com',
  telephone: '+573212674754',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Soacha',
    addressRegion: 'Cundinamarca',
    addressCountry: 'CO',
  },
  areaServed: 'CO',
  slogan: 'Sistemas a la medida que operan su empresa',
};

function recorrer(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', '_rediseno'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) recorrer(p, acc);
    else if (e.name === 'index.html') acc.push(p);
  }
  return acc;
}

const rel = abs => path.relative(RAIZ, abs).split(path.sep).join('/');
const urlDe = r => `${BASE}/${r.replace(/index\.html$/, '')}`;
const escapar = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

let tocadas = 0, saltadas = 0;
const problemas = [];
const paginas = SOLO.length
  ? SOLO.map(s => path.join(RAIZ, s)).filter(fs.existsSync)
  : recorrer(RAIZ);

for (const abs of paginas) {
  const r = rel(abs);
  let html = fs.readFileSync(abs, 'utf8');

  // Los stubs de redirección no llevan SEO: se marcan noindex a propósito.
  if (/http-equiv="refresh"/i.test(html)) { saltadas++; continue; }

  const titulo = (html.match(/<title>([^<]*)<\/title>/i) || [])[1];
  const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1];

  if (!titulo || !desc) {
    problemas.push(`${r}: falta ${!titulo ? '<title>' : ''}${!titulo && !desc ? ' y ' : ''}${!desc ? 'meta description' : ''}`);
    continue;
  }

  const canonical = urlDe(r);
  const esHome = r === 'index.html';
  const añadir = [];

  const falta = t => !html.includes(t);

  if (falta('rel="canonical"')) añadir.push(`<link rel="canonical" href="${canonical}">`);
  if (falta('name="robots"')) añadir.push(`<meta name="robots" content="index,follow">`);
  if (falta('rel="icon"')) añadir.push(`<link rel="icon" href="/favicon.svg" type="image/svg+xml">`);

  if (falta('property="og:title"')) {
    añadir.push(
      `<meta property="og:type" content="website">`,
      `<meta property="og:site_name" content="AI Company CO">`,
      `<meta property="og:locale" content="es_CO">`,
      `<meta property="og:url" content="${canonical}">`,
      `<meta property="og:title" content="${escapar(titulo)}">`,
      `<meta property="og:description" content="${escapar(desc)}">`,
      `<meta property="og:image" content="${OG_IMAGE}">`
    );
  }

  if (falta('name="twitter:card"')) {
    añadir.push(
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:title" content="${escapar(titulo)}">`,
      `<meta name="twitter:description" content="${escapar(desc)}">`,
      `<meta name="twitter:image" content="${OG_IMAGE}">`
    );
  }

  if (esHome && falta('"Organization"')) {
    añadir.push(`<script type="application/ld+json">${JSON.stringify(ORGANIZACION)}</script>`);
  }

  if (!añadir.length) { saltadas++; continue; }

  const cierre = html.match(/<\/head>/i);
  if (!cierre) { problemas.push(`${r}: sin </head>`); continue; }

  html = html.replace(cierre[0], '  ' + añadir.join('\n  ') + '\n' + cierre[0]);
  tocadas++;
  if (APLICAR) fs.writeFileSync(abs, html, 'utf8');
}

console.log(APLICAR ? '\nAPLICANDO\n' : '\nSIMULACIÓN (--aplicar para escribir)\n');
console.log(`  Páginas revisadas   : ${paginas.length}`);
console.log(`  Se completan        : ${tocadas}`);
console.log(`  Ya estaban / stubs  : ${saltadas}`);
if (problemas.length) {
  console.log(`\n  Requieren atención manual (${problemas.length}):`);
  for (const p of problemas.slice(0, 12)) console.log(`    - ${p}`);
  if (problemas.length > 12) console.log(`    ... y ${problemas.length - 12} más`);
}
