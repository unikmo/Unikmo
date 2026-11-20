import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const read=(path)=>readFileSync(path,'utf8');
const h=read('app/test/page.tsx');
const home=read('app/page.tsx');
assert.ok(home.includes("import TestPage from './test/page'"),'Marketing homepage must stay connected to actual live route');
for(const phrase of [
  'Some moments deserve more than a message.',
  'Imagine them hearing your voice when they least expect it.',
  'The card is the key. The memory is the gift.',
  'Who would you love to surprise?',
  'The best part is what only they will hear.',
  'Illustrative gift ideas, not customer testimonials.',
  'One moment, or a story told in chapters?',
  'QR code + private access code on every card'
]) assert.ok(h.includes(phrase),'Homepage missing: '+phrase);
assert.ok(!h.includes('They’ll keep it forever'), 'No lifetime promise without a storage guarantee');
assert.ok(!h.includes('Matt L., London')&&!h.includes('Sophie M., New York'),'Do not claim unverified customer testimony');
assert.ok(!h.includes('A tree planted'),'Do not claim third-party offset without corroboration');
for(const [path,phrase] of [
  ['app/faq/page.tsx','The little details behind a meaningful gift.'],
  ['app/how-unikmo-works/page.tsx','One small card. A moment only they can open.'],
  ['app/curated/page.tsx','One story. What would you like to do with it?'],
  ['app/hotels/page.tsx','They arrive as guests. They leave with a story.'],
  ['app/contact/page.tsx','Tell us what would help.']
])assert.ok(read(path).includes(phrase),path+' missing editorial hook');
assert.ok(read('app/faq/page.tsx').includes('does not promise permanent storage'),'Critical storage disclosure must remain');
assert.ok(read('app/curated/page.tsx').includes('subject to availability'),'Times Square availability disclosure must remain');
assert.ok(read('app/test/page.tsx').includes('product.price'),'Displayed pricing must come from actual product source');
assert.ok(read('app/api/products/route.ts').includes('createShopifyClient'),'Commerce routing intentionally unchanged until reconciled');
console.log('UNIKMO editorial and integrity smoke: PASS');
