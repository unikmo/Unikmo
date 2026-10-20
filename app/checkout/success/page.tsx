import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDF9F5] px-5">
      <div className="w-full max-w-xl rounded-3xl border border-[#E3DAD0] bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-700">✓</div>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-[#B38846]">Payment received</p>
        <h1 className="mt-3 font-serif text-4xl text-[#2D2926]">Your moment is ready to begin.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#2D2926]/65">We are confirming your order and will email your Moment Code and next steps. This normally takes less than a minute.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-[#2D2926] px-7 py-3 text-sm font-medium text-[#FDF9F5]">Return to UNIKMO</Link>
      </div>
    </main>
  );
}
