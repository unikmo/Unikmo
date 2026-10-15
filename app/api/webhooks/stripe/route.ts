import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import connectDB from '@/lib/db';
import { getStripe } from '@/lib/stripe';
import { processPaidOrderAndGenerateCodes } from '@/lib/order-processing';
import type { DeliveryType, Quantity } from '@/lib/code-generator';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) return NextResponse.json({ error: 'Stripe webhook is not configured' }, { status: 503 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch (error) {
    console.error('Invalid Stripe webhook signature:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.async_payment_succeeded') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== 'paid') return NextResponse.json({ received: true });
  const email = session.customer_details?.email || session.customer_email;
  if (!email) return NextResponse.json({ error: 'Paid session has no customer email' }, { status: 400 });

  const momentQuantity = Number(session.metadata?.momentQuantity) as Quantity;
  const deliveryType = session.metadata?.deliveryType as DeliveryType;
  const purchaseQuantity = Math.max(1, Number(session.metadata?.purchaseQuantity) || 1);
  if (![1, 4, 7].includes(momentQuantity) || !['digital', 'physical', 'split'].includes(deliveryType)) {
    return NextResponse.json({ error: 'Invalid checkout metadata' }, { status: 400 });
  }

  await connectDB();
  await processPaidOrderAndGenerateCodes({
    shopifyOrderId: session.id,
    shopifyOrderNumber: session.id,
    shopifyOrderName: session.id,
    email,
    customerName: session.customer_details?.name || '',
    totalPrice: (session.amount_total || 0) / 100,
    currency: (session.currency || 'usd').toUpperCase(),
    lineItems: [{ product_id: session.metadata?.productKey || '', variant_id: deliveryType, quantity: purchaseQuantity }],
    codesToGenerate: Array.from({ length: purchaseQuantity }, () => ({ quantity: momentQuantity, deliveryType, orderQuantity: 1 })),
    source: 'stripe',
    paymentProvider: 'stripe',
  });
  return NextResponse.json({ received: true });
}
