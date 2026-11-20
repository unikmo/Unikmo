import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const read=path=>readFileSync(path,'utf8');
const home=read('app/test/page.tsx');
assert.ok(read('app/page.tsx').includes("import TestPage from './test/page'"));
for(const term of ['Less stuff. More us.','The gift isn\'t the card. It\'s what they feel when they open it.','The card is the key. The memory is the gift.','Illustrative gift ideas, not customer testimonials.','One moment. Or a few more.','QR code + private access code on every card'])assert.ok(home.includes(term),'Missing brand promise: '+term);
for(const forbidden of ['They’ll keep it forever','Matt L., London','Sophie M., New York','A tree planted','/cart/${product.variantId}'])assert.ok(!home.includes(forbidden),'Unverified or Shopify statement: '+forbidden);
for(const [path,term] of [
 ['app/faq/page.tsx','Less fuss. More answers.'],
 ['app/how-unikmo-works/page.tsx','Little card. Big feeling.'],
 ['app/curated/page.tsx','More meaning. Less editing.'],
 ['app/hotels/page.tsx','They check out. The feeling checks in.'],
 ['components/CuratedUnikmoTeaser.tsx','Your story. Our hands. All heart.'],
 ['app/checkout/success/page.tsx','Your payment is being confirmed.']
])assert.ok(read(path).includes(term),path+': '+term);
assert.ok(read('app/faq/page.tsx').includes('does not promise permanent storage'));
assert.ok(read('app/curated/page.tsx').includes('subject to availability'));
for(const p of ['app/test/page.tsx','app/curated/page.tsx','components/CuratedCheckout.tsx','app/api/products/route.ts','app/api/curated/checkout/route.ts','lib/curated-products.ts']){
 const s=read(p);
 assert.ok(!/myshopify|https:\/\/[^\s"'\x60]+\/cart\/|curatedCartUrl|createShopifyClient/.test(s),p+' still directs new orders to Shopify');
}
const checkout=read('app/api/checkout/route.ts');
for(const term of ['stripePost','STRIPE_SHIPPING_RATE_ID','shipping_address_collection','allowedShippingCountries','priceId','CURATED_EXPECTED_CENTS'])assert.ok(checkout.includes(term),'Missing Stripe checkout protection: '+term);
const webhook=read('app/api/stripe/webhook/route.ts');
for(const term of ['verifyStripeSignature','payment_status','stripeCodesEmailSentAt','deferCodeEmail:true','StripeCuratedOrder','STRIPE_FULFILLMENT_ENABLED','verifiedLines'])assert.ok(webhook.includes(term),'Missing webhook protection: '+term);
assert.ok(read('lib/code-generator.ts').includes('getRandomValues'));
assert.ok(read('app/upload/page.tsx').includes('codeToValidate.length < 8'));
assert.ok(read('app/unlock/page.tsx').includes('unlockCode.length < 8'));
assert.ok(read('app/api/webhooks/shopify/orders-paid/route.ts').includes("SHOPIFY_HISTORICAL_WEBHOOKS_ENABLED !== 'true'"));
console.log('PASS UNIKMO: desire-first brand copy, no Shopify new purchases, gated signed Stripe flow and eight-character keys');
