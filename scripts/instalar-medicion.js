#!/usr/bin/env node
/**
 * instalar-medicion.js — instala Search Console + Google Analytics 4 en todo el sitio.
 *
 * Hoy el sitio no tiene NADA de analítica: ni GA, ni GTM, ni verificación de Search
 * Console (la única etiqueta existente está en cliente-original.html, que no está
 * enlazado). Sin esto no hay forma de saber qué páginas traen clientes.
 *
 *   node scripts/instalar-medicion.js --gsc=TOKEN --ga=G-XXXXXXXXXX
 *   node scripts/instalar-medicion.js --gsc=TOKEN --ga=G-XXXX --aplicar
 *
 * Es idempotente: si la etiqueta ya está, no la duplica.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const args = Object.fromEntries(
  process.argv.slice(2).filter(a => a.startsWith('--')).map(a => {
    const [k, ...v] = a.replace(/^--/, '').split('=');
    return [k, v.join('=') || true];
  })
);

const GSC = typeof args.gsc === 'string' ? args.gsc : null;
const GA = typeof args.ga === 'string' ? args.ga : null;
const APLICAR = !!args.aplicar;

if (!GSC && !GA) {
  console.log(`
Faltan los identificadores. Se obtienen así:

  Search Console  search.google.com/search-console -> agregar aicompanyco.com
                  -> verificar por "etiqueta HTML" -> copiar el valor de content="..."

  Analytics 4     analytics.google.com -> crear propiedad -> flujo de datos web
                  -> copiar el ID de medición (empieza por G-)

Después:
  node scripts/instalar-medicion.js --gsc=TOKEN --ga=G-XXXXXXXXXX
`);
  process.exit(1);
}

const etiquetaGSC = GSC ? `<meta name="google-site-verification" content="${GSC}">` : '';
const etiquetaGA = GA ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}');</script>` : '';

function recorrer(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', '_rediseno'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) recorrer(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const paginas = recorrer(RAIZ);
let tocadas = 0, saltadas = 0, sinHead = 0;

for (const abs of paginas) {
  let html = fs.readFileSync(abs, 'utf8');
  const original = html;

  // No medir los stubs de redirección: inflan las páginas vistas con rebotes falsos.
  if (/http-equiv="refresh"/i.test(html)) { saltadas++; continue; }

  let inyectar = '';
  if (GSC && !html.includes('name="google-site-verification"')) inyectar += '\n' + etiquetaGSC;
  if (GA && !html.includes(`gtag/js?id=${GA}`)) inyectar += '\n' + etiquetaGA;

  if (!inyectar) { saltadas++; continue; }

  const m = html.match(/<head[^>]*>/i);
  if (!m) { sinHead++; continue; }

  html = html.replace(m[0], m[0] + inyectar);
  if (html !== original) {
    tocadas++;
    if (APLICAR) fs.writeFileSync(abs, html, 'utf8');
  }
}

console.log(`\n${APLICAR ? 'APLICADO' : 'SIMULACIÓN (usá --aplicar para escribir)'}`);
console.log(`  Search Console : ${GSC ? 'sí' : 'no'}`);
console.log(`  Analytics 4    : ${GA || 'no'}`);
console.log(`\n  HTML encontrados       : ${paginas.length}`);
console.log(`  Se modifican           : ${tocadas}`);
console.log(`  Ya lo tenían / stubs   : ${saltadas}`);
if (sinHead) console.log(`  Sin <head> (revisar)   : ${sinHead}`);
