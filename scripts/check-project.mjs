import fs from 'node:fs';
const required=['index.html','package.json','vercel.json','src/styles.css','src/app.js','README.md','VERSION.json','docs/BUILD_PROGRESS.md'];
const missing=required.filter(f=>!fs.existsSync(f));
if(missing.length){console.error('Faltan:',missing.join(', '));process.exit(1)}
console.log('FORJA deployable structure OK');
