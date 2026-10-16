'use strict';
const fs=require('node:fs'),path=require('node:path');
const {build,runSteps}=require('./build-pipeline');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'dist');
const mode=process.argv.includes('--review')?'review':process.argv.includes('--release')?'release':null;
function copy(rel){const src=path.join(ROOT,rel),dest=path.join(OUT,rel);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(src,dest);}
function tree(rel){for(const e of fs.readdirSync(path.join(ROOT,rel),{withFileTypes:true})){const p=path.join(rel,e.name);if(e.isDirectory()){if(!['assets/editorial','assets/brand'].includes(p.split(path.sep).join('/')))tree(p);}else copy(p);}}
try{
 const report=build(ROOT,mode,{packageFiles(){
  fs.mkdirSync(OUT,{recursive:true});
  const pages=JSON.parse(fs.readFileSync(path.join(ROOT,'scripts/content/pages-manifest.json'),'utf8'));
  for(const p of pages)copy(p.file);tree('assets');
  const articles=JSON.parse(fs.readFileSync(path.join(ROOT,'scripts/content/articles.json'),'utf8'));for(const a of articles)copy(a.cover.slice(1));
  // assets/brand queda excluido del arbol, pero site.webmanifest y la imagen
  // social SI apuntan a tres de esos archivos: sin copiarlos, el icono de la
  // app y la vista previa al compartir quedan rotos en produccion.
  for(const file of ['robots.txt','sitemap.xml','sitemap-main.xml','llms.txt','favicon.svg','favicon.ico','favicon-32.png','favicon-96.png','apple-touch-icon.png','assets/brand/icon-192.png','assets/brand/logo-512.png','assets/brand/social-cover.png'])copy(file);
 },validateOutput(){runSteps(ROOT,[{script:'scripts/check-site.js',env:{SITE_CHECK_ROOT:OUT}}]);}});
 console.log(JSON.stringify({build:'ok',mode:report.mode,releaseReady:report.releaseReady,files:report.files.length}));
}catch(error){console.error(error.message);process.exitCode=1;}
