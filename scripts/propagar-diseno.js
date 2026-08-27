#!/usr/bin/env node
/**
 * propagar-diseno.js — lleva el sistema visual nuevo a todo el sitio.
 *
 * Dos operaciones:
 *
 *  1. --limpiar-inline : borra de las 162 páginas secundarias el bloque <style> inline
 *     que define las 21 clases .seo-*. Verificado: las 162 traen EXACTAMENTE el mismo
 *     bloque (una sola variante por hash). Una vez que esas clases viven en shared.css,
 *     el bloque inline solo sirve para pisar el diseño nuevo con el viejo.
 *
 *  2. --instalar-plantillas : copia las plantillas aprobadas de _rediseno/plantillas/
 *     a su ubicación real, ajustando la ruta relativa de shared.css a absoluta.
 *
 * Simula por defecto. Ejecuta con --aplicar.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RAIZ = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const APLICAR = argv.includes('--aplicar');
const LIMPIAR = argv.includes('--limpiar-inline');
const INSTALAR = argv.includes('--instalar-plantillas');
// --solo=a.html,b.html limita la instalación a esas plantillas (para publicar por tandas).
const SOLO = (argv.find(a => a.startsWith('--solo=')) || '').replace('--solo=', '').split(',').filter(Boolean);

if (!LIMPIAR && !INSTALAR) {
  console.log(`
Uso:
  node scripts/propagar-diseno.js --limpiar-inline         (simula)
  node scripts/propagar-diseno.js --limpiar-inline --aplicar
  node scripts/propagar-diseno.js --instalar-plantillas --aplicar

Antes de --limpiar-inline, confirmá que shared.css ya define las clases .seo-*.
`);
  process.exit(1);
}

const rel = p => path.relative(RAIZ, p).split(path.sep).join('/');

function recorrer(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', '_rediseno'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) recorrer(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

console.log(APLICAR ? '\nAPLICANDO\n' : '\nSIMULACIÓN (--aplicar para escribir)\n');

if (LIMPIAR) {
  const css = fs.readFileSync(path.join(RAIZ, 'shared.css'), 'utf8');
  const faltantes = ['seo-section', 'seo-faq-item', 'seo-step-num', 'seo-btn', 'seo-cta-box']
    .filter(c => !css.includes('.' + c));

  if (faltantes.length) {
    console.error('ABORTADO: shared.css todavía no define ' + faltantes.join(', '));
    console.error('Si se borra el bloque inline ahora, las 162 páginas quedan sin estilos.');
    process.exit(1);
  }

  const variantes = new Map();
  const objetivo = [];

  for (const abs of recorrer(RAIZ)) {
    const html = fs.readFileSync(abs, 'utf8');
    if (!html.includes('shared.css')) continue;
    const m = html.match(/[ \t]*<style[^>]*>[\s\S]*?<[/]style>\s*/);
    if (!m) continue;
    if (!/[.]seo-/.test(m[0])) continue; // solo el bloque de componentes SEO
    const k = crypto.createHash('md5').update(m[0]).digest('hex').slice(0, 8);
    variantes.set(k, (variantes.get(k) || 0) + 1);
    objetivo.push({ abs, html, bloque: m[0] });
  }

  console.log(`Páginas con bloque .seo-* inline : ${objetivo.length}`);
  console.log(`Variantes distintas del bloque   : ${variantes.size}`);
  for (const [k, n] of variantes) console.log(`   ${String(n).padStart(4)}  [${k}]`);

  const ahorro = objetivo.reduce((s, o) => s + Buffer.byteLength(o.bloque, 'utf8'), 0);
  console.log(`\nCSS duplicado que se elimina     : ${(ahorro / 1024).toFixed(1)} KB en total`);
  console.log(`Por página                       : ${(ahorro / objetivo.length / 1024).toFixed(1)} KB`);

  if (APLICAR) {
    for (const { abs, html, bloque } of objetivo) {
      fs.writeFileSync(abs, html.replace(bloque, '\n'), 'utf8');
    }
    console.log(`\n${objetivo.length} páginas limpiadas.`);
  }
}

if (INSTALAR) {
  const DESTINOS = {
    'home.html': 'index.html',
    'sistemas.html': 'sistemas/index.html',
    'vertical-madera.html': 'sistemas/para-depositos-de-madera/index.html',
    'vertical-corte-laser.html': 'sistemas/para-corte-laser/index.html',
    'vertical-ferreterias.html': 'sistemas/para-ferreterias/index.html',
    'vertical-reciclaje.html': 'sistemas/para-reciclaje/index.html',
    'casos.html': 'casos/index.html',
    'precios.html': 'precios/index.html',
    'contacto.html': 'contacto/index.html',
  };

  const dirPlantillas = path.join(RAIZ, '_rediseno', 'plantillas');
  for (const [origen, destino] of Object.entries(DESTINOS)) {
    if (SOLO.length && !SOLO.includes(origen)) continue;
    const src = path.join(dirPlantillas, origen);
    if (!fs.existsSync(src)) { console.log(`  falta   ${origen}`); continue; }

    let html = fs.readFileSync(src, 'utf8')
      .replace(/href="(?:[.][.][/])+shared[.]css"/g, 'href="/shared.css"');

    const dst = path.join(RAIZ, destino);
    console.log(`  ${fs.existsSync(dst) ? 'reemplaza' : 'crea     '}  ${destino}`);
    if (APLICAR) {
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.writeFileSync(dst, html, 'utf8');
    }
  }
  console.log('\nRecordá: articulo.html no se instala, la consume scripts/generate-blog.js');
}
