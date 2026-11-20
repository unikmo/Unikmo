import {NextRequest,NextResponse} from 'next/server';
import {randomUUID} from 'node:crypto';
import {STANDARD,CURATED,EXTRA_PRICE_ENV,isStandardSku,isCuratedSku,allowedShippingCountries,priceId,stripeKey} from '@/lib/stripe-catalog';
import {activePrice,stripePost} from '@/lib/stripe-http';
export const runtime='nodejs';
export const dynamic='force-dynamic';
type RequestBody={sku?:unknown;extras?:unknown};
export async function POST(request:NextRequest){
  try{
    stripeKey();
    const body=await request.json() as RequestBody;
    const sku=body.sku;
    if(!isStandardSku(sku)&&!isCuratedSku(sku))return NextResponse.json({error:'Invalid product'},{status:400});
    const curated=isCuratedSku(sku),extra=curated?Number(body.extras??0):0;
    if(!Number.isSafeInteger(extra)||extra<0||extra>25)return NextResponse.json({error:'Invalid extras'},{status:400});
    const env=isStandardSku(sku)?STANDARD[sku].env:CURATED[sku].env;
    const selectedPrice=priceId(env);
    const main=await activePrice(selectedPrice);
    if(main.currency!=='usd')throw new Error('Unsupported currency');
    const isPhysical=isStandardSku(sku)||(isCuratedSku(sku)&&CURATED[sku].physical)||extra>0;
    const extrasPrice=extra>0?priceId(EXTRA_PRICE_ENV):null;
    if(extrasPrice){const p=await activePrice(extrasPrice);if(p.currency!=='usd')throw new Error('Mismatched currency');}
    const origin=new URL(request.url).origin;
    const canonical=(process.env.NEXT_PUBLIC_SITE_URL||process.env.BASE_URL||origin).replace(/\/$/,'');
    const u=new URL(canonical);
    if(u.protocol!=='https:'&&u.hostname!=='localhost')throw new Error('Invalid site origin');
    const session=new URLSearchParams();
    session.set('mode','payment');session.set('success_url',u.origin+'/checkout/success?session_id={CHECKOUT_SESSION_ID}');
    session.set('cancel_url',u.origin+'/#shop');
    session.set('client_reference_id',randomUUID());
    session.set('line_items[0][price]',selectedPrice);session.set('line_items[0][quantity]','1');
    session.set('customer_creation','always');
    session.set('billing_address_collection','required');
    session.set('phone_number_collection[enabled]','true');
    session.set('metadata[sku]',sku);
    session.set('metadata[extra_cards]',String(extra));
    session.set('metadata[commerce_provider]','stripe');
    if(extrasPrice){session.set('line_items[1][price]',extrasPrice);session.set('line_items[1][quantity]',String(extra));}
    if(isPhysical){
      const countries=allowedShippingCountries();
      countries.forEach((code,i)=>session.set('shipping_address_collection[allowed_countries]['+i+']',code));
      const rate=process.env.STRIPE_SHIPPING_RATE_ID;
      if(!rate||!/^shr_[A-Za-z0-9]+$/.test(rate))throw new Error('Verified shipping rate missing');
      session.set('shipping_options[0][shipping_rate]',rate);
    }
    if(process.env.STRIPE_AUTOMATIC_TAX_ENABLED==='true')session.set('automatic_tax[enabled]','true');
    const result=await stripePost<{id:string;url:string|null}>('/checkout/sessions',session,'checkout-'+session.get('client_reference_id'));
    if(!result.url||!result.url.startsWith('https://checkout.stripe.com/'))throw new Error('No secure Stripe checkout URL');
    return NextResponse.json({url:result.url},{headers:{'Cache-Control':'no-store'}});
  }catch(error){
    console.error('[stripe-checkout]',error instanceof Error?error.message:'unavailable');
    return NextResponse.json({error:'Checkout is not yet available. Please contact us for help.'},{status:503,headers:{'Cache-Control':'no-store'}});
  }
}
