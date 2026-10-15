import { NextResponse } from 'next/server';
import { COMMERCE_PRODUCTS } from '@/lib/commerce-products';

export const dynamic = 'force-dynamic';

const keys = ['single', 'four', 'seven'] as const;

/** Product catalog owned by UNIKMO and shared by the storefront and admin. */
export async function GET() {
  const products = keys.map((key) => {
    const product = COMMERCE_PRODUCTS[key];
    return {
      id: product.key,
      productKey: product.key,
      title: product.name,
      handle: product.key,
      image: product.image,
      imageAlt: product.name,
      variantId: 'digital',
      price: (product.unitAmount / 100).toFixed(2),
      currencyCode: product.currency.toUpperCase(),
      variants: product.allowedDeliveryTypes.map((deliveryType) => ({
        id: deliveryType,
        title: deliveryType[0].toUpperCase() + deliveryType.slice(1),
        price: (product.unitAmount / 100).toFixed(2),
      })),
    };
  });

  return NextResponse.json({ products, paymentProvider: 'stripe' });
}
