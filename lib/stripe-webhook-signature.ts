import {createHmac,timingSafeEqual} from 'node:crypto';
/** Validate Stripe-Signature over the exact raw request body. Reject stale or malformed events. */
export function verifyStripeSignature(raw:string,header:string|null,secret:string,nowSeconds=Math.floor(Date.now()/1000)):boolean {
  if(!header||!secret.startsWith('whsec_'))return false;
  const parts=header.split(',').map(x=>x.trim());
  const timestamp=parts.find(x=>x.startsWith('t='))?.slice(2);
  const signatures=parts.filter(x=>x.startsWith('v1=')).map(x=>x.slice(3));
  if(!timestamp||!/^[0-9]+$/.test(timestamp)||!signatures.length)return false;
  const time=Number(timestamp);
  if(!Number.isSafeInteger(time)||Math.abs(nowSeconds-time)>300)return false;
  const calculated=createHmac('sha256',secret).update(timestamp+'.'+raw).digest();
  for(const candidate of signatures){
    if(!/^[a-f0-9]{64}$/i.test(candidate))continue;
    const received=Buffer.from(candidate,'hex');
    if(received.length===calculated.length&&timingSafeEqual(received,calculated))return true;
  }
  return false;
}
