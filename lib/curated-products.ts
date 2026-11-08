import { COMMERCE_PRODUCTS } from '@/lib/commerce-products';

export type CuratedExperienceKey = 'KEEP_IT' | 'SHOW_IT';
export type CuratedDeliveryKey = 'physical' | 'digital';

export const CURATED_PRODUCTS = {
  KEEP_IT: { key: 'KEEP_IT', label: 'Keep It — Curated', price: COMMERCE_PRODUCTS['curated-keep'].unitAmount / 100 },
  SHOW_IT: { key: 'SHOW_IT', label: 'Show It — Times Square Edition', price: COMMERCE_PRODUCTS['curated-show'].unitAmount / 100 },
  EXTRA_KEEPSAKES: { key: 'EXTRA_KEEPSAKES', label: 'Extra Keepsake Card', pricePerCard: COMMERCE_PRODUCTS['extra-keepsake'].unitAmount / 100 },
} as const;
