import fs from 'node:fs';
const required=['index.html','package.json','vercel.json','api/generate.mjs','src/app.js','src/styles.css','docs/DESIGN_DIVERSITY.md','VERSION.json'];
const missing=required.filter(x=>!fs.existsSync(x));
if(missing.length){console.error('Faltan:',missing);process.exit(1)}
console.log('FORJA v0.4.0-alpha OK — diversity engine included');
