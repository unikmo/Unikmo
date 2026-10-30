import type Stripe from 'stripe';
import type { ProcessOrderInput } from './order-processing';
import type { DeliveryType, Quantity } from './code-generator';

/** Only call with a session retrieved from Stripe or a verified Stripe event. */
export function stripeOrderInput(session: Stripe.Checkout.Session): ProcessOrderInput {
  if (session.payment_status !== 'paid') throw new Error('Payment is not complete');
  const email = session.customer_details?.email || session.customer_email;
  const quantity = Number(session.metadata?.momentQuantity) as Quantity;
  const deliveryType = session.metadata?.deliveryType as DeliveryType;
  const purchaseQuantity = Number(session.metadata?.purchaseQuantity || 1);
  if (!email || ![1, 4, 7].includes(quantity) || !['digital', 'physical', 'split'].includes(deliveryType)
    || !Number.isSafeInteger(purchaseQuantity) || purchaseQuantity < 1 || purchaseQuantity > 50) {
    throw new Error('Invalid paid checkout metadata');
  }
  return {
    orderReference: session.id, orderNumber: session.id, orderName: session.id,
    email, customerName: session.customer_details?.name || '',
    totalPrice: (session.amount_total || 0) / 100,
    currency: (session.currency || 'usd').toUpperCase(),
    lineItems: [{ product_id: session.metadata?.productKey || '', variant_id: deliveryType, quantity: purchaseQuantity }],
    codesToGenerate: [{ quantity, deliveryType, orderQuantity: purchaseQuantity }],
    source: 'stripe', paymentProvider: 'stripe',
  };
}
