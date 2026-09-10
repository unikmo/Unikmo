import { NextRequest, NextResponse } from 'next/server';
import { getCommerceProduct } from '@/lib/commerce-products';
import { getStripe } from '@/lib/stripe';
import type { DeliveryType } from '@/lib/code-generator';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = getCommerceProduct(body.productKey);
    const deliveryType = String(body.deliveryType || 'digital') as DeliveryType;
    const quantity = Math.max(1, Math.min(50, Math.floor(Number(body.quantity) || 1)));
    const extraKeepsakes = Math.max(0, Math.min(25, Math.floor(Number(body.extraKeepsakes) || 0)));
    if (!product || !product.allowedDeliveryTypes.includes(deliveryType)) {
      return NextResponse.json({ error: 'Invalid product or delivery type' }, { status: 400 });
    }

    const origin = process.env.BASE_URL?.replace(/\/$/, '') || request.nextUrl.origin;
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      customer_creation: 'always',
      customer_email: typeof body.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) ? body.email.toLowerCase() : undefined,
      billing_address_collection: 'auto',
      shipping_address_collection: deliveryType === 'digital' ? undefined : { allowed_countries: ['US', 'CA', 'GB', 'DE', 'FR', 'NL', 'BE', 'AT', 'CH'] },
      allow_promotion_codes: true,
      line_items: [{
        quantity,
        price_data: {
          currency: product.currency,
          unit_amount: product.unitAmount,
          product_data: { name: product.name, description: product.description },
        },
      }, ...(extraKeepsakes > 0 ? [{
        quantity: extraKeepsakes,
        price_data: {
          currency: 'usd' as const,
          unit_amount: 1200,
          product_data: { name: 'Extra Keepsake Card', description: 'Additional physical card for the same finished memory' },
        },
      }] : [])],
      metadata: {
        productKey: product.key,
        momentQuantity: String(product.momentQuantity),
        deliveryType,
        purchaseQuantity: String(quantity),
        extraKeepsakes: String(extraKeepsakes),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#shop`,
    });
    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Unable to start checkout' }, { status: 500 });
  }
}
