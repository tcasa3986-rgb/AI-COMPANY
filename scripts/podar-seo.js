#!/usr/bin/env node
/**
 * podar-seo.js — consolida las páginas SEO duplicadas de aicompanyco.com
 *
 * El sitio tiene 6 servicios x (12 ciudades + 15 verticales) = 168 páginas generadas por
 * plantilla, con ~90% de contenido idéntico entre sí (doorway pages). Este script las
 * reemplaza por stubs de redirección hacia la página relevante, porque GitHub Pages no
 * permite 301 del servidor.
 *
 * Por defecto SIMULA. Para ejecutar de verdad: node scripts/podar-seo.js --aplicar
 * Ver _rediseno/PLAN-SEO.md para el razonamiento.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const APLICAR = process.argv.includes('--aplicar');

// Sectores que SÍ tienen un cliente real detrás y se conservan, mudados a /sistemas/.
const SECTORES_CON_RESPALDO = {
  // Camino B (productizar por vertical): estos sectores tienen un cliente real detrás,
  // así que se convierten en landings de producto propias bajo /sistemas/.
  'para-ferreterias': '/sistemas/para-ferreterias/',        // Ferre Láser
  'para-constructoras': '/sistemas/para-constructoras/',    // cliente acero/vidrio/fachadas
  'para-talleres': '/sistemas/para-corte-laser/',           // Ferre Láser + Láser Ejecutivo
  'para-supermercados': '/sistemas/para-distribuidoras/',
  'para-tiendas': '/sistemas/para-distribuidoras/',
  'para-droguerias': '/sistemas/para-distribuidoras/',
};

const CIUDADES_SIN_OPERACION = ['medellin', 'cali', 'barranquilla', 'bucaramanga'];

/** Decide el destino de una URL podada, o null si la página se conserva. */
function destinoDe(rel) {
  const partes = rel.split('/').filter(Boolean);

  // servicios/{servicio}/en-{ciudad}/  ->  servicios/{servicio}/
  if (partes[0] === 'servicios' && partes[2] && partes[2].startsWith('en-')) {
    return `/servicios/${partes[1]}/`;
  }

  // servicios/{servicio}/para-{vertical}/
  if (partes[0] === 'servicios' && partes[2] && partes[2].startsWith('para-')) {
    if (partes[1] === 'apps-empresariales') {
      return SECTORES_CON_RESPALDO[partes[2]] || '/sistemas/';
    }
    return `/servicios/${partes[1]}/`;
  }

  // landings de ciudad sin operación real
  if (partes.length === 1 && CIUDADES_SIN_OPERACION.includes(partes[0])) {
    return '/sistemas/';
  }

  return null; // se conserva
}

function stub(destino, titulo) {
  return `<!DOCTYPE html>
<html lang="es-CO">
<head>
<meta charset="utf-8">
<title>${titulo}</title>
<link rel="canonical" href="https://aicompanyco.com${destino}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${destino}">
<script>window.location.replace(${JSON.stringify(destino)});</script>
</head>
<body>
<p>Esta página se movió. Si no lo redirige automáticamente,
<a href="${destino}">continúe aquí</a>.</p>
</body>
</html>
`;
}

function recorrer(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === '_rediseno') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) recorrer(p, acc);
    else if (e.name === 'index.html') acc.push(p);
  }
  return acc;
}

const paginas = recorrer(RAIZ);
const podadas = [];
const conservadas = [];

for (const abs of paginas) {
  const rel = path.relative(RAIZ, abs).split(path.sep).join('/').replace(/index[.]html$/, '');
  const destino = destinoDe(rel);
  if (destino) podadas.push({ abs, rel: '/' + rel, destino });
  else conservadas.push('/' + rel);
}

// Agrupar para un reporte legible
const porDestino = podadas.reduce((m, p) => {
  (m[p.destino] = m[p.destino] || []).push(p.rel);
  return m;
}, {});

console.log(`\n${APLICAR ? 'APLICANDO' : 'SIMULACIÓN (usá --aplicar para ejecutar)'}\n`);
console.log(`Páginas analizadas : ${paginas.length}`);
console.log(`Se conservan       : ${conservadas.length}`);
console.log(`Se podan           : ${podadas.length}\n`);

for (const [destino, urls] of Object.entries(porDestino).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${String(urls.length).padStart(3)} -> ${destino}`);
}

console.log('\nSe conservan:');
for (const u of conservadas.sort()) console.log(`  ${u}`);

if (APLICAR) {
  let n = 0;
  for (const { abs, destino } of podadas) {
    const titulo = 'Página movida — AI Company CO';
    fs.writeFileSync(abs, stub(destino, titulo), 'utf8');
    n++;
  }
  console.log(`\n${n} páginas reemplazadas por stubs de redirección.`);
  console.log('Revisá con: git diff --stat   ·  Revertí con: git checkout -- .');
} else {
  console.log('\nNada se modificó. Ejecutá con --aplicar cuando Search Console confirme');
  console.log('que ninguna de estas URLs está rankeando de verdad.');
}
