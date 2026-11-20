import Link from 'next/link';
export default function RetiredShopifyPage() {
  return <main className="mx-auto max-w-2xl p-8">
    <h1 className="font-serif text-3xl">Shopify payments retired</h1>
    <p className="mt-4">UNIKMO uses Stripe for all new checkout sessions. Historical orders remain available in the Orders section.</p>
    <Link href="/admin/orders" className="mt-6 inline-block underline">View historical orders</Link>
  </main>;
}
