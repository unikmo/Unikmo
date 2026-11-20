// Stripe is the only new-checkout provider. Historical Shopify records remain readable.
// Prices are retrieved from configured Stripe Price IDs, never accepted from the client.
export type StandardSku = 'single' | 'four' | 'seven';
export type CuratedSku = 'keep_physical' | 'keep_digital' | 'show_physical' | 'show_digital';
export type StripeSku = StandardSku | CuratedSku;
export const STANDARD: Record<StandardSku,{name:string;cards:1|4|7;image:string;env:string}> = {
  single:{name:'Single Key',cards:1,image:'/cardfrontunikmo.jpg',env:'STRIPE_PRICE_SINGLE'},
  four:{name:'4-Key Bundle',cards:4,image:'/cardfrontsite4.png',env:'STRIPE_PRICE_FOUR'},
  seven:{name:'7-Key Bundle',cards:7,image:'/cardfrontsite7.png',env:'STRIPE_PRICE_SEVEN'},
};
export const CURATED: Record<CuratedSku,{name:string;env:string;physical:boolean;kind:'keep'|'show'}> = {
  keep_physical:{name:'Keep It — Curated (physical)',env:'STRIPE_PRICE_CURATED_KEEP_PHYSICAL',physical:true,kind:'keep'},
  keep_digital:{name:'Keep It — Curated (digital)',env:'STRIPE_PRICE_CURATED_KEEP_DIGITAL',physical:false,kind:'keep'},
  show_physical:{name:'Show It — Times Square (physical)',env:'STRIPE_PRICE_CURATED_SHOW_PHYSICAL',physical:true,kind:'show'},
  show_digital:{name:'Show It — Times Square (digital)',env:'STRIPE_PRICE_CURATED_SHOW_DIGITAL',physical:false,kind:'show'},
};
export const EXTRA_PRICE_ENV='STRIPE_PRICE_EXTRA_CARD';
export const CURATED_EXPECTED_CENTS={keep:19900,show:44900,extra:1200} as const;
export const isStandardSku=(x:unknown):x is StandardSku=>typeof x==='string'&&Object.hasOwn(STANDARD,x);
export const isCuratedSku=(x:unknown):x is CuratedSku=>typeof x==='string'&&Object.hasOwn(CURATED,x);
export function priceId(env:string){const id=process.env[env];if(!id||!/^price_[A-Za-z0-9]+$/.test(id))throw new Error('Missing configured Stripe price: '+env);return id;}
export function stripeKey(){const key=process.env.STRIPE_SECRET_KEY;
  if(!key||!/^sk_(test|live)_[A-Za-z0-9]+$/.test(key))throw new Error('Stripe secret not configured');
  if(key.startsWith('sk_live_')&&process.env.STRIPE_LIVE_CHECKOUT_ENABLED!=='true')throw new Error('Live payments require explicit approval');
  return key;
}
export function allowedShippingCountries():string[]{
  const raw=process.env.STRIPE_SHIPPING_COUNTRIES||'';
  const codes=raw.split(',').map(x=>x.trim().toUpperCase()).filter(Boolean);
  if(!codes.length||codes.some(x=>!/^[A-Z]{2}$/.test(x)))throw new Error('Set verified shipping countries before selling physical cards');
  return [...new Set(codes)];
}
