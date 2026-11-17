'use strict';
// Imagenes de las guias del blog, generadas con Google Flow (flow-video-mcp, en el Chrome de Cristian).
//
//   node scripts/blog-imagenes.js generar <slug|archivo.json|--todos>   crea las imagenes que falten (no repite las que existen)
//   node scripts/blog-imagenes.js aplicar <slug|--todos>                 pone portada + figuras en una guia YA publicada (articles.json)
//   node scripts/blog-imagenes.js estado                                 que guia tiene que imagenes
//
// Plan de cada guia: scripts/content/blog-imagenes.json (o el campo `imagenes` de un borrador).
//   {portada:{prompt,alt,caption}, interiores:[{antesDeH2,prompt,alt,caption}]}
// El estilo comun (violeta de marca, trazo oscuro, SIN texto) lo agrega este script: asi todas las guias se ven de la misma familia
// y la IA no inventa letras ni logos. Cada imagen se rotula como ilustracion generada con IA.
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const {spawnSync} = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');
const PLAN = path.join(__dirname, 'content/blog-imagenes.json');
const POSTS = path.join(__dirname, 'content/articles.json');
const FLOW_DIR = process.env.FLOW_MCP_DIR || path.resolve(ROOT, '../../../flow-video-mcp');
const ESTILO = 'Flat vector editorial illustration, thick dark navy outlines, limited palette of violet (#7024C4), lilac and white with small yellow accents, clean white background, generous empty space, simple friendly shapes. No text, no letters, no numbers, no logos, no real brands, no photorealism.';
const CREDITO = {author: 'AI Company CO', license: 'Ilustración generada con IA (Google Flow) para AI Company CO'};
const ANCHO = 1280, ALTO = 714; // Flow entrega 16:9 (1376x768) -> 1280x714

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const leer = f => JSON.parse(fs.readFileSync(f, 'utf8'));
function escribir(f, obj) { // conserva CRLF si el archivo ya lo usaba
  const crlf = fs.existsSync(f) && fs.readFileSync(f, 'utf8').includes('\r\n');
  let out = JSON.stringify(obj, null, 2) + '\n';
  if (crlf) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(f, out);
}
const fechaHoy = () => { // AAAA-MM-DD en hora de Bogota (igual que build-site.js)
  if (process.env.SITE_DATE) return process.env.SITE_DATE;
  const p = new Intl.DateTimeFormat('en', {timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(new Date());
  const g = t => p.find(x => x.type === t).value;
  return `${g('year')}-${g('month')}-${g('day')}`;
};
const planDe = slug => { try { return leer(PLAN)[slug] || null; } catch { return null; } };
const rutaImagen = (slug, tipo) => `/assets/editorial/${slug}-${tipo}.jpg`;
const archivo = ruta => path.join(ROOT, ruta.slice(1));
const existe = (slug, tipo) => fs.existsSync(archivo(rutaImagen(slug, tipo)));

// ---- HTML de una figura (lo usan toPost y `aplicar`) ----
function figuraHtml(slug, n, it) {
  return `<figure class="fig-ia" data-fig="${n}"><img src="${rutaImagen(slug, n)}" alt="${esc(it.alt)}" width="${ANCHO}" height="${ALTO}" loading="lazy" decoding="async"><figcaption>${esc(it.caption)} <span>Ilustración generada con IA para AI Company CO.</span></figcaption></figure>`;
}
// Inserta las figuras justo antes del H2 indicado. Idempotente: primero quita las que ya puso.
function insertarFiguras(body, slug, plan) {
  let out = body.replace(/<figure class="fig-ia"[\s\S]*?<\/figure>/g, '');
  const interiores = (plan?.interiores || []).map((it, i) => ({it, n: i + 1})).filter(({n}) => existe(slug, n));
  const h2 = [...out.matchAll(/<h2 id="/g)].map(m => m.index);
  for (const {it, n} of interiores.sort((a, b) => b.it.antesDeH2 - a.it.antesDeH2)) { // de atras hacia adelante, para no mover posiciones
    const pos = h2[it.antesDeH2 - 1];
    if (pos === undefined) throw new Error(`${slug}: antesDeH2=${it.antesDeH2} pero la guia solo tiene ${h2.length} H2`);
    out = out.slice(0, pos) + figuraHtml(slug, n, it) + out.slice(pos);
  }
  return out;
}
const imagenPortada = (slug, plan) => ({src: rutaImagen(slug, 'portada'), alt: plan.portada.alt, width: ANCHO, height: ALTO, approved: true, type: 'ai-illustration', caption: plan.portada.caption, credit: CREDITO});

// ---- Flow ----
function convertir(origen, destino) {
  const code = `import sys\nfrom PIL import Image\nim=Image.open(sys.argv[1]).convert("RGB")\nw=${ANCHO};h=round(im.height*w/im.width)\nim=im.resize((w,h),Image.LANCZOS)\nim.save(sys.argv[2],"JPEG",quality=84,optimize=True,progressive=True)\npx=im.convert("L").resize((160,90)).getdata();blancos=sum(1 for v in px if v>235)/len(px)
print(w,h,round(blancos,2))`;
  const r = spawnSync('python', ['-I', '-c', code, origen, destino], {encoding: 'utf8'});
  if (r.status !== 0) throw new Error('No se pudo convertir la imagen: ' + (r.stderr || '').slice(0, 200));
  return r.stdout.trim();
}
function pedirAFlow(prompt) {
  if (!fs.existsSync(path.join(FLOW_DIR, 'src/cli.js'))) throw new Error(`No encuentro flow-video-mcp en ${FLOW_DIR} (variable FLOW_MCP_DIR).`);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'flow-blog-'));
  for (let intento = 1; intento <= 3; intento++) {
    // modelo 2 (el Pro falla con frecuencia con "No se pudo cargar la imagen"); 16:9 una imagen por pedido
    const r = spawnSync('node', ['src/cli.js', `${prompt} ${ESTILO}`, '--aspect', '16:9', '--count', '1', '--model', '2', '--out', tmp], {cwd: FLOW_DIR, encoding: 'utf8', timeout: 240000});
    const hecho = fs.readdirSync(tmp).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).map(f => path.join(tmp, f))[0];
    if (r.status === 0 && hecho) return hecho;
    const salida = (r.stdout + r.stderr).trim();
    if (/actividad inusual|unusual activity/i.test(salida)) throw new Error('Flow detecto "actividad inusual" y frena las peticiones. NO insistas: espera 20-30 minutos y vuelve a correr (las imagenes ya hechas no se repiten).');
    console.log(`  intento ${intento} fallo: ${salida.split('\n').pop().slice(0, 140)}`);
    for (const f of fs.readdirSync(tmp)) fs.rmSync(path.join(tmp, f), {force: true}); // que un archivo a medias no se confunda con la imagen del siguiente intento
  }
  throw new Error('Flow no genero la imagen tras 3 intentos (revisa que el Chrome de Flow tenga la sesion abierta y creditos).');
}
// Nombre de otra imagen del blog con exactamente los mismos bytes (null si es nueva)
function repetidaDe(ruta) {
  const crypto = require('node:crypto'), dir = path.dirname(ruta), hash = f => crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex');
  const mia = hash(ruta);
  return fs.readdirSync(dir).filter(f => /\.jpg$/i.test(f) && path.join(dir, f) !== ruta).find(f => hash(path.join(dir, f)) === mia) || null;
}
const PAUSA_S = Number(process.env.FLOW_PAUSA_S || 40);
let hubo = false; // ya se pidio alguna imagen en esta corrida
const esperar = seg => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, seg * 1000);
function producir(slug, plan) {
  const tareas = [['portada', plan.portada], ...(plan.interiores || []).map((it, i) => [i + 1, it])];
  for (const [tipo, it] of tareas) {
    if (existe(slug, tipo)) { console.log(`  ya existe  ${slug}-${tipo}`); continue; }
    if (hubo) esperar(PAUSA_S); // Flow limita el ritmo: unas 12 seguidas sin pausa lo disparan
    let tmp, dim;
    for (let v = 1; v <= 2; v++) { // Flow a veces devuelve OTRA imagen del proyecto (una foto): la ilustracion de marca es de fondo blanco
      tmp = pedirAFlow(it.prompt); hubo = true;
      dim = convertir(tmp, archivo(rutaImagen(slug, tipo)));
      fs.rmSync(path.dirname(tmp), {recursive: true, force: true});
      const repetida = repetidaDe(archivo(rutaImagen(slug, tipo))); // Flow a veces entrega otra vez un tile viejo
      const esFoto = Number(dim.split(' ')[2]) < 0.3;
      if (!esFoto && !repetida) break;
      fs.rmSync(archivo(rutaImagen(slug, tipo)), {force: true});
      console.log(`  descartada ${slug}-${tipo}: ${repetida ? 'es idéntica a ' + repetida : 'no es una ilustración de fondo blanco (parece una foto)'}; se pide de nuevo`);
      if (v === 2) throw new Error('Flow devolvio una imagen repetida o una foto dos veces seguidas para ' + slug + '-' + tipo);
      esperar(PAUSA_S);
    }
    console.log(`  ok         ${slug}-${tipo}  ${dim}  ${Math.round(fs.statSync(archivo(rutaImagen(slug, tipo))).size / 1024)} KB`);
  }
}

