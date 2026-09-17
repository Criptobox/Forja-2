const $=id=>document.getElementById(id);
const home=$('home'),studio=$('studio'),prompt=$('prompt'),build=$('buildBtn'),iframe=$('sitePreview');
let generatedFiles={};

document.querySelectorAll('.examples button').forEach(b=>b.onclick=()=>{prompt.value=b.textContent;prompt.focus()});
$('studioBtn').onclick=()=>openStudio();
$('backBtn').onclick=()=>{studio.classList.add('hidden');home.classList.remove('hidden')};
$('refreshBtn').onclick=()=>{iframe.srcdoc=iframe.srcdoc};

function openStudio(){home.classList.add('hidden');studio.classList.remove('hidden')}
function setStep(n){
 document.querySelectorAll('.step').forEach((x,i)=>x.classList.toggle('active',i===n));
}
function activity(name,text,index){
 $('activityName').textContent=name;$('activityText').textContent=text;
 document.querySelectorAll('.activity-item').forEach((x,i)=>{x.classList.toggle('current',i===index);x.querySelector('span').textContent=i===index?'◉':'○'});
}
function showFiles(files){
 generatedFiles=files;
 $('fileList').innerHTML=Object.keys(files).map(k=>'◦ '+k).join('<br>');
}
function makePreview(files){
 const html=files['index.html']||'';
 let css=files['styles.css']||'',js=files['script.js']||'';
 let doc=html;
 if(!/<style/i.test(doc) && css) doc=doc.replace('</head>','<style>'+css+'</style></head>');
 if(js && !/<script/i.test(doc)) doc=doc.replace('</body>','<script>'+js.replace(/<\/script/gi,'<\\/script')+'</script></body>');
 iframe.srcdoc=doc;
}
async function generate(){
 const text=prompt.value.trim();
 if(!text){prompt.focus();return}
 $('error').classList.add('hidden');build.disabled=true;openStudio();
 $('projectTitle').textContent=text.length>55?text.slice(0,55)+'…':text;
 activity('Thinking','Entendiendo tu idea',0);setStep(0);
 await new Promise(r=>setTimeout(r,300));
 activity('Planning','Preparando la arquitectura',0);setStep(1);
 await new Promise(r=>setTimeout(r,300));
 activity('Design','Definiendo la dirección visual',1);setStep(2);
 await new Promise(r=>setTimeout(r,300));
 activity('Building','Generando código real',2);setStep(3);
 try{
   const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:text})});
   const data=await r.json();
   if(!r.ok)throw new Error(data.error||'La generación falló');
   showFiles(data.files);
   makePreview(data.files);
   activity('QA',data.source==='ai'?'Revisando resultado IA':'Probando generador local',3);setStep(4);
   await new Promise(r=>setTimeout(r,500));
   activity('QA','Resultado listo para inspección',3);setStep(5);
 }catch(e){
   $('error').textContent='Error de generación: '+e.message;$('error').classList.remove('hidden');
   activity('Error','La generación necesita revisión',3);
 }finally{build.disabled=false}
}
build.onclick=generate;

$('downloadBtn').onclick=async()=>{
 if(!Object.keys(generatedFiles).length){alert('Genera primero una web.');return}
 if(typeof JSZip==='undefined'){alert('No se pudo cargar el exportador ZIP.');return}
 const z=new JSZip();
 for(const [name,content] of Object.entries(generatedFiles))z.file(name,content);
 z.file('README-FORJA.md','# Sitio generado por FORJA\n\nGenerado desde: '+prompt.value.trim());
 const blob=await z.generateAsync({type:'blob'});
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='forja-generated-site.zip';a.click();
 setTimeout(()=>URL.revokeObjectURL(a.href),1000);
};
