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
  for(const file of ['robots.txt','sitemap.xml','sitemap-main.xml','llms.txt'])copy(file);
  if(mode==='release')throw new Error('Integración final de recursos oficiales pendiente de implementar y revisar');
 },validateOutput(){runSteps(ROOT,[{script:'scripts/check-site.js',env:{SITE_CHECK_ROOT:OUT}}]);}});
 console.log(JSON.stringify({build:'ok',mode:report.mode,releaseReady:report.releaseReady,files:report.files.length}));
}catch(error){console.error(error.message);process.exitCode=1;}
