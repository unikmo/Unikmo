import type { DeliveryType, Quantity } from '@/lib/code-generator';

export type ProductKey = 'single' | 'four' | 'seven' | 'curated-keep' | 'curated-show' | 'extra-keepsake';

export interface CommerceProduct {
  key: ProductKey;
  name: string;
  description: string;
  unitAmount: number;
  currency: 'usd';
  momentQuantity: Quantity;
  image: string;
  allowedDeliveryTypes: DeliveryType[];
}

export const COMMERCE_PRODUCTS: Record<ProductKey, CommerceProduct> = {
  single: { key: 'single', name: 'Single Key', description: 'One UNIKMO Moment Key', unitAmount: 2400, currency: 'usd', momentQuantity: 1, image: '/cardfrontunikmo.jpg', allowedDeliveryTypes: ['digital', 'physical'] },
  four: { key: 'four', name: '4-Key Bundle', description: 'Four UNIKMO Moment Keys', unitAmount: 6400, currency: 'usd', momentQuantity: 4, image: '/cardfrontsite4.png', allowedDeliveryTypes: ['digital', 'physical', 'split'] },
  seven: { key: 'seven', name: '7-Key Bundle', description: 'Seven UNIKMO Moment Keys', unitAmount: 7200, currency: 'usd', momentQuantity: 7, image: '/cardfrontsite7.png', allowedDeliveryTypes: ['digital', 'physical', 'split'] },
  'curated-keep': { key: 'curated-keep', name: 'Keep It — Curated', description: 'A professionally curated UNIKMO memory', unitAmount: 19900, currency: 'usd', momentQuantity: 1, image: '/cardfrontunikmo.jpg', allowedDeliveryTypes: ['digital', 'physical'] },
  'curated-show': { key: 'curated-show', name: 'Show It — Times Square Edition', description: 'A curated memory with the Times Square experience', unitAmount: 39900, currency: 'usd', momentQuantity: 1, image: '/cardfrontunikmo.jpg', allowedDeliveryTypes: ['digital', 'physical'] },
  'extra-keepsake': { key: 'extra-keepsake', name: 'Extra Keepsake Card', description: 'An additional physical keepsake card', unitAmount: 1200, currency: 'usd', momentQuantity: 1, image: '/cardfrontunikmo.jpg', allowedDeliveryTypes: ['physical'] },
};

export function getCommerceProduct(value: unknown): CommerceProduct | null {
  return typeof value === 'string' && value in COMMERCE_PRODUCTS
    ? COMMERCE_PRODUCTS[value as ProductKey]
    : null;
}
