#!/usr/bin/env node
/**
 * reorientar-temas-blog.js — alinea el generador automático de blog con la estrategia
 * por vertical (Camino B).
 *
 * Problema: blog-topics.json tenía 50 temas de "servicio x sector" apuntando a
 * restaurantes, clínicas, hoteles, inmobiliarias, gimnasios y colegios — sectores donde
 * AI Company CO no tiene un solo cliente. Es el mismo error de las 179 páginas SEO,
 * repetido en el blog: perseguir términos genéricos y competidos sin nada propio que
 * decir.
 *
 * Corrección: los temas nuevos alimentan las cuatro landings por vertical, donde sí hay
 * un sistema real construido detrás. Son búsquedas de menos volumen y mucha más
 * intención — quien busca "cómo convertir una lámina a kilos para cotizar" tiene el
 * problema hoy.
 *
 * Conserva intactos los temas ya publicados para que el generador no los repita.
 *
 *   node scripts/reorientar-temas-blog.js            (simula)
 *   node scripts/reorientar-temas-blog.js --aplicar
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const ARCHIVO = path.join(__dirname, 'blog-topics.json');
const DIR_BLOG = path.join(RAIZ, 'blog');
const APLICAR = process.argv.includes('--aplicar');

const NUEVOS = [
  // --- Depósitos de madera (Maderas Montoya) ---
  ['inventario-deposito-madera-metros-cubicos-pulgadas', 'Inventario en un Depósito de Madera: Cómo Cuadrar Metros Cúbicos con Pulgadas', 'inventario depósito de madera colombia', 'Madera · Inventario', 'madera'],
  ['merma-transformacion-madera-como-medirla', 'La Merma en la Transformación de Madera: Por Qué Nadie la Mide y Cómo Empezar', 'merma transformación madera', 'Madera · Producción', 'madera'],
  ['controlar-lo-fiado-deposito-madera', 'Cómo Controlar lo que se Fía en un Depósito de Madera', 'cartera depósito de madera', 'Madera · Cartera', 'madera'],
  ['reportar-produccion-patio-desde-celular', 'Reportar la Producción del Patio desde el Celular: Cómo Funciona', 'reportar producción celular telegram', 'Madera · Automatización', 'madera'],
  ['software-aserrios-colombia-que-debe-tener', 'Software para Aserríos en Colombia: Qué Debe Tener de Verdad', 'software aserrío colombia', 'Madera · Software', 'madera'],
  ['nomina-atada-produccion-real-madera', 'Nómina Atada a la Producción Real en un Depósito de Madera', 'nómina producción depósito madera', 'Madera · Nómina', 'madera'],

  // --- Corte láser y metalmecánica (Ferre Láser, Láser Ejecutivo) ---
  ['convertir-lamina-a-kilos-cotizar-corte-laser', 'Cómo Convertir una Lámina a Kilos para Cotizar Corte Láser', 'convertir lámina a kilos corte láser', 'Corte láser · Cotización', 'corte-laser'],
  ['inventario-por-peso-metalmecanica-guia', 'Inventario por Peso en Metalmecánica: Guía Práctica', 'inventario por peso metalmecánica', 'Corte láser · Inventario', 'corte-laser'],
  ['calcular-margen-real-pedido-corte-laser', 'Cómo Calcular el Margen Real de un Pedido de Corte Láser', 'margen pedido corte láser', 'Corte láser · Márgenes', 'corte-laser'],
  ['retazos-corte-laser-convertirlos-en-inventario', 'Qué Hacer con los Retazos: Convertirlos en Inventario y No en Chatarra', 'retazos corte láser inventario', 'Corte láser · Inventario', 'corte-laser'],
  ['cotizador-corte-laser-variables-clave', 'Cotizador de Corte Láser: las Variables que No Puedes Olvidar', 'cotizador corte láser', 'Corte láser · Cotización', 'corte-laser'],
  ['evitar-cotizar-por-debajo-del-costo', 'Cómo Evitar que un Vendedor Cotice por Debajo del Costo', 'vender por debajo del costo control', 'Corte láser · Control', 'corte-laser'],

  // --- Ferreterías (Ferre Láser) ---
  ['varias-listas-de-precios-ferreteria', 'Cómo Manejar Varias Listas de Precios en una Ferretería', 'listas de precios ferretería', 'Ferretería · Precios', 'ferreteria'],
  ['cartera-ferreterias-cuanto-te-deben-hoy', 'Cartera en Ferreterías: Cómo Saber Cuánto te Deben Hoy', 'cartera ferretería colombia', 'Ferretería · Cartera', 'ferreteria'],
  ['facturacion-electronica-dian-ferreterias', 'Facturación Electrónica DIAN para Ferreterías: Guía 2026', 'facturación electrónica ferretería dian', 'Ferretería · DIAN', 'ferreteria'],
  ['quien-puede-cambiar-precios-en-tu-sistema', 'Quién Puede Cambiar Precios en tu Sistema (y Por Qué Importa)', 'permisos cambio de precios sistema', 'Ferretería · Seguridad', 'ferreteria'],
  ['miles-de-referencias-en-excel-cuando-cambiar', 'Miles de Referencias en Excel: Cuándo es Hora de Cambiar', 'inventario ferretería excel', 'Ferretería · Inventario', 'ferreteria'],
  ['inventario-ferreteria-unidades-distintas', 'Inventario de Ferretería con Unidades Distintas: Metro, Bulto y Unidad', 'unidades de medida inventario ferretería', 'Ferretería · Inventario', 'ferreteria'],

  // --- Reciclaje y chatarrerías (ASOERC, Chatarrería P&G) ---
  ['precios-por-material-chatarreria', 'Cómo Administrar Precios por Material en una Chatarrería', 'precios material chatarrería colombia', 'Reciclaje · Precios', 'reciclaje'],
  ['liquidacion-proveedores-reciclaje-soporte', 'Liquidación a Proveedores de Reciclaje: el Soporte que te Falta', 'liquidación proveedores reciclaje', 'Reciclaje · Liquidación', 'reciclaje'],
  ['control-flota-recoleccion-costo-por-viaje', 'Control de Flota de Recolección: Cuánto Cuesta Cada Viaje', 'control flota recolección reciclaje', 'Reciclaje · Flota', 'reciclaje'],
  ['software-bodegas-reciclaje-colombia', 'Software para Bodegas de Reciclaje en Colombia', 'software bodega reciclaje colombia', 'Reciclaje · Software', 'reciclaje'],
  ['cuadrar-contabilidad-chatarreria', 'Cómo Cuadrar la Contabilidad de una Chatarrería', 'contabilidad chatarrería colombia', 'Reciclaje · Contabilidad', 'reciclaje'],
  ['pesaje-y-trazabilidad-reciclaje', 'Pesaje y Trazabilidad en Reciclaje: del Peso al Soporte', 'pesaje trazabilidad reciclaje', 'Reciclaje · Pesaje', 'reciclaje'],
];

const temas = JSON.parse(fs.readFileSync(ARCHIVO, 'utf8'));

const publicado = slug => fs.existsSync(path.join(DIR_BLOG, slug, 'index.html'));

const yaPublicados = temas.filter(t => publicado(t.slug));
const genericosSinPublicar = temas.filter(t => !publicado(t.slug));

const nuevos = NUEVOS.map(([slug, titulo, keyword, categoria, industria]) => ({
  slug, titulo, keyword, categoria, servicio: 'apps-empresariales', industria,
}));

// Los publicados van primero para preservar el histórico; los nuevos quedan en cola.
const resultado = [...yaPublicados, ...nuevos];

console.log(APLICAR ? '\nAPLICANDO\n' : '\nSIMULACIÓN (--aplicar para escribir)\n');
console.log(`  Temas actuales                    : ${temas.length}`);
console.log(`  Ya publicados (se conservan)      : ${yaPublicados.length}`);
console.log(`  Genéricos sin publicar (se van)   : ${genericosSinPublicar.length}`);
console.log(`  Temas nuevos por vertical         : ${nuevos.length}`);
console.log(`  Resultado                         : ${resultado.length}`);

const porVertical = nuevos.reduce((m, t) => (m[t.industria] = (m[t.industria] || 0) + 1, m), {});
console.log('\n  Reparto de los nuevos:');
for (const [v, n] of Object.entries(porVertical)) console.log(`    ${String(n).padStart(2)}  ${v}`);

console.log('\n  Se descartan (sectores sin cliente real):');
for (const t of genericosSinPublicar.slice(0, 6)) console.log(`    - ${t.titulo.slice(0, 66)}`);
if (genericosSinPublicar.length > 6) console.log(`    ... y ${genericosSinPublicar.length - 6} más`);

if (APLICAR) {
  fs.copyFileSync(ARCHIVO, ARCHIVO + '.bak');
  fs.writeFileSync(ARCHIVO, JSON.stringify(resultado, null, 2) + '\n', 'utf8');
  console.log('\n  Escrito. Respaldo del anterior en blog-topics.json.bak');
}
