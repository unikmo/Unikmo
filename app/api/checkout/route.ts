import { termsConsent } from '@/lib/checkout-consent';
import { NextRequest, NextResponse } from 'next/server';
import { getCommerceProduct } from '@/lib/commerce-products';
import { getStripe } from '@/lib/stripe';
import type { DeliveryType } from '@/lib/code-generator';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const nativeForm = request.headers.get('content-type')?.includes('application/x-www-form-urlencoded') === true;
  const fail = (message: string, status: number) => {
    if (!nativeForm) return NextResponse.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } });
    const target = new URL('/', request.url);
    target.searchParams.set('checkout_error', message);
    target.hash = 'shop';
    return NextResponse.redirect(target, 303);
  };
  try {
    let body;
    if (nativeForm) {
      const form = await request.formData();
      const key = form.get('productKey');
      if (key !== 'single' && key !== 'four' && key !== 'seven') return fail('Invalid card bundle. Please try again.', 400);
      body = { productKey: key, deliveryType: 'physical', quantity: 1 };
    } else {
      body = await request.json();
    }
    if (body.productKey === 'curated-show') {
      return fail('Times Square Edition is coming soon', 400);
    }
    const product = getCommerceProduct(body.productKey);
    const deliveryType = String(body.deliveryType || 'digital') as DeliveryType;
    const quantity = Math.max(1, Math.min(50, Math.floor(Number(body.quantity) || 1)));
    const extraKeepsakes = Math.max(0, Math.min(25, Math.floor(Number(body.extraKeepsakes) || 0)));
    if (!product || !product.allowedDeliveryTypes.includes(deliveryType)) {
      return fail('Invalid product or delivery type', 400);
    }

    const previewOrigin = process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : null;
    const origin = previewOrigin || process.env.BASE_URL?.replace(/\/$/, '') || request.nextUrl.origin;
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      adaptive_pricing: { enabled: false },
      ...termsConsent(),
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
    if (!session.url) throw new Error('Stripe returned a checkout session without a URL');
    if (nativeForm) return NextResponse.redirect(session.url, 303);
    return NextResponse.json({ checkoutUrl: session.url }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const reference = crypto.randomUUID();
    const details = error as { type?: string; code?: string; param?: string; requestId?: string; name?: string };
    console.error('Stripe checkout error', { reference, type: details?.type || details?.name, code: details?.code, param: details?.param, requestId: details?.requestId });
    return fail(`Unable to start secure checkout. Please try again or contact support with reference ${reference}.`, 500);
  }
}
