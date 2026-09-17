import fs from 'node:fs';
const required=['index.html','package.json','vercel.json','api/generate.mjs','src/styles.css','src/app.js','README.md','VERSION.json','docs/BUILD_PROGRESS.md'];
const missing=required.filter(x=>!fs.existsSync(x));
if(missing.length){console.error('Faltan:',missing.join(', '));process.exit(1)}
console.log('FORJA v0.3.0-alpha deployable structure OK');
