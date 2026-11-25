import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getStripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Order confirmation | UNIKMO',
  robots: { index: false, follow: false },
};

type PaidOrder = { amount: string; email: string | null };

/** Confirms payment with Stripe on the server. Returns null for anything that is not a real paid session. */
async function verifyPaidSession(sessionId: string | undefined): Promise<PaidOrder | null> {
  if (!sessionId || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.status !== 'complete' || session.payment_status !== 'paid') return null;
    const currency = (session.currency || 'usd').toUpperCase();
    const amount = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format((session.amount_total || 0) / 100);
    return { amount, email: session.customer_details?.email || session.customer_email || null };
  } catch {
    return null;
  }
}

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const order = await verifyPaidSession(searchParams?.session_id);
  if (!order) redirect('/');

  return (
    <main id="main" tabIndex={-1} className="flex min-h-screen items-center justify-center bg-[#FDF9F5] px-5">
      <div className="w-full max-w-xl rounded-3xl border border-[#E3DAD0] bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-700" aria-hidden="true">✓</div>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-[#8A6A30]">Payment received</p>
        <h1 className="mt-3 font-serif text-4xl text-[#2D2926]">Your moment is ready to begin.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#2D2926]/75">
          We received {order.amount}. We are confirming your order and will email your Moment Code and next steps
          {order.email ? <> to {order.email}</> : null}. This normally takes less than a minute.
        </p>
        <Link href="/" className="mt-8 inline-flex min-h-[44px] items-center rounded-full bg-[#2D2926] px-7 py-3 text-sm font-medium text-[#FDF9F5]">Return to UNIKMO</Link>
      </div>
    </main>
  );
}
