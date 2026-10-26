import { NextRequest, NextResponse } from 'next/server';
import { getCommerceProduct } from '@/lib/commerce-products';
import { getStripe } from '@/lib/stripe';
import type { CuratedDeliveryKey, CuratedExperienceKey } from '@/lib/curated-products';

export const runtime = 'nodejs';

interface CheckoutRequest {
  experience?: string;
  delivery?: string;
  extraKeepsakes?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutRequest;
    const experience: CuratedExperienceKey = /times square|show it/i.test(body.experience ?? '') ? 'SHOW_IT' : 'KEEP_IT';
    const delivery: CuratedDeliveryKey = /digital/i.test(body.delivery ?? '') ? 'digital' : 'physical';
    const extraKeepsakes = Math.max(0, Math.min(25, Math.floor(Number(body.extraKeepsakes) || 0)));
    const product = getCommerceProduct(experience === 'KEEP_IT' ? 'curated-keep' : 'curated-show');
    if (!product) return NextResponse.json({ error: 'Unknown product' }, { status: 400 });
    const origin = process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.BASE_URL?.replace(/\/$/, '') || request.nextUrl.origin;
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      customer_creation: 'always',
      shipping_address_collection: delivery === 'digital' ? undefined : { allowed_countries: ['US', 'CA', 'GB', 'DE', 'FR', 'NL', 'BE', 'AT', 'CH'] },
      line_items: [
        { quantity: 1, price_data: { currency: product.currency, unit_amount: product.unitAmount, product_data: { name: product.name, description: product.description } } },
        ...(extraKeepsakes > 0 ? [{ quantity: extraKeepsakes, price_data: { currency: 'usd', unit_amount: 1200, product_data: { name: 'Extra Keepsake Card' } } }] : []),
      ],
      metadata: { productKey: product.key, momentQuantity: String(product.momentQuantity), deliveryType: delivery, purchaseQuantity: '1', extraKeepsakes: String(extraKeepsakes) },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/curated`,
    });
    return NextResponse.json({ success: true, checkoutUrl: session.url, experience, delivery, extraKeepsakes });
  } catch (error) {
    console.error('Curated checkout error:', error);
    return NextResponse.json({ error: 'Unable to start checkout' }, { status: 500 });
  }
}
