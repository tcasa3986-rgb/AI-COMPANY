'use strict';
// Registra de forma EXPLICITA los cambios de contenido autorizados en la compuerta de SEO.
//
// La compuerta (seo-preservation.js) compara cada pagina contra una linea base y falla si
// cambia titulo, descripcion, h1, enlaces o texto del <main>. Eso protege el SEO de cambios
// accidentales. Cuando el cambio es deliberado hay que re-registrarlo; este script lo hace
// sin tocar a mano hashes y deja constancia de que cambio.
//
// Uso:
//   node scripts/registrar-seo.js --rutas=/casos/,/nosotros/        (solo muestra)
//   node scripts/registrar-seo.js --rutas=/casos/ --blog --aplicar  (escribe)
//
// Ejecutar DESPUES de `node scripts/build-site.js`. Solo toca las rutas que se le nombran:
// una ruta que cambio sin estar en la lista sigue haciendo fallar check-site.js, que es lo
// correcto. Actualiza todas las capas que mencionan la ruta (contrato, interiores, portada,
// comercial) para que no se contradigan: validate() las superpone en ese orden.
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const ROOT = path.resolve(__dirname, '..');
const C = f => path.join(__dirname, 'content', f);
const plain = s => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const arg = n => (process.argv.find(a => a.startsWith('--' + n + '=')) || '').split('=').slice(1).join('=');
const rutas = new Set(arg('rutas').split(',').filter(Boolean));
const aplicar = process.argv.includes('--aplicar');
const manifest = JSON.parse(fs.readFileSync(C('pages-manifest.json'), 'utf8'));
if (process.argv.includes('--blog')) for (const p of manifest) if (p.route.startsWith('/blog/') && p.route !== '/blog/') rutas.add(p.route);
if (!rutas.size) { console.error('Indica --rutas=/a/,/b/ y/o --blog'); process.exit(2); }

// Misma huella que seo-preservation.js::validate().
function huella(p) {
  const html = fs.readFileSync(path.join(ROOT, p.file), 'utf8');
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
  const get = re => html.match(re)?.[1] || '';
  return {
    title: get(/<title>(.*?)<\/title>/s),
    description: get(/name="description" content="([^"]*)"/),
    h1: plain(get(/<h1[^>]*>(.*?)<\/h1>/s)),
    canonical: get(/rel="canonical" href="([^"]*)"/),
    robots: get(/name="robots" content="([^"]*)"/),
    noindex: p.noindex,
    main_links: [...main.matchAll(/href="([^"]*)"/g)].map(m => m[1]),
    main_text_sha256: crypto.createHash('sha256').update(plain(main)).digest('hex'),
  };
}

// Capas de aprobacion. `porRuta`: el archivo es {ruta: {...}}; si no, es un unico objeto (portada).
const capas = [
  {f: 'seo-contract.json', porRuta: true, crear: true},
  {f: 'interiors-seo-approved.json', porRuta: true},
  {f: 'business-seo-approved.json', porRuta: true},
  {f: 'home-seo-approved.json', porRuta: false, soloRuta: '/'},
].map(c => {
  const raw = fs.readFileSync(C(c.f));
  const txt = raw.toString('utf8');
  return {...c, txt, crlf: txt.includes('\r\n'), finalNL: /\n$/.test(txt), data: JSON.parse(txt)};
});

const cambios = [];
// Precedencia real de validate(): contrato < portada < interiores < comercial (la ultima gana).
// Por eso, para cada campo, solo se actualiza la capa MAS ALTA que lo declara: las capas de
// abajo quedan tapadas y tocarlas solo ensuciaria la linea base sin cambiar el resultado.
const orden = ['seo-contract.json', 'home-seo-approved.json', 'interiors-seo-approved.json', 'business-seo-approved.json'];
const capasOrdenadas = orden.map(f => capas.find(c => c.f === f));
const corto = v => { const s = JSON.stringify(v) ?? 'undefined'; return s.length > 70 ? s.slice(0, 67) + '...' : s; };
for (const p of manifest) {
  if (!rutas.has(p.route)) continue;
  const now = huella(p);
  // Objetos de cada capa para esta ruta (de menor a mayor precedencia).
  const objetos = [];
  for (const c of capasOrdenadas) {
    if (c.porRuta) {
      let d = c.data[p.route];
      if (!d && c.crear) { d = c.data[p.route] = {}; cambios.push([c.f, p.route, '(ruta nueva)', '', '']); for (const k of Object.keys(now)) d[k] = now[k]; continue; }
      if (d) objetos.push({c, d});
    } else if (p.route === c.soloRuta) objetos.push({c, d: c.data});
  }
  for (const k of Object.keys(now)) {
    const mandan = objetos.filter(o => k in o.d);
    const ganadora = mandan[mandan.length - 1];
    if (!ganadora) continue;
    if (JSON.stringify(ganadora.d[k]) !== JSON.stringify(now[k])) {
      cambios.push([ganadora.c.f, p.route, k, corto(ganadora.d[k]), corto(now[k])]);
      ganadora.d[k] = now[k];
    }
  }
}

const porRuta = {};
for (const [f, r, k] of cambios) (porRuta[r] ||= new Set()).add(k);
for (const [r, ks] of Object.entries(porRuta)) console.log(`${r.padEnd(52)} ${[...ks].join(', ')}`);
const titulos = cambios.filter(c => ['title', 'description', 'h1'].includes(c[2]) && c[3] !== '');
if (titulos.length) {
  console.log('\nCAMBIOS DE TITULO / DESCRIPCION / H1 (revisar a conciencia):');
  for (const [f, r, k, a, b] of titulos.filter((c, i, arr) => arr.findIndex(x => x[1] === c[1] && x[2] === c[2]) === i)) console.log(`  ${r} · ${k}\n     antes: ${a}\n     ahora: ${b}`);
}
console.log(`\n${rutas.size} rutas nombradas · ${Object.keys(porRuta).length} con cambios · ${cambios.length} campos`);

if (!aplicar) { console.log('Simulacion: no se escribio nada. Agrega --aplicar para registrar.'); process.exit(0); }
for (const c of capas) {
  let out = JSON.stringify(c.data, null, 2) + (c.finalNL ? '\n' : '');
  if (c.crlf) out = out.replace(/\n/g, '\r\n');
  if (out !== c.txt) { fs.writeFileSync(C(c.f), out); console.log('escrito', c.f); }
}
