'use client';
import { useEffect, useRef, useState } from 'react';

type Pack = { barcode: string; bundleSize: number; status: string; channel: string; organisationId: string; locationId: string; retailPrice: number; soldAt?: string };
type Issued = { barcode: string; keys: string[] };
export default function RetailPacksPage() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [issued, setIssued] = useState<Issued[]>([]);
  const [channel, setChannel] = useState<'hotel'|'cruise'>('hotel');
  const [organisationId, setOrganisationId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [voyageId, setVoyageId] = useState('');
  const [bundleSize, setBundleSize] = useState<1|4|7>(1);
  const [count, setCount] = useState(1);
  const [commissionRate, setCommissionRate] = useState(.3);
  const [barcode, setBarcode] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [saleReference, setSaleReference] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [scanning, setScanning] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream|null>(null);
  const timer = useRef<number|null>(null);
  async function refresh() {
    const res = await fetch('/api/admin/retail-packs', { cache: 'no-store' });
    if (res.ok) setPacks((await res.json()).packs);
  }
  useEffect(() => { void refresh(); }, []);
  function stop() {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
    stream.current?.getTracks().forEach(track => track.stop());
    stream.current = null;
    setScanning(false);
  }
  useEffect(() => () => {
    if (timer.current !== null) window.clearInterval(timer.current);
    stream.current?.getTracks().forEach(track => track.stop());
  }, []);
  async function start() {
    setMessage('');
    const Detector = (window as any).BarcodeDetector;
    if (!Detector) { setMessage('Camera barcode detection is unavailable in this browser. Use a USB scanner or enter the barcode.'); return; }
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      stream.current = media;
      setScanning(true);
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      if (!video.current) throw new Error('Camera view unavailable');
      video.current.srcObject = media;
      await video.current.play();
      const detector = new Detector({ formats: ['code_128'] });
      timer.current = window.setInterval(async () => {
        if (!video.current || video.current.readyState < 2) return;
        try {
          const found = await detector.detect(video.current);
          if (found.length) { setBarcode(found[0].rawValue); stop(); }
        } catch { /* Camera frame not ready */ }
      }, 350);
    } catch { stop(); setMessage('Camera access failed. Check browser permission or enter the barcode manually.'); }
  }
  async function create() {
    setBusy(true); setMessage(''); setIssued([]);
    try {
      const res = await fetch('/api/admin/retail-packs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ channel, organisationId, locationId, voyageId, bundleSize, count, commissionRate: channel === 'hotel' ? .3 : commissionRate }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Creation failed');
      setIssued(data.created); setMessage(data.created.length + ' packages created. Save or print their barcode/key mapping before leaving.');
      await refresh();
    } catch (e: any) { setMessage(e.message); } finally { setBusy(false); }
  }
  async function sell() {
    if (!paymentConfirmed) { setMessage('Confirm payment before recording a sale.'); return; }
    setBusy(true); setMessage('');
    try {
      const res = await fetch('/api/admin/retail-packs/scan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ barcode, recoveryEmail, saleReference, paymentConfirmed }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sale failed');
      setMessage('Sale recorded: ' + data.barcode + ' · $' + data.retailPrice + ' · commission $' + data.commission);
      setBarcode(''); setRecoveryEmail(''); setSaleReference(''); setPaymentConfirmed(false);
      await refresh();
    } catch (e: any) { setMessage(e.message); } finally { setBusy(false); }
  }
  const available = packs.filter(p => p.status === 'available').length;
  const sold = packs.filter(p => p.status === 'sold').length;
  return <main className="mx-auto max-w-6xl space-y-6 pb-16 text-[#263039]">
    <header className="rounded-3xl bg-[#263039] px-8 py-8 text-white"><p className="text-xs uppercase tracking-[.25em] text-[#d5b991]">UNIKMO / RETAIL OPERATIONS</p><h1 className="mt-3 font-serif text-4xl">Retail inventory & sales</h1><p className="mt-2 text-sm text-white/70">Create packs in advance. Scan each pack after payment to register a sale.</p></header>
    <div className="grid grid-cols-2 gap-4"><div className="rounded-2xl bg-white p-5"><p className="text-sm">Available (recent 100)</p><p className="mt-2 font-serif text-3xl">{available}</p></div><div className="rounded-2xl bg-white p-5"><p className="text-sm">Sold (recent 100)</p><p className="mt-2 font-serif text-3xl">{sold}</p></div></div>
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="space-y-4 rounded-2xl border bg-white p-6"><h2 className="font-serif text-2xl">Generate inventory</h2>
        <label className="block text-sm">Channel<select value={channel} onChange={e => setChannel(e.target.value as 'hotel'|'cruise')} className="mt-1 w-full rounded-xl border p-3"><option value="hotel">Hotel</option><option value="cruise">Cruise ship</option></select></label>
        <label className="block text-sm">Organisation ID<input value={organisationId} onChange={e=>setOrganisationId(e.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label>
        <label className="block text-sm">Property / ship ID<input value={locationId} onChange={e=>setLocationId(e.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label>
        {channel === 'cruise' && <label className="block text-sm">Voyage ID<input value={voyageId} onChange={e=>setVoyageId(e.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label>}
        <label className="block text-sm">Bundle<select value={bundleSize} onChange={e=>setBundleSize(Number(e.target.value) as 1|4|7)} className="mt-1 w-full rounded-xl border p-3"><option value={1}>1 key · $24</option><option value={4}>4 keys · $64</option><option value={7}>7 keys · $72</option></select></label>
        <label className="block text-sm">Number of packages (max 100)<input type="number" min={1} max={100} value={count} onChange={e=>setCount(Number(e.target.value))} className="mt-1 w-full rounded-xl border p-3"/></label>
        {channel === 'cruise' && <label className="block text-sm">Commission<select value={commissionRate} onChange={e=>setCommissionRate(Number(e.target.value))} className="mt-1 w-full rounded-xl border p-3"><option value={.25}>25% pilot</option><option value={.3}>30% standard</option></select></label>}
        <button disabled={busy || !organisationId || !locationId} onClick={create} className="w-full rounded-xl bg-[#263039] p-3 text-white disabled:opacity-50">Generate packages</button>
      </section>
      <section className="space-y-4 rounded-2xl border bg-white p-6"><h2 className="font-serif text-2xl">Scan sale</h2><p className="text-sm text-[#6c7275]">Scan after payment is accepted. Duplicate scans are rejected.</p>
        <div className="flex gap-2"><button onClick={scanning ? stop : start} className="rounded-xl border px-4 py-3">{scanning ? 'Stop camera' : 'Open camera'}</button><input aria-label="Pack barcode" placeholder="PK-XXXX-XXXX" value={barcode} onChange={e=>setBarcode(e.target.value)} className="min-w-0 flex-1 rounded-xl border p-3"/></div>
        <video ref={video} muted playsInline className={scanning ? 'w-full rounded-xl bg-black' : 'hidden'} />
        <label className="block text-sm">Customer recovery email (optional)<input type="email" value={recoveryEmail} onChange={e=>setRecoveryEmail(e.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label>
        <label className="block text-sm">Receipt / POS reference (optional)<input value={saleReference} onChange={e=>setSaleReference(e.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={paymentConfirmed} onChange={e=>setPaymentConfirmed(e.target.checked)}/> Payment has been accepted</label>
        <button disabled={busy || !barcode || !paymentConfirmed} onClick={sell} className="w-full rounded-xl bg-[#263039] p-3 text-white disabled:opacity-50">Record sale</button>
      </section>
    </div>
    {message && <p role="status" className="rounded-xl border bg-white p-4 text-sm">{message}</p>}
    {issued.length > 0 && <section className="rounded-2xl border bg-white p-6"><h2 className="font-serif text-2xl">New packages — export before leaving</h2><button className="my-3 rounded-xl border px-4 py-2" onClick={()=>{const csv=['Barcode,Keys',...issued.map(p=>[p.barcode,...p.keys].join(','))].join('\n'); const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='unikmo-retail-packs.csv';a.click();URL.revokeObjectURL(a.href);}}>Export CSV</button><div className="max-h-80 overflow-auto text-sm">{issued.map(p=><p key={p.barcode} className="border-b py-2"><strong>{p.barcode}</strong> — {p.keys.join(' · ')}</p>)}</div></section>}
    <section className="rounded-2xl border bg-white p-6"><h2 className="font-serif text-2xl">Recent inventory</h2><div className="mt-3 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="py-2">Barcode</th><th>Channel</th><th>Bundle</th><th>Status</th><th>Location</th></tr></thead><tbody>{packs.map(p=><tr className="border-b" key={p.barcode}><td className="py-3 font-mono">{p.barcode}</td><td>{p.channel}</td><td>{p.bundleSize}</td><td>{p.status}</td><td>{p.locationId}</td></tr>)}</tbody></table></div></section>
    <p className="text-xs text-[#746b61]">Admin-only rollout. Partner staff permissions and independent checkout QA are required before operational use.</p>
  </main>;
}
