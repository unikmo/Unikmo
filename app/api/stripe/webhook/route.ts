import {NextRequest,NextResponse} from 'next/server';
import {verifyStripeSignature} from '@/lib/stripe-webhook-signature';
import {stripeKey,STANDARD,CURATED,EXTRA_PRICE_ENV,isStandardSku,isCuratedSku,priceId} from '@/lib/stripe-catalog';
import {stripeGet} from '@/lib/stripe-http';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import MomentCode from '@/models/MomentCode';
import StripeCuratedOrder from '@/models/StripeCuratedOrder';
import {processPaidOrderAndGenerateCodes} from '@/lib/order-processing';
import {sendEmail,sendMomentCodesEmail} from '@/lib/email';
export const runtime='nodejs';export const dynamic='force-dynamic';
type Line={price:{id:string};quantity:number};
type Session={id:string;livemode:boolean;payment_status:string;currency:string;amount_total:number;metadata:Record<string,string>;
  customer_details?:{email?:string|null;name?:string|null};customer_email?:string|null};
type Event={id:string;type:string;livemode:boolean;data:{object:Session}};
function escapeHtml(x:string){return x.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));}
async function verifiedLines(session:Session):Promise<{sku:string;extra:number}>{
 const sku=session.metadata?.sku;
 if(!isStandardSku(sku)&&!isCuratedSku(sku))throw new Error('Unrecognized Stripe SKU');
 const extra=isCuratedSku(sku)?Number(session.metadata?.extra_cards||0):0;
 if(!Number.isSafeInteger(extra)||extra<0||extra>25)throw new Error('Invalid Stripe extras');
 if(session.currency!=='usd'||session.amount_total<=0)throw new Error('Invalid currency/amount');
 const expectedMain=priceId(isStandardSku(sku)?STANDARD[sku].env:CURATED[sku].env);
 const lines=await stripeGet<{data:Line[]}>('/checkout/sessions/'+encodeURIComponent(session.id)+'/line_items?limit=10');
 if(lines.data.length!== (extra>0?2:1) || lines.data[0].price.id!==expectedMain || lines.data[0].quantity!==1)throw new Error('Stripe payment item mismatch');
 if(extra>0&&(lines.data[1].price.id!==priceId(EXTRA_PRICE_ENV)||lines.data[1].quantity!==extra))throw new Error('Stripe extra items mismatch');
 return {sku,extra};
}
async function deliverStandard(session:Session,sku:keyof typeof STANDARD,email:string){
 const cards=STANDARD[sku].cards;
 const key='stripe:'+session.id;
 let order=await Order.findOne({shopifyOrderId:key});
 if(!order){
  const result=await processPaidOrderAndGenerateCodes({
    shopifyOrderId:key,shopifyOrderNumber:session.id,shopifyOrderName:session.id,
    email,totalPrice:session.amount_total/100,currency:'USD',
    lineItems:[{product_id:'stripe:'+sku,variant_id:priceId(STANDARD[sku].env),quantity:1}],
    codesToGenerate:[{quantity:cards,deliveryType:'physical',orderQuantity:1}],
    source:'webhook',tags:['stripe','standard'],customerName:session.customer_details?.name||'',
    deferCodeEmail:true
  });
  if(result.generatedCodes.length!==cards)throw new Error('Incomplete paid-order code generation');
  order=await Order.findOne({shopifyOrderId:key});
 }
 if(!order)throw new Error('Missing paid order after processing');
 const codes=await MomentCode.find({order:order._id}).sort({_id:1}).select('code');
 if(codes.length!==cards)throw new Error('Code count mismatch; manual attention required');
 if(!order.stripeCodesEmailSentAt){
   await sendMomentCodesEmail(email,codes.map(c=>c.code),session.id);
   order.stripeCodesEmailSentAt=new Date();
   await order.save();
 }
}
async function deliverCurated(session:Session,sku:keyof typeof CURATED,email:string,extra:number){
 let order=await StripeCuratedOrder.findOne({sessionId:session.id});
 if(!order){
   try{order=await StripeCuratedOrder.create({sessionId:session.id,email,sku,extraCards:extra,totalCents:session.amount_total,status:'pending'});}
   catch(e){order=await StripeCuratedOrder.findOne({sessionId:session.id});if(!order)throw e;}
 }
 if(!order.buyerNotifiedAt){
   const safe=escapeHtml(session.id);
   const ok=await sendEmail(email,'Your UNIKMO Curated order — next steps',
     '<p>Thank you for choosing UNIKMO Curated.</p><p>We will contact you to gather the photos, voice notes and memories you choose to share.</p>'+
     '<p>Do not send private recordings or codes in response to unexpected requests. We will confirm the secure submission process.</p><p>Order: '+safe+'</p>');
   if(!ok)throw new Error('Buyer notice failed');
   order.buyerNotifiedAt=new Date();await order.save();
 }
 if(!order.staffNotifiedAt){
   const to=process.env.CURATED_ORDER_EMAIL;
   if(!to||!/^\S+@\S+\.\S+$/.test(to))throw new Error('Curated fulfillment destination missing');
   const ok=await sendEmail(to,'Paid UNIKMO Curated order — arrange fulfillment',
     '<p>New paid curated order. Confirm the scope and delivery with the buyer before collecting materials.</p>'+
     '<p>Session: '+escapeHtml(session.id)+'</p><p>Buyer: '+escapeHtml(email)+'</p>'+
     '<p>Edition: '+escapeHtml(sku)+'</p><p>Extra physical cards: '+extra+'</p>');
   if(!ok)throw new Error('Staff notification failed');
   order.staffNotifiedAt=new Date();await order.save();
 }
 order.status='notified';await order.save();
}
export async function POST(request:NextRequest){
 let raw='';
 try{
  raw=await request.text();
  if(raw.length>1000000)return NextResponse.json({error:'Invalid event'},{status:400});
  const secret=process.env.STRIPE_WEBHOOK_SECRET||'';
  if(!verifyStripeSignature(raw,request.headers.get('stripe-signature'),secret))return NextResponse.json({error:'Invalid signature'},{status:400});
  const event=JSON.parse(raw) as Event;
  if(event.type!=='checkout.session.completed'&&event.type!=='checkout.session.async_payment_succeeded')return NextResponse.json({received:true});
  const session=event.data.object;
  if(!session||!/^cs_(test_)?[a-zA-Z0-9_]+$/.test(session.id)||session.payment_status!=='paid')return NextResponse.json({received:true});
  const key=stripeKey();
  if(event.livemode!==key.startsWith('sk_live_')||session.livemode!==event.livemode)throw new Error('Stripe mode mismatch');
  // Never issue keys or send notifications on unapproved production configuration.
  if(process.env.STRIPE_FULFILLMENT_ENABLED!=='true')throw new Error('Stripe fulfillment not enabled');
  if(process.env.EMAIL_PROVIDER!=='smtp')throw new Error('Authenticated SMTP is required for private-key delivery');
  if(!/^https:\/\/[^/]+/.test(process.env.BASE_URL||''))throw new Error('Verified https BASE_URL is required for private-key links');
  const email=(session.customer_details?.email||session.customer_email||'').trim().toLowerCase();
  if(!/^\S+@\S+\.\S+$/.test(email))throw new Error('Paid Stripe checkout missing customer email');
  const {sku,extra}=await verifiedLines(session);
  await connectDB();
  if(isStandardSku(sku))await deliverStandard(session,sku,email);
  else if(isCuratedSku(sku))await deliverCurated(session,sku,email,extra);
  return NextResponse.json({received:true});
 }catch(error){
  console.error('[stripe-webhook] fulfillment requires review',error instanceof Error?error.message:'unknown');
  return NextResponse.json({error:'Fulfillment pending verification'},{status:503});
 }
}
