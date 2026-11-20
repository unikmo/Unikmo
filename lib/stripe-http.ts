import { stripeKey } from './stripe-catalog';
const API='https://api.stripe.com/v1';
export async function stripeGet<T>(path:string):Promise<T>{
  const r=await fetch(API+path,{headers:{Authorization:'Bearer '+stripeKey()},cache:'no-store'});
  const body=await r.json();
  if(!r.ok)throw new Error('Stripe retrieval failed ('+r.status+'): '+String(body?.error?.type||'error'));
  return body as T;
}
export async function stripePost<T>(path:string,params:URLSearchParams,idempotencyKey:string):Promise<T>{
  const r=await fetch(API+path,{method:'POST',headers:{Authorization:'Bearer '+stripeKey(),'Content-Type':'application/x-www-form-urlencoded','Idempotency-Key':idempotencyKey},body:params.toString(),cache:'no-store'});
  const body=await r.json();
  if(!r.ok)throw new Error('Stripe request failed ('+r.status+'): '+String(body?.error?.type||'error'));
  return body as T;
}
export type StripePrice={id:string;active:boolean;unit_amount:number|null;currency:string;type:string};
export async function activePrice(id:string):Promise<StripePrice>{
  const p=await stripeGet<StripePrice>('/prices/'+encodeURIComponent(id));
  if(!p.active||p.type!=='one_time'||!Number.isInteger(p.unit_amount)||p.unit_amount!<=0)throw new Error('Invalid Stripe one-time price configuration');
  return p;
}
