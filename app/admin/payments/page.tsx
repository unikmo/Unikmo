'use client';

import { useEffect, useState } from 'react';

interface PaymentStatus {
  connected: boolean;
  secretConfigured: boolean;
  webhookConfigured: boolean;
  keyMode: 'test' | 'live';
  webhookUrl: string;
  accountId?: string;
  businessName?: string | null;
  chargesEnabled?: boolean;
  payoutsEnabled?: boolean;
  error?: string;
}

function StatusPill({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${ok ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{children}</span>;
}

export default function PaymentsPage() {
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/payments/status', { credentials: 'include' })
      .then((response) => response.json())
      .then(setStatus)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-12 text-center text-[#2D2926]/60">Checking payment configuration…</div>;
  if (!status) return <div className="py-12 text-center text-red-700">Unable to load payment configuration.</div>;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-2xl border border-[#E3DAD0] bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B38846]">Stripe</p>
            <h2 className="mt-2 font-serif text-3xl text-[#2D2926]">Payment connection</h2>
            <p className="mt-2 text-sm text-[#2D2926]/60">Checkout runs independently from Shopify while historic orders remain intact.</p>
          </div>
          <StatusPill ok={status.connected}>{status.connected ? 'Connected' : 'Setup required'}</StatusPill>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['API key', status.secretConfigured ? 'Configured' : 'Missing', status.secretConfigured],
          ['Webhook secret', status.webhookConfigured ? 'Configured' : 'Missing', status.webhookConfigured],
          ['Mode', status.keyMode === 'test' ? 'Test mode' : 'Live mode', status.keyMode === 'test'],
          ['Payments', status.chargesEnabled === false ? 'Not enabled' : status.connected ? 'Ready' : 'Pending', status.connected && status.chargesEnabled !== false],
        ].map(([label, value, ok]) => (
          <div key={String(label)} className="rounded-2xl border border-[#E3DAD0] bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-[#2D2926]/50">{String(label)}</p>
            <p className="mt-3 text-lg font-semibold text-[#2D2926]">{String(value)}</p>
            <div className={`mt-4 h-1.5 rounded-full ${ok ? 'bg-emerald-400' : 'bg-amber-300'}`} />
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-[#E3DAD0] bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#2D2926]">Webhook endpoint</h3>
        <p className="mt-1 text-sm text-[#2D2926]/60">Subscribe this URL to checkout.session.completed and checkout.session.async_payment_succeeded.</p>
        <code className="mt-4 block overflow-x-auto rounded-xl bg-[#F5ECE3] px-4 py-3 text-sm text-[#2D2926]">{status.webhookUrl}</code>
        {status.accountId && <p className="mt-4 text-xs text-[#2D2926]/50">Account {status.accountId}{status.businessName ? ` · ${status.businessName}` : ''}</p>}
        {status.error && <p className="mt-4 text-sm text-red-700">{status.error}</p>}
      </section>

      <section className="rounded-2xl border border-[#E3DAD0] bg-[#2D2926] p-6 text-[#FDF9F5] shadow-sm">
        <h3 className="font-serif text-2xl">Safe migration status</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#FDF9F5]/70">Stripe is being introduced in test mode first. Shopify checkout stays available until a successful payment creates the order, generates every Moment Code, and sends the buyer email.</p>
      </section>
    </div>
  );
}
