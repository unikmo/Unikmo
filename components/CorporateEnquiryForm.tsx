'use client';

import { FormEvent, useState } from 'react';

// DRAFT for Sophie review: field set and privacy line.
// Posts to the existing /api/contact route (email + message) so no new backend is needed for the draft.
// There is no payment on this form.

const QUANTITY_BANDS = ['Just a sample', '1 to 10', '11 to 50', '51 to 200', '200 or more', 'Not sure yet'];
const OCCASIONS = [
  'Employee recognition',
  'Onboarding welcome',
  'Client appreciation',
  'Private message from a leader',
  'Other',
];

type Status = 'idle' | 'sending' | 'success' | 'error';

const fieldClass =
  'mt-2 min-h-[48px] w-full rounded-[10px] border border-[#22323A]/[0.2] bg-[#FCF9F4] px-4 text-[14px] text-[#22323A] outline-none transition placeholder:text-[#22323A]/60 focus:border-[#8A6528]';

export default function CorporateEnquiryForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? '').trim();

    // Honeypot: real people never fill this hidden field.
    if (get('website')) return;

    const message = [
      `Corporate request: ${get('requestType')}`,
      `Company: ${get('company')}`,
      `Role: ${get('role')}`,
      `Quantity: ${get('quantity')}`,
      `Occasion: ${get('occasion')}`,
      `Country: ${get('country')}`,
      '',
      get('message') || '(no message)',
    ].join('\n');

    setError('');
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: get('email'), message }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setError('Failed to send. Please email hello@unikmo.com instead.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[18px] border border-[#22323A]/[0.08] bg-white/60 p-7 text-center" aria-live="polite">
        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#8A6528]">Request received</p>
        <h3 className="mt-3 font-serif text-[24px]">Thank you.</h3>
        <p className="mx-auto mt-2 max-w-[420px] text-[14px] leading-[1.7] text-[#22323A]/70">
          We will reply to your work email.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[18px] border border-[#22323A]/[0.08] bg-white/60 p-6 shadow-[0_16px_45px_rgba(34,50,58,.05)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[12px] font-medium text-[#22323A] sm:col-span-2">
          What do you need?
          <select name="requestType" required defaultValue="Free sample" className={fieldClass}>
            <option>Free sample</option>
            <option>Bulk inquiry</option>
          </select>
        </label>
        <label className="block text-[12px] font-medium text-[#22323A]">
          Company
          <input name="company" required autoComplete="organization" className={fieldClass} />
        </label>
        <label className="block text-[12px] font-medium text-[#22323A]">
          Your role
          <input name="role" required autoComplete="organization-title" className={fieldClass} />
        </label>
        <label className="block text-[12px] font-medium text-[#22323A]">
          Work email
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
        <label className="block text-[12px] font-medium text-[#22323A]">
          Country
          <input name="country" required autoComplete="country-name" className={fieldClass} />
        </label>
        <label className="block text-[12px] font-medium text-[#22323A]">
          How many cards
          <select name="quantity" defaultValue="Just a sample" className={fieldClass}>
            {QUANTITY_BANDS.map((band) => (
              <option key={band}>{band}</option>
            ))}
          </select>
        </label>
        <label className="block text-[12px] font-medium text-[#22323A]">
          Occasion
          <select name="occasion" defaultValue={OCCASIONS[0]} className={fieldClass}>
            {OCCASIONS.map((occasion) => (
              <option key={occasion}>{occasion}</option>
            ))}
          </select>
        </label>
        <label className="block text-[12px] font-medium text-[#22323A] sm:col-span-2">
          Message (optional)
          <textarea name="message" rows={4} className={`${fieldClass} py-3`} />
        </label>
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <p className="mt-5 text-[12px] leading-[1.6] text-[#22323A]/70">
        We use these details only to reply to your request. See our{' '}
        <a href="/privacy" className="underline decoration-[#B38846]/50 underline-offset-4 hover:text-[#8A6528]">
          Privacy Policy
        </a>
        . This form takes no payment.
      </p>

      {status === 'error' ? (
        <p role="alert" className="mt-4 text-[13px] text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 inline-flex min-h-[48px] min-w-[200px] items-center justify-center rounded-lg bg-[#8F6A2C] px-7 text-[12px] font-medium text-white transition hover:bg-[#7A5A24] disabled:cursor-wait disabled:opacity-65"
      >
        {status === 'sending' ? 'Sending…' : 'Send request'}
      </button>
    </form>
  );
}
