'use strict';
const fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),OUT=path.resolve(ROOT,'dist');
if(path.dirname(OUT)!==ROOT||path.basename(OUT)!=='dist')throw new Error('Ruta de salida fuera del proyecto');
if(fs.existsSync(OUT))fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(OUT,{recursive:true});
function copy(rel){const src=path.join(ROOT,rel),dest=path.join(OUT,rel);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(src,dest)}
function tree(rel){for(const e of fs.readdirSync(path.join(ROOT,rel),{withFileTypes:true})){const p=path.join(rel,e.name);if(e.isDirectory()){if(p.replaceAll(path.sep,'/')!=='assets/editorial')tree(p)}else copy(p)}}
const pages=JSON.parse(fs.readFileSync(path.join(ROOT,'scripts/content/pages-manifest.json'),'utf8'));
for(const p of pages)copy(p.file);tree('assets');
const articles=JSON.parse(fs.readFileSync(path.join(ROOT,'scripts/content/articles.json'),'utf8'));for(const a of articles)copy(a.cover.slice(1));
for(const file of ['favicon.svg','favicon.ico','favicon.png','favicon-96.png','apple-touch-icon.png','site.webmanifest','robots.txt','sitemap.xml','sitemap-main.xml','llms.txt'])copy(file);
console.log(`Sitio empaquetado en dist: ${pages.length} páginas, activos de marca y portadas. Fuentes y borradores excluidos.`);
