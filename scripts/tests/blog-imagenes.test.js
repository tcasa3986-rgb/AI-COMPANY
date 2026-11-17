'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const {validate, toPost} = require('../blog-editorial');
const IMG = require('../blog-imagenes');
const {esquema} = require('../generate-blog');
const ROOT = path.resolve(__dirname, '../..');
const existing = [{slug: 'guia-inventario', title: 'Inventario para un negocio de materiales', query: 'inventario por material'}, {slug: 'guia-pedidos', title: 'Seguimiento de pedidos para empresas'}];
const par = 'La operación necesita registrar el material disponible, el responsable del movimiento y la fecha del pedido. Cada etapa debe conservar el contexto para que el equipo pueda revisar la información. ';
const plan = () => ({portada: {prompt: 'A small robot at a desk connected to a calendar', alt: 'Ilustración de un robot junto a un calendario', caption: 'Un robot que ayuda a organizar.'}, interiores: [
  {antesDeH2: 2, prompt: 'A checklist with a magnifying glass on top', alt: 'Ilustración de una lista con una lupa', caption: 'Revisa con la misma lista.'},
  {antesDeH2: 4, prompt: 'A calendar with highlighted days and a gauge', alt: 'Ilustración de un calendario con un medidor', caption: 'Avanza por etapas.'}]});
function draft(slug) {
  return {slug, title: 'Cotizaciones con contexto para empresas de materiales', description: 'Cómo organizar la información de una cotización de materiales y conectar disponibilidad, responsables y seguimiento sin repetir registros.', h1: 'Cómo organizar una cotización de materiales con contexto', query: 'organizar cotizaciones de materiales ' + slug, category: 'Operación empresarial', answer: 'Una cotización de materiales con contexto reúne en un solo registro la disponibilidad, el responsable y el seguimiento, de modo que nadie tenga que repetir datos.', services: ['apps-empresariales'], published: '2026-11-09', intro: par.repeat(2).trim(), sections: Array.from({length: 4}, (_, i) => ({heading: `Etapa ${i + 1} del trabajo`, text: par.repeat(5)})), faq: [1, 2, 3].map(i => ({question: `¿Pregunta ${i}?`, answer: par})), related: ['guia-inventario', 'guia-pedidos'], sources: [{title: 'Google', url: 'https://developers.google.com/search'}], status: 'approved', reviewedBy: 'Cristian Gutierrez', reviewedAt: '2026-11-09', sourceVerified: true};
}
// archivos de prueba en assets/editorial (se borran siempre)
function conArchivos(slug, tipos, fn) {
  const rutas = tipos.map(t => path.join(ROOT, IMG.rutaImagen(slug, t).slice(1)));
  try { rutas.forEach(f => fs.writeFileSync(f, 'x')); fn(); } finally { rutas.forEach(f => fs.rmSync(f, {force: true})); }
}

