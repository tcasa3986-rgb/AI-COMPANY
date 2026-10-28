'use strict';
// La portada cargaba CINCO hojas de estilo que bloquean el pintado (site, portfolio, home, home-top,
// home-corporate). Se unen, en el mismo orden, en UNA: assets/home.bundle.css. La cascada es identica,
// pero el navegador hace una solicitud en vez de cinco antes de poder pintar.
//
// Las hojas originales siguen existiendo: las demas paginas las usan por separado.
// El bundle se regenera en cada build; no se edita a mano.
const fs = require('node:fs'), path = require('node:path');

const ORDEN = ['site.css', 'portfolio.css', 'home.css', 'home-top.css', 'home-corporate.css'];

// Minificacion conservadora: quita comentarios y espacios sobrantes. No toca cadenas ni valores.
function minificar(css) {
  const CR = String.fromCharCode(13);
  return css
    .split(CR).join('')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function generar(root) {
  const partes = ORDEN.map(f => minificar(fs.readFileSync(path.join(root, 'assets', f), 'utf8')));
  const out = '/* AUTOGENERADO por scripts/bundle-css.js: site + portfolio + home + home-top + home-corporate. No editar. */' + partes.join('');
  const dest = path.join(root, 'assets/home.bundle.css');
  if (!fs.existsSync(dest) || fs.readFileSync(dest, 'utf8') !== out) fs.writeFileSync(dest, out);
  return {bytes: Buffer.byteLength(out), fuentes: ORDEN.length};
}

module.exports = {generar, minificar, ORDEN};
if (require.main === module) console.log(JSON.stringify(generar(path.resolve(__dirname, '..'))));
