import { NextResponse } from 'next/server';
import {CURATED,CURATED_EXPECTED_CENTS,EXTRA_PRICE_ENV,priceId,stripeKey} from '@/lib/stripe-catalog';
import {activePrice} from '@/lib/stripe-http';
export const runtime='nodejs'; export const dynamic='force-dynamic';
export async function GET(){
 try{
  stripeKey();
  const prices=await Promise.all(Object.values(CURATED).map(async p=>activePrice(priceId(p.env))));
  const items=Object.values(CURATED);
  if(prices.some((p,i)=>p.currency!=='usd'||p.unit_amount!==CURATED_EXPECTED_CENTS[items[i].kind]))throw new Error('Published curated prices mismatch');
  const extra=await activePrice(priceId(EXTRA_PRICE_ENV));
  if(extra.currency!=='usd'||extra.unit_amount!==CURATED_EXPECTED_CENTS.extra)throw new Error('Published extra price mismatch');
  return NextResponse.json({available:true,keep:199,show:399,extra:12},{headers:{'Cache-Control':'no-store'}});
 }catch(error){console.error('[curated-catalog]',error instanceof Error?error.message:'unavailable');return NextResponse.json({available:false},{status:503,headers:{'Cache-Control':'no-store'}});}
}
