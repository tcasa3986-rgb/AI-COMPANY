#!/usr/bin/env node
/**
 * analizar-gsc.js — cruza el export de Search Console contra las páginas del sitio
 * para decidir la poda con datos, no con opinión.
 *
 * Codex objetó, con razón, que proponer eliminar 166 páginas sin datos era ir a ciegas:
 * "que sean 88-94% idénticas es señal de riesgo SEO, no prueba de que no producen leads".
 * Este script aplica los criterios que acordamos, ya con el export en la mano.
 *
 * Criterios (definidos ANTES de mirar los datos, como pidió Codex):
 *   - Se conserva si tiene impresiones por consultas comerciales, aunque no tenga clics.
 *   - Se conserva si es página de núcleo (home, blog, legales, sistemas).
 *   - Se poda si tiene cero impresiones en el periodo.
 *   - Se poda si tiene impresiones residuales (< UMBRAL) y es una combinación duplicada.
 *
 *   node scripts/analizar-gsc.js <carpeta-del-export>
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const DIR = process.argv[2];
const UMBRAL = 5; // impresiones mínimas en 3 meses para considerar que una URL vive

if (!DIR || !fs.existsSync(DIR)) {
  console.error('Uso: node scripts/analizar-gsc.js <carpeta con el export de Search Console>');
  process.exit(1);
}

// --- 1. Leer el export -------------------------------------------------------
const archivo = fs.readdirSync(DIR).find(f => /gina/i.test(f) && f.endsWith('.csv'));
if (!archivo) { console.error('No encontré el CSV de Páginas en ' + DIR); process.exit(1); }

const filas = fs.readFileSync(path.join(DIR, archivo), 'utf8')
  .replace(/^﻿/, '').split(/\r?\n/).filter(Boolean).slice(1);

const datos = new Map(); // ruta -> {clics, impresiones}
for (const linea of filas) {
  const c = linea.split(',');
  const ruta = (c[0] || '').replace(/^https:\/\/(www\.)?aicompanyco\.com/, '') || '/';
  datos.set(ruta, { clics: +c[1] || 0, impresiones: +c[2] || 0 });
}

// --- 2. Inventariar las páginas reales --------------------------------------
function recorrer(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', '_rediseno'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) recorrer(p, acc);
    else if (e.name === 'index.html') acc.push(p);
  }
  return acc;
}

const NUCLEO = /^\/(|blog\/|sistemas\/|casos\/|precios\/|contacto\/|area\/|soluciones\/|politica-de-privacidad\/|terminos-y-condiciones\/|tratamiento-de-datos\/|automatizacion-de-procesos-empresariales\/)$/;
const DUPLICADA = /^\/servicios\/[a-z-]+\/(en|para)-[a-z-]+\/$/;

const paginas = recorrer(RAIZ).map(abs => {
  const ruta = '/' + path.relative(RAIZ, abs).split(path.sep).join('/').replace(/index\.html$/, '');
  const d = datos.get(ruta) || { clics: 0, impresiones: 0 };
  return { ruta, ...d };
});

// --- 3. Aplicar los criterios ------------------------------------------------
const decidir = p => {
  if (NUCLEO.test(p.ruta)) return 'conservar (núcleo)';
  if (p.ruta.startsWith('/blog/')) return 'conservar (contenido propio)';
  if (p.impresiones >= UMBRAL) return 'conservar (tiene demanda)';
  if (p.clics > 0) return 'conservar (generó clic)';
  if (DUPLICADA.test(p.ruta)) return 'podar (duplicada, sin demanda)';
  if (p.impresiones === 0) return 'podar (cero impresiones)';
  return 'revisar';
};

const grupos = {};
for (const p of paginas) (grupos[decidir(p)] ||= []).push(p);

// --- 4. Reporte --------------------------------------------------------------
const total = paginas.length;
const conImpresiones = paginas.filter(p => p.impresiones > 0).length;

console.log(`\nExport: ${archivo}`);
console.log(`Páginas en el sitio           : ${total}`);
console.log(`Con alguna impresión (3 meses): ${conImpresiones}`);
console.log(`Con CERO impresiones          : ${total - conImpresiones}  (${Math.round((total - conImpresiones) / total * 100)}%)`);
console.log(`Impresiones totales           : ${paginas.reduce((s, p) => s + p.impresiones, 0)}`);
console.log(`Clics totales                 : ${paginas.reduce((s, p) => s + p.clics, 0)}\n`);

for (const [decision, lista] of Object.entries(grupos).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${decision}: ${lista.length}`);
  if (decision.startsWith('conservar') || decision === 'revisar') {
    for (const p of lista.sort((a, b) => b.impresiones - a.impresiones)) {
      console.log(`   ${String(p.impresiones).padStart(4)} impr ${String(p.clics).padStart(2)} clics  ${p.ruta}`);
    }
  }
  console.log();
}

// --- 5. Lista de poda, para alimentar podar-seo.js ---------------------------
const podar = paginas.filter(p => decidir(p).startsWith('podar')).map(p => p.ruta);
const salida = path.join(RAIZ, '_rediseno', 'urls-a-podar.json');
if (fs.existsSync(path.dirname(salida))) {
  fs.writeFileSync(salida, JSON.stringify(podar, null, 2) + '\n');
  console.log(`Lista de ${podar.length} URLs a podar escrita en _rediseno/urls-a-podar.json`);
}
