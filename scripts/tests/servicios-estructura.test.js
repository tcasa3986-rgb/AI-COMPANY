'use strict';
// Arquitectura por servicios: hub, siete paginas, casos por servicio, boton de contacto,
// enlazado interno y honestidad de los casos. Lee el HTML ya generado (node scripts/build-site.js).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '../..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const SV = require('../content/servicios.json');
const manifest = require('../content/pages-manifest.json');
const articles = require('../content/articles.json');
const clients = require('../content/portfolio-assets.json');
const media = require('../content/media.json').cases;

const archivo = ruta => ruta === '/' ? 'index.html' : ruta.slice(1) + 'index.html';
const main = html => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
const texto = s => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const indexables = manifest.filter(p => !p.noindex);
const rutasServicio = SV.servicios.map(s => s.ruta);
const jsonld = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => JSON.parse(m[1])['@graph']);

test('el hub y las siete paginas de servicio existen, son indexables y estan en el sitemap', () => {
  assert.equal(SV.servicios.length, 7);
  const sitemap = read('sitemap-main.xml');
  for (const ruta of [SV.hub.ruta, ...rutasServicio]) {
    const p = manifest.find(x => x.route === ruta);
    assert.ok(p, `${ruta} no esta en el manifiesto`);
    assert.equal(p.noindex, false, `${ruta} no debe ser noindex`);
    assert.ok(sitemap.includes(`<loc>https://aicompanyco.com${ruta}</loc>`), `${ruta} no esta en el sitemap`);
  }
});

test('titulo y descripcion de cada servicio caben en lo que Google muestra, y no se repiten', () => {
  const vistos = new Set();
  for (const s of [SV.hub, ...SV.servicios]) {
    const titulo = `${s.titulo} | AI Company CO`;
    assert.ok(titulo.length <= 62, `${s.ruta}: titulo de ${titulo.length} caracteres`);
    assert.ok(s.descripcion.length >= 120 && s.descripcion.length <= 158, `${s.ruta}: descripcion de ${s.descripcion.length} caracteres`);
    for (const v of [titulo, s.descripcion, s.h1]) { assert.ok(!vistos.has(v), `texto repetido: ${v}`); vistos.add(v); }
  }
});

test('cada pagina de servicio tiene un H1, contenido sustancioso, casos, preguntas y llamada a la accion', () => {
  for (const ruta of rutasServicio) {
    const html = read(archivo(ruta)), cuerpo = main(html);
    assert.equal((cuerpo.match(/<h1[ >]/g) || []).length, 1, `${ruta}: debe haber un solo H1`);
    assert.ok(texto(cuerpo).split(' ').length >= 500, `${ruta}: contenido delgado`);
    assert.ok(cuerpo.includes('id="casos-servicio"'), `${ruta}: falta la seccion de casos`);
    assert.ok((cuerpo.match(/<details>/g) || []).length >= 3, `${ruta}: faltan preguntas frecuentes`);
    assert.ok(cuerpo.includes(`href="${SV.hub.ruta}"`), `${ruta}: no enlaza al hub`);
    assert.match(cuerpo, /href="\/contacto\/"/, `${ruta}: falta el boton de diagnostico`);
  }
});

test('honestidad: un servicio sin caso de cliente lo dice; uno con casos no lo dice', () => {
  for (const s of SV.servicios) {
    const cuerpo = main(read(archivo(s.ruta)));
    const dice = cuerpo.includes('Todavía no publicamos un caso de cliente');
    assert.equal(dice, s.casos.length === 0, `${s.ruta}: ${s.casos.length} casos pero ${dice ? 'dice' : 'no dice'} que no hay`);
  }
});

test('los casos que muestra cada servicio son proyectos reales documentados', () => {
  for (const s of SV.servicios) for (const c of s.casos) {
    if (c.tipo === 'cliente') {
      assert.ok(clients.find(x => x.name === c.cliente), `${s.slug}: cliente desconocido ${c.cliente}`);
      assert.ok(media[c.cliente], `${s.slug}: sin captura de ${c.cliente}`);
    } else if (c.tipo === 'sitio') {
      assert.ok(fs.existsSync(path.join(ROOT, c.imagen.slice(1))), `${s.slug}: falta la imagen ${c.imagen}`);
      assert.ok(c.estado, `${s.slug}: un sitio debe declarar su estado`);
    }
    if (c.href && c.href.startsWith('/')) {
      const ruta = c.href.split('#')[0];
      assert.ok(manifest.some(p => p.route === ruta), `${s.slug}: enlace roto ${c.href}`);
    }
  }
});

