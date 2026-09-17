import fs from 'node:fs';
const required=['README.md','AGENTS.md','VERSION.json','docs/BUILD_PROGRESS.md','docs/ARCHITECTURE.md','docs/DESIGN.md','docs/ROADMAP.md','tools/github-zip-publisher.html'];
const missing=required.filter(x=>!fs.existsSync(x));
if(missing.length){console.error('Missing:',missing.join(', '));process.exit(1)}
console.log('FORJA structure OK');
