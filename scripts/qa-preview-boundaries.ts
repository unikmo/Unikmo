import assert from 'node:assert/strict';
import { SignJWT } from 'jose';
import { NextRequest } from 'next/server';
import { verifyToken } from '../lib/token-verification';
import { getStripe } from '../lib/stripe';
import { getCommerceProduct } from '../lib/commerce-products';
import { POST } from '../app/api/webhooks/stripe/route';

async function main() {
  // Public test fixtures; these are not deployment credentials.
  const previewSecret = 'preview-boundary-test-fixture-only';
  const productionSecret = 'production-boundary-test-fixture-only';
  process.env.JWT_SECRET = productionSecret;
  process.env.PREVIEW_JWT_SECRET = previewSecret;
  const payload = { userId: 'qa', email: 'qa@example.com', roles: ['admin'] };
  const sign = (secret: string) => new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1m')
    .sign(new TextEncoder().encode(secret));
  const [previewToken, productionToken] = await Promise.all([sign(previewSecret), sign(productionSecret)]);

  process.env.VERCEL_ENV = 'preview';
  assert.ok(await verifyToken(previewToken));
  assert.equal(await verifyToken(productionToken), null);
  process.env.STRIPE_SECRET_KEY = 'sk_live_public_test_fixture';
  assert.throws(() => getStripe(), /Preview requires a Stripe test key/);
  process.env.STRIPE_SECRET_KEY = 'sk_test_public_test_fixture';
  process.env.Stripe_Preview_v2 = 'whsec_public_test_fixture';
  const result = await POST(new NextRequest('https://preview.example/api/webhooks/stripe', {
    method: 'POST', body: '{}', headers: { 'stripe-signature': 't=1,v1=invalid' },
  }));
  assert.equal(result.status, 400);

  process.env.VERCEL_ENV = 'production';
  assert.ok(await verifyToken(productionToken));
  assert.equal(await verifyToken(previewToken), null);
  for (const key of ['__proto__', 'constructor', 'toString', 'missing']) {
    assert.equal(getCommerceProduct(key), null);
  }
  assert.equal(getCommerceProduct('single')?.unitAmount, 2400);
  console.log('PASS: cross-environment tokens rejected; live Stripe key blocked in Preview; invalid webhook signature rejected; product keys validated.');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
