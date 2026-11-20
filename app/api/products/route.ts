import {NextResponse} from 'next/server';
import {STANDARD,priceId,stripeKey} from '@/lib/stripe-catalog';
import {activePrice} from '@/lib/stripe-http';
export const dynamic='force-dynamic';
export const runtime='nodejs';
export async function GET(){
  try {
    stripeKey();
    const products=await Promise.all((Object.entries(STANDARD) as Array<[keyof typeof STANDARD,(typeof STANDARD)[keyof typeof STANDARD]]>).map(async ([sku,config])=>{
      const p=await activePrice(priceId(config.env));
      return {id:sku,sku,title:config.name,cardCount:config.cards,image:config.image,imageAlt:config.name,
        price:(p.unit_amount!/100).toFixed(2),currencyCode:p.currency.toUpperCase()};
    }));
    if(products.some(x=>x.currencyCode!=='USD'))throw new Error('Unapproved currency');
    return NextResponse.json({available:true,products},{headers:{'Cache-Control':'no-store'}});
  }catch(error){
    console.error('[stripe-catalog]',error instanceof Error?error.message:'unavailable');
    return NextResponse.json({available:false,products:[],message:'Ordering is temporarily unavailable.'},{status:503,headers:{'Cache-Control':'no-store'}});
  }
}