// ---- Aplicar a una guia ya publicada ----
function aplicar(slug) {
  const plan = planDe(slug); if (!plan) throw new Error(`Sin plan de imagenes para ${slug}`);
  if (!existe(slug, 'portada')) throw new Error(`Falta la portada de ${slug}: corre generar primero`);
  const posts = leer(POSTS), a = posts.find(p => p.slug === slug); if (!a) throw new Error(`La guia ${slug} no esta publicada`);
  const img = imagenPortada(slug, plan);
  Object.assign(a, {cover: img.src, coverAlt: img.alt, coverWidth: img.width, coverHeight: img.height, imageType: img.type, imageCaption: img.caption, imageCredit: img.credit});
  a.modified = fechaHoy(); // portada y figuras cambian la pagina de verdad: dateModified y lastmod del sitemap lo reflejan
  a.body = insertarFiguras(a.body, slug, plan);
  escribir(POSTS, posts);
  return a.body.match(/class="fig-ia"/g)?.length || 0;
}

module.exports = {figuraHtml, insertarFiguras, imagenPortada, planDe, existe, rutaImagen, ESTILO, CREDITO};

if (require.main === module) {
  const [cmd, arg] = process.argv.slice(2);
  const todos = () => Object.keys(leer(PLAN)).filter(k => !k.startsWith('_'));
  if (cmd === 'generar' && arg) {
    if (arg.endsWith('.json')) { const d = leer(path.resolve(arg)); if (!d.imagenes) throw new Error('El borrador no trae el campo `imagenes`'); console.log(d.slug); producir(d.slug, d.imagenes); }
    else for (const s of arg === '--todos' ? todos() : [arg]) { console.log(s); const p = planDe(s); if (!p) throw new Error('Sin plan para ' + s); producir(s, p); }
  } else if (cmd === 'aplicar' && arg) {
    for (const s of arg === '--todos' ? todos() : [arg]) {
      if (arg === '--todos' && !existe(s, 'portada')) { console.log(`${s}: sin imágenes todavía (se omite)`); continue; }
      console.log(`${s}: ${aplicar(s)} figuras interiores`);
    }
  } else if (cmd === 'estado') {
    const posts = leer(POSTS);
    for (const a of posts) console.log(String(a.imageType).padEnd(16), (planDe(a.slug) ? 'plan ' : '     '), [existe(a.slug, 'portada') ? 'P' : '-', existe(a.slug, 1) ? '1' : '-', existe(a.slug, 2) ? '2' : '-'].join(''), a.slug);
  } else throw new Error('Uso: node scripts/blog-imagenes.js generar|aplicar <slug|archivo.json|--todos> | estado');
}
