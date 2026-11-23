import {strict as assert} from 'node:assert';
const origin='https://unikmo.com';
const roots=['/','/contact','/how-unikmo-works','/curated','/hotels','/faq','/privacy','/cookies','/terms','/imprint','/thoughtful-gifts','/sentimental-gifts','/personalized-birthday-gifts','/personalized-anniversary-gifts','/long-distance-gifts','/personalized-video-message','/qr-code-gift','/unlock'];
const seen=new Set(roots);
const hits=new Map();
for(const root of roots){
 const response=await fetch(origin+root,{signal:AbortSignal.timeout(15000)});
 assert.equal(response.status,200,'Base public route failed '+root);
 const html=await response.text();
 for(const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)){
  const href=match[1].replaceAll('&amp;','&');
  if(/^(#|mailto:|tel:|javascript:)/i.test(href))continue;
  try{
   const url=new URL(href,origin+root);
   if(!['unikmo.com','www.unikmo.com'].includes(url.hostname))continue;
   if(url.pathname.startsWith('/_next/')||url.pathname.startsWith('/api/'))continue;
   seen.add(url.pathname);
   hits.set(url.pathname,(hits.get(url.pathname)||0)+1);
  }catch{}
 }
}
const broken=[];
for(const path of seen){
 try{
  const res=await fetch(origin+path,{method:'GET',redirect:'follow',signal:AbortSignal.timeout(20000)});
  if(res.status>=400)broken.push({path,status:res.status,linked:hits.get(path)||0});
 }catch(e){broken.push({path,error:String(e),linked:hits.get(path)||0});}
}
console.log('INTERNAL_LINK_AUDIT',JSON.stringify({pagesScanned:roots.length,internalDestinations:seen.size,broken}));
if(broken.some(x=>x.linked>0))process.exitCode=1;
