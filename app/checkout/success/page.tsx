import Link from 'next/link';
import { getStripe } from '@/lib/stripe';
import connectDB from '@/lib/db';
import { processPaidOrderAndGenerateCodes } from '@/lib/order-processing';
import { stripeOrderInput } from '@/lib/stripe-order-input';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export default async function CheckoutSuccessPage({ searchParams }: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  const { session_id: sessionId } = await searchParams;
  let paid = false;
  let fulfilled = false;
  if (typeof sessionId === 'string' && /^cs_(test|live)_[a-zA-Z0-9]+$/.test(sessionId)) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === 'paid';
      if (paid) {
        const input = stripeOrderInput(session);
        await connectDB();
        await processPaidOrderAndGenerateCodes(input);
        fulfilled = true;
      }
    } catch {
      console.error('Checkout confirmation could not complete fulfillment');
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDF9F5] px-5">
      <div className="w-full max-w-xl rounded-3xl border border-[#E3DAD0] bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-700">{paid ? '✓' : '…'}</div>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-[#B38846]">{paid ? 'Payment received' : 'Payment not yet confirmed'}</p>
        <h1 className="mt-3 font-serif text-4xl text-[#2D2926]">{fulfilled ? 'Your moment is ready to begin.' : paid ? 'We are preparing your order.' : 'Let’s confirm your payment.'}</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#2D2926]/65">{fulfilled
          ? 'Your order is confirmed. We have sent your Moment Key and next steps to your checkout email address.'
          : paid ? 'Your payment succeeded. Your Moment Key email is still being prepared. Please refresh this page in a minute; your order will only be issued once.'
          : 'We could not confirm a completed payment for this visit. If you have paid, return using the confirmation link from your checkout.'}</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-[#2D2926] px-7 py-3 text-sm font-medium text-[#FDF9F5]">Return to UNIKMO</Link>
      </div>
    </main>
  );
}
