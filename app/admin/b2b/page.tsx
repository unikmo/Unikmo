'use client';

import { useState } from 'react';

type View = 'global' | 'cruise' | 'ship' | 'hotel' | 'store';
const views: { id: View; title: string; description: string }[] = [
  { id: 'global', title: 'UNIKMO HQ', description: 'All partners · Global operations' },
  { id: 'cruise', title: 'Cruise line', description: 'Company-wide · All ships' },
  { id: 'ship', title: 'Ship admin', description: 'Voyages · Inventory · Team' },
  { id: 'hotel', title: 'Hotel admin', description: 'Property · Inventory · Team' },
  { id: 'store', title: 'Store user', description: 'Retail · Moment Keys' },
];
const metricSets: Record<View, string[]> = {
  global: ['Partner organisations', 'Active ships & hotels', 'Keys generated', 'Monthly billable', 'Retail sales', 'Commission payable'],
  cruise: ['Ships', 'Voyages', 'Passengers reported', 'Keys generated', 'Retail sales', 'Monthly invoice'],
  ship: ['Voyages', 'Passengers reported', 'Trip-code accesses', 'Keys generated', 'Cards in stock', 'Retail sales'],
  hotel: ['Keys generated', 'Cards in stock', 'Retail sales', 'Commission earned', 'Monthly invoice', 'Team seats used'],
  store: ['Keys generated', 'Retail sales', 'Bundles sold', 'Cards remaining'],
};
const sections: Record<View, string[]> = {
  global: ['Partner directory', 'Monthly billing', 'Commercial terms & pilot commissions', 'Ship-level price overrides', 'Audit & exports'],
  cruise: ['Fleet performance', 'Voyage breakdown', 'Passenger evidence', 'Ship administrators', 'Monthly settlement'],
  ship: ['Voyage registry & passenger evidence', 'Create voyage Trip Code', 'Cruise Director welcome media', 'Departure keepsake media', 'Ship card & retail card orders', 'Staff access (5 initial seats)'],
  hotel: ['Create Moment Keys', 'Retail sales & commissions', 'Ship-card equivalent: hotel-branded inventory', 'Card replenishment', 'Staff access (5 initial seats)'],
  store: ['Create 1 / 4 / 7-key bundles', 'Record retail transaction', 'Available cards', 'Recent transactions'],
};

export default function B2BDashboardConcept() {
  const [view, setView] = useState<View>('global');
  const [bundle, setBundle] = useState<1 | 4 | 7>(4);
  const [quantity, setQuantity] = useState(1);
  const [period, setPeriod] = useState('month');
  const active = views.find((item) => item.id === view)!;
  const prices = { 1: 24, 4: 64, 7: 72 };
  return (
    <main className="mx-auto max-w-7xl space-y-7 pb-16 text-[#263039]">
      <header className="rounded-3xl bg-[#263039] px-7 py-8 text-[#fffaf2] sm:px-10">
        <p className="text-xs uppercase tracking-[.3em] text-[#d5b991]">UNIKMO / PARTNER OPERATIONS</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
          <div><h1 className="font-serif text-4xl sm:text-5xl">{active.title}</h1><p className="mt-2 text-sm text-[#fffaf2]/70">{active.description}</p></div>
          <span className="rounded-full border border-[#d5b991]/50 px-4 py-2 text-xs uppercase tracking-wider text-[#d5b991]">Design preview · No live data</span>
        </div>
      </header>
      <section aria-label="Role previews" className="flex flex-wrap gap-2">
        {views.map(item => <button key={item.id} type="button" onClick={() => setView(item.id)}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${view === item.id ? 'border-[#263039] bg-[#263039] text-white' : 'border-[#d8d0c5] bg-white hover:bg-[#f5eee5]'}`}>{item.title}</button>)}
      </section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="font-serif text-3xl">Overview</h2><p className="text-sm text-[#6c7275]">Operational metrics will populate from organisation-scoped records.</p></div>
        <select aria-label="Reporting period" value={period} onChange={e=>setPeriod(e.target.value)} className="rounded-xl border border-[#d8d0c5] bg-white px-4 py-3 text-sm">
          <option value="month">This month</option><option value="previous">Previous month</option><option value="year">This year</option>
        </select>
      </div>
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {metricSets[view].map(metric => <article key={metric} className="min-h-32 rounded-2xl border border-[#e6dfd5] bg-white p-5">
          <p className="text-xs uppercase tracking-wider text-[#827b70]">{metric}</p>
          <p className="mt-5 font-serif text-3xl text-[#a6a098]">—</p>
          <p className="mt-1 text-xs text-[#827b70]">Awaiting connected records</p>
        </article>)}
      </section>
      <section className="grid gap-5 lg:grid-cols-5">
        <div className="space-y-4 rounded-2xl border border-[#e6dfd5] bg-white p-6 lg:col-span-3">
          <h2 className="font-serif text-2xl">Workspace</h2>
          <p className="text-sm text-[#6c7275]">Role-specific operational modules</p>
          <div className="divide-y divide-[#eee8df]">{sections[view].map(label=><div key={label} className="flex items-center justify-between gap-4 py-4 text-sm"><span>{label}</span><span className="rounded-full bg-[#f5eee5] px-3 py-1 text-xs text-[#827b70]">Planned</span></div>)}</div>
        </div>
        <div className="space-y-5 rounded-2xl bg-[#efe8df] p-6 lg:col-span-2">
          <div><p className="text-xs uppercase tracking-[.2em] text-[#90744e]">Moment Key creation</p><h2 className="mt-2 font-serif text-2xl">Create bundles</h2><p className="mt-2 text-sm text-[#6c7275]">Interface preview. No keys are issued here.</p></div>
          <fieldset className="space-y-2"><legend className="mb-2 text-sm font-medium">Bundle size</legend>
            <div className="grid grid-cols-3 gap-2">{([1,4,7] as const).map(n=><button key={n} type="button" onClick={()=>setBundle(n)} aria-pressed={bundle===n} className={`rounded-xl border p-3 text-sm ${bundle===n?'border-[#263039] bg-[#263039] text-white':'border-[#d1c7bb] bg-white'}`}>{n} key{n>1?'s':''}</button>)}</div>
          </fieldset>
          <label className="block text-sm font-medium" htmlFor="b2b-bundles">Number of bundles</label>
          <input id="b2b-bundles" type="number" min="1" max="1000" value={quantity} onChange={e=>setQuantity(Math.max(1,Math.min(1000,Number(e.target.value)||1)))} className="w-full rounded-xl border border-[#d1c7bb] bg-white p-3"/>
          <div className="border-t border-[#d1c7bb] pt-4 text-sm">
            <div className="flex justify-between"><span>Keys requested</span><strong>{bundle*quantity}</strong></div>
            <div className="mt-2 flex justify-between"><span>Cruise B2B charge (10% retail)</span><strong>${(prices[bundle]*quantity*.1).toFixed(2)}</strong></div>
          </div>
          <button disabled className="w-full cursor-not-allowed rounded-xl bg-[#263039] p-4 text-sm font-semibold text-white opacity-60">Create keys · Backend pending</button>
          <p className="text-xs leading-5 text-[#746b61]">Generated keys must be attributed to the organisation, property, voyage and staff member. Monthly invoicing uses creation records; commissions use actual sales.</p>
        </div>
      </section>
      <footer className="text-xs leading-6 text-[#827b70]">Prototype only. Role selection simulates dashboards; it does not grant permissions. Production requires server-side role enforcement, tenant isolation, audit records and verified billing.</footer>
    </main>
  );
}
