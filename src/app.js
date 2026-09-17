const home=document.getElementById('home');
const studio=document.getElementById('studio');
const prompt=document.getElementById('prompt');
const buildBtn=document.getElementById('buildBtn');
const projectTitle=document.getElementById('projectTitle');
const sitePreview=document.getElementById('sitePreview');
const activities=[...document.querySelectorAll('.activity-item')];
const steps=[...document.querySelectorAll('.step')];

document.querySelectorAll('.examples button').forEach(b=>b.onclick=()=>{prompt.value=b.textContent;prompt.focus()});
document.getElementById('studioBtn').onclick=()=>openStudio();
document.getElementById('backBtn').onclick=()=>{studio.classList.add('hidden');home.classList.remove('hidden')};

function openStudio(){home.classList.add('hidden');studio.classList.remove('hidden')}

buildBtn.onclick=()=>{
 const text=prompt.value.trim();
 if(!text){prompt.focus();prompt.placeholder='Escribe primero qué web quieres forjar…';return}
 projectTitle.textContent=text.length>48?text.slice(0,48)+'…':text;
 openStudio();
 activities.forEach((x,i)=>{x.classList.toggle('current',i===0);x.querySelector('span').textContent=i===0?'◉':'○'});
 steps.forEach((x,i)=>x.classList.toggle('active',i===0));
 sitePreview.innerHTML='<div class="preview-empty"><img src="design/mascot/forja-forger.svg"><h3>FORJA está pensando…</h3><p>Este prototipo demuestra el flujo de trabajo. El Cerebro real se integrará en las siguientes fases.</p></div>';
 let n=0;
 const timer=setInterval(()=>{
   n++;
   if(n<6){
    steps.forEach((x,i)=>x.classList.toggle('active',i===n-1));
    activities.forEach((x,i)=>{x.classList.toggle('current',i===Math.min(n-1,3));x.querySelector('span').textContent=i===Math.min(n-1,3)?'◉':'○'});
   }else{
    clearInterval(timer);
    steps.forEach((x,i)=>x.classList.toggle('active',i===5));
    activities.forEach((x,i)=>{x.classList.toggle('current',i===3);x.querySelector('span').textContent=i===3?'◉':'○'});
    sitePreview.innerHTML='<div style="width:86%;height:86%;padding:34px;background:#f7f4ed;border-radius:18px;box-shadow:0 20px 50px #0002"><div style="height:12px;width:90px;background:#1e2024;border-radius:4px;margin-bottom:80px"></div><div style="max-width:520px"><div style="height:45px;width:78%;background:#1e2024;border-radius:8px;margin-bottom:14px"></div><div style="height:12px;width:65%;background:#bbb8b0;border-radius:4px;margin-bottom:28px"></div><button style="border:0;border-radius:9px;padding:12px 18px;background:#1e2024;color:white">Explorar</button></div></div>';
   }
 },550);
};

document.getElementById('downloadBtn').onclick=()=>{
 alert('La exportación ZIP será una función real del Project Engine. Esta versión conserva el botón como parte del contrato de UX.');
};
