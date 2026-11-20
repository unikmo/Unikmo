# UNIKMO — Less stuff. More us.

A physical keepsake card opens a private video, voice note, photo or message. Recipients need no app or account.

## Current migration status

This branch prepares **Stripe-hosted, one-time payments** for UNIKMO standard cards and curated experiences. **It is not approved for live payments until checkout, signed-webhook fulfillment, pricing, shipping, tax and email delivery have passed production acceptance.**

Existing Shopify records and admin pages are preserved for historical reconciliation. **New public checkout and product requests no longer use Shopify.** The historical Shopify paid-order webhook is disabled by default (HTTP 410); do not re-enable it without checking outstanding legacy orders.

## Public offers

- Standard UNIKMO: one, four or seven distinct private cards and memories. **Prices are read from Stripe** through server-side Price IDs; do not hard-code unapproved amounts.
- Curated Keep It: **$199 USD**, digital or physical.
- Curated Show It / Times Square: **$399 USD**, scheduling subject to availability.
- Extra curated physical cards: **$12 USD each**.

Curated prices are compared with the Stripe price amounts before customers can proceed. If configuration is missing or prices mismatch, checkout stays disabled.

## Stripe setup

Configure the server-only keys and SKU Price IDs documented in `.env.example`:

1. Verify that the live Stripe account is the intended UNIKMO merchant. The connected Stripe tool currently exposes **test/sandbox only**, not live.
2. Configure separate one-time Price IDs for the three standard tiers and four curated experience/delivery variants, plus extra cards.
3. Set valid physical shipping countries and a verified shipping rate. Configure Stripe Tax only where tax obligations and account setup have been reviewed.
4. Register a webhook pointing to `/api/stripe/webhook` for `checkout.session.completed` and `checkout.session.async_payment_succeeded`; store the signing secret server-side.
5. Configure MongoDB and authenticated SMTP, `EMAIL_PROVIDER=smtp`, and `CURATED_ORDER_EMAIL` for fulfillment.
6. Test standard checkout for 1/4/7 cards, curated physical/digital, extras, wrong prices, failed payment, duplicate webhook, unsigned webhook, delayed payment, emailed eight-character codes, and actual upload/unlock using test credentials.
7. Only after successful acceptance enable `STRIPE_FULFILLMENT_ENABLED=true` and, separately after explicit live-payment approval, `STRIPE_LIVE_CHECKOUT_ENABLED=true` with a verified `sk_live_` key.

Never put an API secret or webhook secret in a `NEXT_PUBLIC_` variable.

## Key issuance

New keys use eight cryptographically generated characters; old `UNIKMO-...` codes remain accepted. The underlying admin model still contains historical field names such as `shopifyOrderId`; Stripe records use an explicit `stripe:` prefix rather than altering old transactions. Fulfillment is triggered by a signed, paid Stripe event, not by the success-page redirect.

## Build & QA

```bash
npm ci
node scripts/verify-editorial.mjs
npx tsx scripts/verify-stripe-security.ts
npx tsc --noEmit
npm run build
```

The public site's launch is independent of this branch. **Do not merge or deploy until live-account and fulfillment acceptance is documented.** A passed TypeScript or build check alone is not payment verification.
