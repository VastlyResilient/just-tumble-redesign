import {readFile,writeFile,readdir,mkdir,copyFile} from 'node:fs/promises';
import source from '../src/source-data.json' with {type:'json'};
const base='/just-tumble-redesign/';
for(const name of await readdir('dist/client/assets')){
 if(!name.endsWith('.js'))continue;
 const path='dist/client/assets/'+name;let s=await readFile(path,'utf8');
 s=s.replace(/(?<!\+)(["'`])\/(?!just-tumble-redesign\/)(?=[a-zA-Z])/g,(_,quote)=>quote+base);
 s=s.replace(/href:"\/"/g,'href:"'+base+'"');
 await writeFile(path,s);
}
const routes=new Set([...Object.keys(source),'programs','find-a-class','locations','parent-portal','contact','waivers','news','gift-certificates','clinics','portal/private','north-haven-portal/private','portal/preschool','north-haven-portal/preschool']);
for(const route of routes){if(!route||route.includes('..'))continue;await mkdir('dist/client/'+route,{recursive:true});await copyFile('dist/client/index.html','dist/client/'+route+'/index.html')}
await copyFile('dist/client/index.html','dist/client/404.html');await writeFile('dist/client/.nojekyll','');
