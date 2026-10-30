import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) throw new Error('STRIPE_SECRET_KEY is not configured');
  if (process.env.VERCEL_ENV === 'preview' && !/^(sk|rk)_test_/.test(secretKey)) throw new Error('Preview requires a Stripe test key');
  if (!stripeClient) stripeClient = new Stripe(secretKey);
  return stripeClient;
}

export function stripeIsConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && getStripeWebhookSecret());
}

export function getStripeWebhookSecret(): string | undefined {
  return (process.env.VERCEL_ENV === 'preview'
    ? process.env.Stripe_Preview_v2 || process.env.STRIPE_WEBHOOK_SECRET
    : process.env.STRIPE_WEBHOOK_SECRET)?.trim();
}
