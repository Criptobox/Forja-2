const MAX_PROMPT=4000;
const ALLOWED=['index.html','styles.css','script.js'];

function json(res,status,body){
  res.status(status).setHeader('Content-Type','application/json; charset=utf-8');
  return res.end(JSON.stringify(body));
}

function safeFiles(files){
  if(!files || typeof files!=='object') throw new Error('Respuesta de archivos inválida');
  const out={};
  for(const name of ALLOWED){
    if(typeof files[name]==='string' && files[name].length<250000) out[name]=files[name];
  }
  if(!out['index.html']) throw new Error('La respuesta no contiene index.html');
  return out;
}

function fallback(prompt){
  const p=prompt.replace(/[<>]/g,'').slice(0,240);
  const lower=p.toLowerCase();
  let accent='#d66b3d', bg='#f5efe6', ink='#191817';
  if(lower.includes('jap')||lower.includes('minimal')){accent='#8c5b45';bg='#eee9df'}
  if(lower.includes('halloween')){accent='#d66b3d';bg='#171317';ink='#f7efe5'}
  if(lower.includes('hotel')){accent='#9b7650';bg='#eee8dc'}
  if(lower.includes('tienda')||lower.includes('zapat')){accent='#3158d4';bg='#eef1f7'}
  return {
    'index.html':`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${p}</title></head><body><header><div class="logo">FORJA</div><nav>Inicio · Experiencia · Contacto</nav></header><main><div class="tag">DISEÑO FORJADO</div><h1>${p}</h1><p>Una experiencia diseñada alrededor de tu idea, con una identidad propia y una composición pensada para este negocio.</p><button>Descubrir</button></main><section class="cards"><article><b>01</b><h2>Identidad</h2><p>Jerarquía, espacio y detalles coherentes con la propuesta.</p></article><article><b>02</b><h2>Experiencia</h2><p>Contenido organizado para que la visita tenga un propósito claro.</p></article><article><b>03</b><h2>Acción</h2><p>Un siguiente paso visible y natural para el visitante.</p></article></section></body></html>`,
    'styles.css':`:root{--accent:${accent};--bg:${bg};--ink:${ink}}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,system-ui,sans-serif}header{display:flex;justify-content:space-between;align-items:center;padding:28px 6vw;border-bottom:1px solid color-mix(in srgb,var(--ink) 12%,transparent)}.logo{font-weight:900;letter-spacing:.18em}nav{font-size:13px;opacity:.65}main{padding:11vh 8vw 8vh;max-width:1050px}.tag{font-size:11px;letter-spacing:.22em;font-weight:800;color:var(--accent)}h1{font-size:clamp(48px,8vw,100px);line-height:.92;letter-spacing:-.055em;max-width:900px;margin:22px 0}main p{max-width:580px;font-size:18px;line-height:1.65;opacity:.68}button{margin-top:18px;background:var(--ink);color:var(--bg);border:0;border-radius:10px;padding:14px 22px;font-weight:800}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:0 8vw 10vh}.cards article{padding:28px;background:color-mix(in srgb,var(--bg) 75%,white);border:1px solid color-mix(in srgb,var(--ink) 10%,transparent);border-radius:18px;box-shadow:0 18px 45px #0000000d}.cards b{color:var(--accent);font-size:11px}.cards h2{margin-bottom:5px}.cards p{opacity:.6;line-height:1.5}@media(max-width:700px){header{padding:20px 5vw}nav{display:none}.cards{grid-template-columns:1fr;padding:0 5vw 8vh}main{padding:8vh 5vw 6vh}}`,
    'script.js':`document.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{b.textContent='Listo ✓';setTimeout(()=>b.textContent='Descubrir',1200)}));`
  };
}

async function callProvider(prompt){
  const base=process.env.AI_BASE_URL;
  const key=process.env.AI_API_KEY;
  const model=process.env.AI_MODEL;
  if(!base || !key || !model) return null;
  const system=`Eres el generador web de FORJA. Devuelve SOLO JSON válido con esta forma: {"title":"string","files":{"index.html":"string","styles.css":"string","script.js":"string"}}. Genera una web completa, específica para el negocio descrito. No uses markdown fences. Solo puedes crear esos tres archivos. El HTML debe ser autocontenido estructuralmente y enlazar styles.css y script.js. Evita diseños genéricos. Usa contenido realista y coherente.`;
  const response=await fetch(base.replace(/\/$/, '')+'/chat/completions',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
    body:JSON.stringify({model,temperature:0.7,messages:[{role:'system',content:system},{role:'user',content:prompt}]})
  });
  if(!response.ok) throw new Error('Proveedor IA HTTP '+response.status);
  const data=await response.json();
  const content=data?.choices?.[0]?.message?.content;
  if(typeof content!=='string') throw new Error('El proveedor no devolvió contenido');
  const clean=content.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'').trim();
  const parsed=JSON.parse(clean);
  return safeFiles(parsed.files);
}

export default async function handler(req,res){
  if(req.method!=='POST') return json(res,405,{error:'Método no permitido'});
  try{
    const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
    const prompt=String(body.prompt||'').trim();
    if(!prompt) return json(res,400,{error:'Escribe una idea para la web'});
    if(prompt.length>MAX_PROMPT) return json(res,400,{error:'La idea es demasiado larga'});
    let files=await callProvider(prompt);
    let source='ai';
    if(!files){files=fallback(prompt);source='fallback'}
    return json(res,200,{title:prompt,files,source});
  }catch(e){
    return json(res,500,{error:e.message||'Error interno de generación'});
  }
}
