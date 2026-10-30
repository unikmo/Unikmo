import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import connectDB from '@/lib/db';
import { getStripe, getStripeWebhookSecret } from '@/lib/stripe';
import { processPaidOrderAndGenerateCodes } from '@/lib/order-processing';
import { stripeOrderInput } from '@/lib/stripe-order-input';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = getStripeWebhookSecret();
  if (!signature || !webhookSecret) return NextResponse.json({ error: 'Stripe webhook is not configured' }, { status: 503 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch {
    console.warn('Stripe webhook signature verification failed');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.async_payment_succeeded') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== 'paid') return NextResponse.json({ received: true });
  let input;
  try { input = stripeOrderInput(session); }
  catch { return NextResponse.json({ error: 'Invalid checkout metadata' }, { status: 400 }); }

  try {
    await connectDB();
    await processPaidOrderAndGenerateCodes(input);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe fulfillment failed; requesting webhook retry:', error);
    return NextResponse.json({ error: 'Fulfillment pending retry' }, { status: 500 });
  }
}
