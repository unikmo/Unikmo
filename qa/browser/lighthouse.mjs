import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
const base = process.env.QA_BASE_URL || 'https://unikmo.com';
mkdirSync('../../qa-results/lighthouse',{recursive:true});
const browser = await chromium.launch({args:['--remote-debugging-port=9222','--no-sandbox']});
let failed=false;
try {
  for (const route of ['/','/curated','/hotels','/contact','/how-unikmo-works']) {
    const file = '../../qa-results/lighthouse/'+(route==='/'?'home':route.slice(1))+'.json';
    const result = spawnSync(process.execPath,['./node_modules/lighthouse/cli/index.js',new URL(route,base).href,'--port=9222','--output=json','--output-path='+file,'--only-categories=performance,accessibility,best-practices,seo','--quiet'],{stdio:'inherit',timeout:180000});
    if (result.status!==0) {failed=true;continue;}
    const report=JSON.parse(readFileSync(file,'utf8'));
    const scores=Object.fromEntries(Object.entries(report.categories).map(([name,c])=>[name,c.score===null?null:Math.round(c.score*100)]));
    console.log(route,JSON.stringify(scores));
    if (Object.values(scores).some(score=>score===null||score<90)) failed=true;
  }
} finally {await browser.close();}
if(failed) process.exitCode=1;
