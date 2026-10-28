'use strict';
// SEO + AEO + GEO en el blog. Lee el HTML generado (node scripts/build-site.js).
//   SEO: titulo/descripcion que caben, una consulta por guia, enlazado, sin entidades rotas.
//   AEO: cada guia abre con una respuesta corta y directa, ANTES de la imagen.
//   GEO: fuente de la afirmacion y fecha visibles, interes comercial declarado, llms.txt al dia.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '../..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const articles = require('../content/articles.json');
const SV = require('../content/servicios.json');
const plain = s => String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const guia = a => read(`blog/${a.slug}/index.html`);
const main = h => h.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];

test('AEO: toda guia tiene una respuesta corta de 120 a 520 caracteres, visible', () => {
  for (const a of articles) {
    assert.equal(typeof a.answer, 'string', `${a.slug}: sin answer`);
    assert.ok(a.answer.length >= 120 && a.answer.length <= 520, `${a.slug}: respuesta de ${a.answer.length} caracteres`);
    assert.ok(main(guia(a)).includes('class="respuesta-corta"'), `${a.slug}: la respuesta no se muestra`);
  }
});

test('AEO: la respuesta corta va antes de la imagen: es lo primero que lee un buscador', () => {
  for (const a of articles) {
    const m = main(guia(a)), r = m.indexOf('class="respuesta-corta"'), img = m.indexOf('class="article-visual');
    assert.ok(r > -1 && img > -1 && r < img, `${a.slug}: la respuesta quedo despues de la imagen`);
  }
});

test('SEO: titulo <=62, descripcion 120-158 y sin entidades rotas en toda guia', () => {
  for (const a of articles) {
    assert.ok(plain(a.title).length <= 62, `${a.slug}: titulo de ${plain(a.title).length}`);
    const d = plain(a.description);
    assert.ok(d.length >= 120 && d.length <= 158, `${a.slug}: descripcion de ${d.length}`);
    const head = guia(a).split('</head>')[0];
    assert.doesNotMatch(head, /&amp;(quot|amp|#39|lt|gt);/, `${a.slug}: entidad doblemente escapada en el head`);
  }
});

test('SEO: una consulta por guia: no hay dos que compitan por la misma busqueda', () => {
  const vistas = new Map();
  for (const a of articles) {
    const q = norm(a.query || a.title);
    assert.ok(!vistas.has(q), `${a.slug} repite la consulta de ${vistas.get(q)}`);
    vistas.set(q, a.slug);
  }
});

test('SEO: el filtro del blog es por tema (un maximo de 8 botones), no una categoria por guia', () => {
  const idx = main(read('blog/index.html'));
  const botones = (idx.match(/data-blog-filter=/g) || []).length;
  assert.ok(botones >= 3 && botones <= 8, `${botones} botones de filtro`);
  // Mismo criterio que build-site: el tema de una guia es el PRIMER servicio que la lista.
  const tema = a => (SV.servicios.find(s => s.articulos.includes(a.slug)) || {nombre: 'Otros temas'}).nombre;
  for (const nombre of new Set(articles.map(tema))) assert.ok(idx.includes(`data-blog-filter="${nombre}"`), `falta el filtro ${nombre}`);
});

test('GEO: cada guia muestra su fecha de actualizacion cuando se reviso despues de publicarse', () => {
  for (const a of articles.filter(x => x.modified && x.modified !== x.published))
    assert.match(main(guia(a)), new RegExp('Actualizado ' + a.modified), `${a.slug}: no muestra la fecha de actualizacion`);
});

test('GEO: las guias editoriales nuevas declaran el interes comercial, la fecha de revision y sus fuentes', () => {
  const nuevas = articles.filter(a => a.source === 'editorial-reviewed');
  for (const a of nuevas) {
    const m = main(guia(a));
    assert.match(m, /class="nota-autoria"/, `${a.slug}: sin nota de autoria`);
    assert.match(m, /interés comercial/, `${a.slug}: no declara el interés comercial`);
    assert.match(m, /Última revisión: \d{4}-\d{2}-\d{2}/, `${a.slug}: sin fecha de revisión`);
    assert.match(m, /class="fuentes"/, `${a.slug}: sin fuentes`);
    assert.match(m, /<h2 id="[^"]+">[^<]*\?<\/h2>/, `${a.slug}: ningun encabezado en forma de pregunta`);
  }
});

test('GEO: llms.txt lista los servicios y sus guias, y dice como citar', () => {
  const t = read('llms.txt');
  for (const s of SV.servicios) assert.ok(t.includes('https://aicompanyco.com' + s.ruta), `llms.txt sin ${s.ruta}`);
  assert.match(t, /Cómo citar este sitio/);
  assert.match(t, /interés comercial/);
});
