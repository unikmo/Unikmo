import { NextResponse } from 'next/server';
/** Shopify-cart legacy endpoint. Never issue a new Shopify redirect. */
export async function POST(){
 return NextResponse.json({error:'This checkout endpoint has moved. Please use secure Stripe checkout on the UNIKMO site.'},{status:410});
}
