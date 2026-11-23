import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const base = process.env.RENDER_BASE || 'https://unikmo.com';
const paths = ['/', '/contact','/how-unikmo-works','/curated','/hotels','/faq','/privacy','/cookies','/terms','/imprint','/thoughtful-gifts','/sentimental-gifts','/personalized-birthday-gifts','/personalized-anniversary-gifts','/long-distance-gifts','/personalized-video-message','/qr-code-gift', '/unlock','/shop','/corporate','/hotel','/cruise'];
const browser = await chromium.launch({headless:true});
await fs.mkdir('render-audit', {recursive:true});
const output=[];
for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
 const context = await browser.newContext({viewport,deviceScaleFactor:1});
 const page = await context.newPage();
 for(const path of paths){
   const errors=[];
   const err=e=>errors.push(e.message);
   page.on('pageerror',err);
   let response=null;
   try{
     response = await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:30000});
     await page.waitForTimeout(800);
     const stats=await page.evaluate(()=>{
       const els=[...document.querySelectorAll('header,nav,footer,main,h1,button,input')];
       const findText=s=>document.body.innerText.split('\n').filter(x=>x.trim()===s).length;
       const headings=[...document.querySelectorAll('h1')].map(e=>e.textContent.trim()).slice(0,5);
       const footers=[...document.querySelectorAll('footer')];
       const navs=[...document.querySelectorAll('nav')].map(n=>n.innerText.trim().replace(/\s+/g,' ').slice(0,200));
       const mainRect=document.querySelector('main')?.getBoundingClientRect();
       const imageErrors=[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src.slice(0,150));
       const header=document.querySelector('header'); const headerR=header?.getBoundingClientRect();
       const visibleBoxes=[...document.querySelectorAll('body *')].filter(x=>{const r=x.getBoundingClientRect(); const s=getComputedStyle(x); return s.visibility!=='hidden'&&s.display!=='none'&&r.width>0&&r.height>0;});
       const lowContrast=[];
       for(const e of visibleBoxes.filter(x=>x.children.length===0 && x.textContent?.trim()).slice(0,160)){
        const s=getComputedStyle(e); const v=s.color; const t=e.textContent.trim().slice(0,42);
        if(/rgba?\(\s*(?:\d+\s*,\s*){3}0\./.test(v))lowContrast.push({t,color:v});
       }
       return {title:document.title,headings,main:!!document.querySelector('main'),
        viewport:innerWidth,htmlScrollWidth:document.documentElement.scrollWidth,bodyHeight:document.body.scrollHeight,
        navs,footerCount:footers.length, footerText:footers.map(x=>x.innerText.trim().slice(0,550)),
        contactLinkCount:[...document.querySelectorAll('a[href="/contact"]')].length,
        imagesBroken:imageErrors,headerBottom:headerR?.bottom,mainTop:mainRect?.top,lowContrast:lowContrast.slice(0,10),
        privacyTextOccurrences:findText('Privacy'), contactTextOccurrences:findText('Contact')};
     });
     const file='render-audit/'+(path==='/'?'home':path.slice(1).replace(/\//g,'-'))+'-'+viewport.width+'.png';
     if(response?.status()===200) await page.screenshot({path:file,fullPage:true,animations:'disabled'});
     output.push({path,width:viewport.width,status:response?.status(),errors,...stats,screenshot:response?.status()===200?file:null});
   }catch(error){output.push({path,width:viewport.width,status:response?.status(),error:String(error)});}
   page.off('pageerror',err);
 }
 await context.close();
}
await fs.writeFile('render-audit/report.json',JSON.stringify(output,null,2));
for(const e of output){
 console.log('PAGE_AUDIT',JSON.stringify({path:e.path,width:e.width,status:e.status,overflow:e.htmlScrollWidth>e.viewport+2,footerCount:e.footerCount,navCount:e.navs?.length,contactLinks:e.contactLinkCount,brokenImages:e.imagesBroken?.length,headings:e.headings,error:e.error,jsErrors:e.errors}));
}
console.log('AUDIT_COUNTS',JSON.stringify({pages:paths.length,viewportChecks:output.length,ok:output.filter(x=>x.status===200&&!x.error).length,broken:output.filter(x=>x.error||x.status>=400||x.htmlScrollWidth>x.viewport+2||x.errors?.length||x.imagesBroken?.length).map(x=>({path:x.path,width:x.width,status:x.status,error:x.error,brokenImages:x.imagesBroken,overflow:x.htmlScrollWidth>x.viewport+2,jsErrors:x.errors}))}));
await browser.close();