test('las figuras se colocan antes del H2 pedido y en el orden correcto', () => {
  conArchivos('zz-prueba-fig', [1, 2], () => {
    const body = '<p>intro</p><h2 id="a">A</h2><p>a</p><h2 id="b">B</h2><p>b</p><h2 id="c">C</h2><p>c</p><h2 id="d">D</h2><p>d</p>';
    const out = IMG.insertarFiguras(body, 'zz-prueba-fig', plan());
    const pos = s => out.indexOf(s);
    assert.ok(pos('data-fig="1"') > pos('id="a"') && pos('data-fig="1"') < pos('id="b"'), 'la 1 va antes del H2 nº2');
    assert.ok(pos('data-fig="2"') > pos('id="c"') && pos('data-fig="2"') < pos('id="d"'), 'la 2 va antes del H2 nº4');
  });
});
test('insertar figuras es idempotente: correrlo dos veces no las duplica', () => {
  conArchivos('zz-prueba-fig', [1, 2], () => {
    const body = '<h2 id="a">A</h2><p>a</p><h2 id="b">B</h2><p>b</p><h2 id="c">C</h2><p>c</p>';
    const p = {...plan(), interiores: [{...plan().interiores[0], antesDeH2: 2}, {...plan().interiores[1], antesDeH2: 3}]};
    const una = IMG.insertarFiguras(body, 'zz-prueba-fig', p), dos = IMG.insertarFiguras(una, 'zz-prueba-fig', p);
    assert.equal(una, dos); assert.equal((dos.match(/class="fig-ia"/g) || []).length, 2);
  });
});
test('una figura sin archivo no se inserta (nunca enlaza una imagen inexistente)', () => {
  const body = '<h2 id="a">A</h2><p>a</p><h2 id="b">B</h2><p>b</p>';
  assert.equal(IMG.insertarFiguras(body, 'zz-no-existe', plan()), body);
});
test('un antesDeH2 fuera de rango falla fuerte en vez de perder la imagen', () => {
  conArchivos('zz-prueba-fig', [1], () => assert.throws(() => IMG.insertarFiguras('<h2 id="a">A</h2><p>a</p>', 'zz-prueba-fig', {interiores: [{...plan().interiores[0], antesDeH2: 5}]}), /solo tiene 1 H2/));
});
test('cada figura declara que es una ilustración generada con IA y trae texto alternativo', () => {
  const html = IMG.figuraHtml('zz', 1, plan().interiores[0]);
  assert.match(html, /Ilustración generada con IA/); assert.match(html, /alt="Ilustración de una lista con una lupa"/); assert.match(html, /loading="lazy"/);
  assert.match(IMG.CREDITO.license, /generada con IA/);
});
test('el estilo común prohíbe texto y logos dentro de la imagen', () => assert.match(IMG.ESTILO, /No text, no letters[^.]*no logos/));
test('toPost mete las figuras del plan en el cuerpo de una guía nueva', () => {
  conArchivos('zz-guia-nueva', ['portada', 1, 2], () => {
    const d = draft('zz-guia-nueva'); d.imagenes = plan(); d.image = IMG.imagenPortada('zz-guia-nueva', d.imagenes);
    const p = toPost(d, existing);
    assert.equal((p.body.match(/class="fig-ia"/g) || []).length, 2);
    assert.equal(p.cover, '/assets/editorial/zz-guia-nueva-portada.jpg'); assert.equal(p.imageType, 'ai-illustration');
  });
});
test('un borrador con plan de imágenes mal formado se rechaza', () => {
  const d = draft('zz-guia-mala'); d.imagenes = plan(); d.imagenes.interiores[0].antesDeH2 = 9;
  assert.throws(() => validate(d, existing), /antesDeH2/);
  const e = draft('zz-guia-mala2'); e.imagenes = plan(); delete e.imagenes.portada.alt;
  assert.throws(() => validate(e, existing), /imagenes\.portada/);
  const ok = draft('zz-guia-ok'); ok.imagenes = plan(); assert.doesNotThrow(() => validate(ok, existing));
});
test('el generador automático pide exactamente lo que el validador exige', () => {
  const {schema} = esquema([{slug: 'a', title: 'a', query: 'a'}], 'tema', [{title: 't', url: 'https://x.com'}]);
  for (const k of ['slug', 'title', 'description', 'h1', 'query', 'category', 'answer', 'intro', 'services', 'sections', 'faq', 'related', 'imagenes', 'verificar']) assert.ok(k in schema, `falta ${k} en el esquema del generador`);
  assert.ok(schema.imagenes.portada && schema.imagenes.interiores.length >= 1);
});
test('todas las guías con plan tienen alt, pie y prompt en el plan', () => {
  const plan_ = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/content/blog-imagenes.json'), 'utf8'));
  for (const [slug, p] of Object.entries(plan_)) {
    if (slug.startsWith('_')) continue;
    assert.ok(p.portada.alt.length >= 15 && p.portada.caption.length >= 10, slug);
    assert.ok(Array.isArray(p.interiores), slug); // las guias antiguas pueden llevar solo portada
    for (const it of p.interiores) assert.ok(it.prompt.length >= 20 && it.alt.length >= 15 && Number.isInteger(it.antesDeH2), slug);
  }
});
