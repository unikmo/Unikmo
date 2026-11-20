import { NextResponse } from 'next/server';

// Shopify commerce is retired. Keep historical paid orders in the database,
// but never reconnect checkout, credentials, or paid-order webhooks.
const retired = () => NextResponse.json(
  { error: 'Shopify payments retired; Stripe is the sole checkout provider' },
  { status: 410, headers: { 'Cache-Control': 'no-store' } },
);
export const POST = retired;
