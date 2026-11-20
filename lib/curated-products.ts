/** Public curated offers. Stripe Price IDs are resolved on the server in lib/stripe-catalog.ts.
 * Amounts below are approved display prices, not a source of truth for charging.
 * Stripe checkout is disabled unless configured prices match these amounts.
 */
export type CuratedExperienceKey='KEEP_IT'|'SHOW_IT';
export type CuratedDeliveryKey='physical'|'digital';
export const CURATED_PRODUCTS={
  KEEP_IT:{key:'KEEP_IT',label:'Keep It — Curated',price:199},
  SHOW_IT:{key:'SHOW_IT',label:'Show It — Times Square Edition',price:449},
  EXTRA_KEEPSAKES:{key:'EXTRA_KEEPSAKES',label:'Extra Keepsake Card',pricePerCard:12}
} as const;
