'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{spawnSync}=require('node:child_process');
function clearOutput(root){const out=path.resolve(root,'dist');if(path.dirname(out)!==path.resolve(root)||path.basename(out)!=='dist')throw new Error('Salida fuera del proyecto');fs.rmSync(out,{recursive:true,force:true});}
function runSteps(root,steps){for(const {script,env={}}of steps){const result=spawnSync(process.execPath,[path.join(root,script)],{cwd:root,env:{...process.env,...env},stdio:'inherit'});if(result.error)throw result.error;if(result.status!==0)throw new Error(`Falló ${script} (${result.status})`);}}
function build(root,mode,{steps,packageFiles,validateOutput}={}){
 if(!['review','release'].includes(mode))throw new Error('Indica --review para revisión local o --release para publicación autorizada');
 const status=JSON.parse(fs.readFileSync(path.join(root,'scripts/content/brand-status.json'),'utf8'));
 try{
  clearOutput(root);
  fs.rmSync(path.join(root,'_rediseno/fase2/build-result.json'),{force:true});
  if(mode==='release'&&(status.reviewOnly||status.status!=='approved'||!status.officialResources))throw new Error('PUBLICACIÓN BLOQUEADA: falta el recurso oficial aprobado; solo se permite build --review');
  runSteps(root,steps||[{script:'scripts/build-site.js'},{script:'scripts/check-site.js',env:{SITE_CHECK_ROOT:root}}]);
  packageFiles();
  validateOutput();
  const files=[];const walk=(dir)=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else files.push({file:path.relative(path.join(root,'dist'),file).split(path.sep).join('/'),sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')});}};walk(path.join(root,'dist'));
  const report={mode,releaseReady:mode==='release',artwork:status.status,files};const reportDir=path.join(root,'_rediseno/fase2');fs.mkdirSync(reportDir,{recursive:true});fs.writeFileSync(path.join(reportDir,'build-result.json'),JSON.stringify(report,null,2));
  return report;
 }catch(error){clearOutput(root);throw error;}
}
module.exports={build,runSteps};
