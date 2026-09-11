import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function GET() {
  const secretConfigured = Boolean(process.env.STRIPE_SECRET_KEY);
  const webhookConfigured = Boolean(process.env.STRIPE_WEBHOOK_SECRET);
  const keyMode = process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 'live' : 'test';
  const previewOrigin = process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;
  const baseUrl = (previewOrigin || process.env.BASE_URL || 'https://unikmo.com').replace(/\/$/, '');

  if (!secretConfigured) {
    return NextResponse.json({ connected: false, secretConfigured, webhookConfigured, keyMode, webhookUrl: `${baseUrl}/api/webhooks/stripe` });
  }

  try {
    const account = await getStripe().accounts.retrieve();
    return NextResponse.json({
      connected: true,
      secretConfigured,
      webhookConfigured,
      keyMode,
      webhookUrl: `${baseUrl}/api/webhooks/stripe`,
      accountId: account.id,
      businessName: account.business_profile?.name || account.settings?.dashboard?.display_name || null,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
    });
  } catch (error) {
    console.error('Stripe connection check failed:', error);
    return NextResponse.json({ connected: false, secretConfigured, webhookConfigured, keyMode, webhookUrl: `${baseUrl}/api/webhooks/stripe`, error: 'Stripe credentials could not be verified' });
  }
}
