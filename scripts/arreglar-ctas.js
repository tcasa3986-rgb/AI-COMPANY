#!/usr/bin/env node
/**
 * arreglar-ctas.js — convierte los CTA muertos en enlaces reales.
 *
 * Estado encontrado (2026-08-26): 44 <button> repartidos en 7 páginas, sin onclick, sin
 * href y sin type="submit". "Hablar con un asesor" aparece 9 veces y ninguna funciona.
 * El sitio prácticamente no tenía ruta de conversión.
 *
 * Detalle de implementación: estos <button> traen padding y fondo pero NO traen flex, así
 * que como <button> son display:inline-block. Un <a> es display:inline, donde el padding
 * vertical no empuja la línea. Por eso, al convertir, se añade inline-flex salvo que el
 * botón ya tenga su propio display. El preflight de Tailwind ya hace que <a> herede color
 * y quite el subrayado, así que el resto del estilo se conserva igual.
 *
 * Solo se convierten los botones cuyo texto mapea sin ambigüedad a un destino conocido.
 * Los controles de interfaz (menú, filtros del blog, "Cargar más") NO se tocan: son otra
 * falla distinta y se reportan aparte.
 *
 *   node scripts/arreglar-ctas.js            (simula)
 *   node scripts/arreglar-ctas.js --aplicar
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const APLICAR = process.argv.includes('--aplicar');

const WA = 'https://wa.me/573212674754';
const WA_DIAG = WA + '?text=Hola%2C%20quiero%20mi%20diagn%C3%B3stico%20gratis';

// texto normalizado -> destino
const DESTINOS = [
  [/^hablar con un asesor$/, WA],
  [/^whatsapp$/, WA],
  [/^quiero mi diagn[oó]stico gratis/, '/contacto/'],
  [/^agendar reuni[oó]n/, '/contacto/'],
  [/^agendar demo$/, '/contacto/'],
  [/^ver demostraci[oó]n$/, '/contacto/'],
  [/^ver demo$/, '/contacto/'],
  [/^solicitar cotizaci[oó]n$/, '/contacto/'],
  [/^empezar ahora$/, '/contacto/'],
  [/^[aá]rea de clientes$/, '/area/'],
  [/^ver todos los casos$/, '/casos/'],
  [/^ver servicios$/, '/servicios/'],
  [/^explorar sistemas$/, '/soluciones/'],
];

// Controles de interfaz: no son CTA, no se convierten.
const IGNORAR = /^(menu|send|todos|automatizaci[oó]n|ia|marketing|casos|tutoriales|cargar m[aá]s art[ií]culos|acceder con google|leer m[aá]s|ver el sitio web|explorar soluci[oó]n|iniciar sesi[oó]n|suscribirme|enviar y agendar diagn[oó]stico)$/;

const PAGINAS = [
  'index.html', 'area/index.html', 'blog/index.html', 'casos/index.html',
  'contacto/index.html', 'precios/index.html', 'servicios/index.html',
  'soluciones/index.html',
];

const normalizar = s => s.replace(/<[^>]*>/g, ' ')
  .replace(/\b(arrow_forward|calendar_today|chat|phone|login|send|menu)\b/g, ' ')
  .replace(/\s+/g, ' ').trim().toLowerCase();

let convertidos = 0, ignorados = 0, sinMapa = [];
const resumen = {};

for (const rel of PAGINAS) {
  const abs = path.join(RAIZ, rel);
  if (!fs.existsSync(abs)) continue;
  let html = fs.readFileSync(abs, 'utf8');
  const antes = html;
  let n = 0;

  html = html.replace(/<button\b([^>]*)>([\s\S]*?)<\/button>/g, (m, attrs, interior) => {
    // No tocar lo que ya funciona.
    if (/onclick|type="submit"/.test(attrs)) return m;

    const texto = normalizar(interior);
    if (!texto || IGNORAR.test(texto)) { ignorados++; return m; }

    const regla = DESTINOS.find(([re]) => re.test(texto));
    if (!regla) { sinMapa.push(`${rel}: ${texto}`); return m; }
    const destino = regla[1];

    // Conservar las clases y garantizar que el padding siga funcionando.
    const mClase = attrs.match(/class="([^"]*)"/);
    let clases = mClase ? mClase[1] : '';
    if (!/\b(inline-)?flex\b|\bblock\b|\binline-block\b/.test(clases)) {
      clases = (clases + ' inline-flex items-center justify-center').trim();
    }

    let nuevosAttrs = mClase
      ? attrs.replace(/class="[^"]*"/, `class="${clases}"`)
      : `${attrs} class="${clases}"`;

    const externo = destino.startsWith('http')
      ? ' target="_blank" rel="noopener"'
      : '';

    n++; convertidos++;
    return `<a href="${destino}"${externo}${nuevosAttrs}>${interior}</a>`;
  });

  if (n) resumen[rel] = n;
  if (APLICAR && html !== antes) fs.writeFileSync(abs, html, 'utf8');
}

console.log(APLICAR ? '\nAPLICANDO\n' : '\nSIMULACIÓN (--aplicar para escribir)\n');
console.log('CTA convertidos en enlaces reales:');
for (const [p, n] of Object.entries(resumen)) console.log(`  ${String(n).padStart(3)}  ${p}`);
console.log(`\n  Total convertidos : ${convertidos}`);
console.log(`  Controles de UI respetados : ${ignorados}`);

if (sinMapa.length) {
  console.log('\nSin destino claro (requieren decisión, no se tocaron):');
  for (const s of [...new Set(sinMapa)]) console.log('  - ' + s);
}