test('todas las preguntas y guias de los servicios apuntan a paginas que existen', () => {
  const slugs = new Set(articles.map(a => a.slug));
  for (const s of SV.servicios) {
    for (const a of s.articulos) assert.ok(slugs.has(a), `${s.slug}: guia inexistente ${a}`);
    for (const [, , href] of s.faq) {
      if (!href || href.startsWith('#')) continue;
      assert.ok(manifest.some(p => p.route === href), `${s.slug}: enlace roto en una pregunta: ${href}`);
    }
  }
});

test('los siete servicios salen en el menu y en el pie de cualquier pagina', () => {
  for (const f of ['index.html', 'contacto/index.html', 'blog/seo-local-colombia-guia/index.html', 'sistemas/para-corte-laser/index.html', 'casos/index.html']) {
    const html = read(f);
    const header = html.match(/<header[\s\S]*?<\/header>/)[0], footer = html.match(/<footer[\s\S]*?<\/footer>/)[0];
    for (const ruta of [SV.hub.ruta, ...rutasServicio]) {
      assert.ok(header.includes(`href="${ruta}"`), `${f}: el menu no enlaza ${ruta}`);
      if (ruta !== SV.hub.ruta) assert.ok(footer.includes(`href="${ruta}"`), `${f}: el pie no enlaza ${ruta}`);
    }
  }
});

test('el boton de WhatsApp esta en todas las paginas indexables, con mensaje precargado y el numero vigente', () => {
  for (const p of indexables) {
    const html = read(p.file);
    const m = html.match(/<a class="fab-contact" href="([^"]+)"/);
    assert.ok(m, `${p.route}: falta el boton de contacto`);
    assert.match(m[1], /^https:\/\/wa\.me\/573224807767\?text=/, `${p.route}: WhatsApp mal formado`);
    assert.ok(decodeURIComponent(m[1].split('text=')[1]).length > 20, `${p.route}: mensaje vacio`);
    assert.doesNotMatch(html, /573212674754|321 267 4754/, `${p.route}: aparece el numero anterior`);
  }
  // El mensaje cambia segun la pagina: quien responde sabe de donde viene.
  const msg = r => decodeURIComponent(read(archivo(r)).match(/fab-contact" href="[^"]*text=([^"]+)"/)[1]);
  assert.notEqual(msg('/servicios/chatbot-ia/'), msg('/servicios/paginas-web/'));
  assert.match(msg('/servicios/chatbot-ia/'), /chatbots? con IA/i);
});

test('toda pagina indexable tiene imagen para compartir', () => {
  assert.ok(fs.existsSync(path.join(ROOT, 'assets/identity/og-default.png')));
  for (const p of indexables) assert.match(read(p.file), /property="og:image" content="https:\/\/aicompanyco\.com\/[^"]+"/, `${p.route}: sin og:image`);
});

test('las migas de pan de un servicio son Inicio > Servicios > servicio', () => {
  for (const s of SV.servicios) {
    const bc = jsonld(read(archivo(s.ruta))).find(x => x['@type'] === 'BreadcrumbList');
    assert.deepEqual(bc.itemListElement.map(i => i.name), ['Inicio', 'Servicios', s.nombre], s.ruta);
    assert.equal(bc.itemListElement[1].item, 'https://aicompanyco.com' + SV.hub.ruta);
  }
  const hub = jsonld(read('servicios/index.html'));
  assert.equal(hub.find(x => x['@type'] === 'ItemList').itemListElement.length, 7);
});

test('cada guia del blog esta asignada a un servicio y lo enlaza al final', () => {
  const asignados = new Set(SV.servicios.flatMap(s => s.articulos));
  for (const a of articles) {
    assert.ok(asignados.has(a.slug), `la guia ${a.slug} no pertenece a ningun servicio`);
    const cuerpo = main(read(`blog/${a.slug}/index.html`));
    assert.ok(cuerpo.includes('class="post-servicio"'), `${a.slug}: sin bloque de servicio relacionado`);
  }
});

test('ningun servicio ni la portada prometen resultados, cifras ni experiencia que no se puedan probar', () => {
  const prohibido = /\b(l[ií]deres?|n[úu]mero\s*1|garantizamos|resultados garantizados|\d+\s*años de experiencia|premiad[oa])\b/i;
  for (const ruta of [SV.hub.ruta, ...rutasServicio]) assert.doesNotMatch(texto(main(read(archivo(ruta)))), prohibido, ruta);
});
