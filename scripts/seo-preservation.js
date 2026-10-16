'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const plain=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
// Fase 3 autoriza contenido de inicio; nunca permite sustituir canonical, robots o URL.
const homeApproval=()=>{const approved=JSON.parse(fs.readFileSync(path.join(__dirname,'content/home-seo-approved.json'),'utf8'));return Object.fromEntries(['title','description','h1','main_links','main_text_sha256'].map(k=>[k,approved[k]]));};
const interiorApproval=route=>{const all=JSON.parse(fs.readFileSync(path.join(__dirname,'content/interiors-seo-approved.json'),'utf8'));const approved=all[route];return approved?Object.fromEntries(['main_links','main_text_sha256'].map(k=>[k,approved[k]])):{};};
const caseApproval=()=>{const approved=JSON.parse(fs.readFileSync(path.join(__dirname,'content/cases-seo-approved.json'),'utf8'));return Object.fromEntries(['main_links','main_text_sha256'].map(k=>[k,approved[k]]));};
// Fase 5: sólo los campos comerciales/contacto expresamente autorizados.
const businessApproval=route=>{const allowed={'/':['main_links','main_text_sha256'],'/contacto/':['main_links','main_text_sha256'],'/precios/':['description','main_text_sha256'],'/politica-de-privacidad/':['main_links','main_text_sha256'],'/tratamiento-de-datos/':['main_links','main_text_sha256'],'/terminos-y-condiciones/':['main_links','main_text_sha256']};const a=JSON.parse(fs.readFileSync(path.join(__dirname,'content/business-seo-approved.json'),'utf8'))[route]||{};const keys=route.startsWith('/blog/')?['main_links','main_text_sha256']:(allowed[route]||[]);return Object.fromEntries(keys.filter(k=>k in a).map(k=>[k,a[k]]));};
function validate(root){const contract=JSON.parse(fs.readFileSync(path.join(__dirname,'content/seo-contract.json'),'utf8')),manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'content/pages-manifest.json'),'utf8')),errors=[];
 if(JSON.stringify(Object.keys(contract).sort())!==JSON.stringify(manifest.map(p=>p.route).sort()))errors.push('Cambió el conjunto de URLs protegido');
 for(const p of manifest){const html=fs.readFileSync(path.join(root,p.file),'utf8'),main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]||'',old=p.route==='/'?{...contract[p.route],...homeApproval()}:p.route==='/casos/'?{...contract[p.route],...caseApproval()}:contract[p.route];if(old&&require('./templates/interiors').targets.includes(p.route))Object.assign(old,interiorApproval(p.route));if(!old)continue;Object.assign(old,businessApproval(p.route));
 const get=re=>html.match(re)?.[1]||'';const now={title:get(/<title>(.*?)<\/title>/s),description:get(/name="description" content="([^"]*)"/),h1:plain(get(/<h1[^>]*>(.*?)<\/h1>/s)),canonical:get(/rel="canonical" href="([^"]*)"/),robots:get(/name="robots" content="([^"]*)"/),noindex:p.noindex,main_links:[...main.matchAll(/href="([^"]*)"/g)].map(m=>m[1]),main_text_sha256:crypto.createHash('sha256').update(plain(main)).digest('hex')};
 for(const key of Object.keys(now))if(JSON.stringify(now[key])!==JSON.stringify(old[key]))errors.push(`${p.route}: cambió ${key}`);
 }return errors;
}
module.exports={validate};
