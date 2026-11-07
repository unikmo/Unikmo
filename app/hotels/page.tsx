import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { COMPANY } from '@/lib/company';

const TISONIK_HOTELS_URL = 'https://tisonik.com/hotels';
const PILOT_MAILTO = `mailto:${COMPANY.email}?subject=${encodeURIComponent('UNIKMO for Hotels: pilot conversation')}`;

export const metadata: Metadata = {
  title: 'UNIKMO for Hotels | A Guest Experience Keepsake for Luxury Hotels & Resorts',
  description:
    'A UNIKMO card waits in the room. Guests scan it, receive a personal welcome, and leave with a digital keepsake of their stay. No new app. Start with one property.',
  alternates: { canonical: 'https://www.unikmo.com/hotels' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'UNIKMO for Hotels',
    description: 'A welcome card that becomes a keepsake, for premium and luxury hospitality. No new app. Start with one property.',
    url: 'https://www.unikmo.com/hotels',
    siteName: 'UNIKMO',
    images: ['https://www.unikmo.com/og-image.jpg'],
    type: 'website',
  },
};

const moments = [
  {
    label: 'Arrival',
    title: 'The card is already in the room.',
    copy: 'Scanning opens a warm, branded welcome and shows guests what matters most on day one.',
  },
  {
    label: 'Departure',
    title: 'The same card becomes their keepsake.',
    copy: 'Curated highlights of the stay travel home with them, carrying your brand long after checkout.',
  },
];

const steps = [
  'The card is placed in the room before arrival.',
  'Guest scans, and a personal welcome experience opens.',
  'Optional moments can be captured during the stay (guest-initiated only).',
  'At departure the same QR becomes a lasting digital memory.',
];

const reasons = [
  'Replaces disposable printed materials',
  'Creates a premium, emotional arrival ritual',
  'Gives guests something they actually keep and share',
  'Guest-initiated and privacy-first by design',
  'Pairs seamlessly with Tisonik for the full stay experience',
];

function ArrowLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default function HotelsPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.unikmo.com/hotels#webpage',
    url: 'https://www.unikmo.com/hotels',
    name: 'UNIKMO for Hotels',
    description: 'A welcome card that becomes a digital keepsake of the stay, for premium and luxury hospitality.',
    isPartOf: { '@id': 'https://www.unikmo.com/#website' },
    about: { '@id': 'https://www.unikmo.com/#brand' },
    inLanguage: 'en',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'UNIKMO', item: 'https://www.unikmo.com/' },
      { '@type': 'ListItem', position: 2, name: 'UNIKMO for Hotels', item: 'https://www.unikmo.com/hotels' },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FCF9F4] text-[#22323A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="sticky top-0 z-40 border-b border-[#22323A]/[0.07] bg-[#FCF9F4]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center" aria-label="UNIKMO home">
            <Image src="/unikmo-logo-header.png" alt="UNIKMO — The Key to Your Memory" width={729} height={220} priority className="h-8 w-auto sm:h-9" />
          </Link>
          <nav className="ml-auto hidden items-center gap-7 text-[11px] text-[#22323A]/65 md:flex">
            <Link href="/how-unikmo-works" className="transition-colors hover:text-[#B38846]">How it works</Link>
            <a href={TISONIK_HOTELS_URL} className="transition-colors hover:text-[#B38846]">Tisonik for Hotels</a>
          </nav>
          <a href="#pilot" className="ml-auto rounded-lg bg-[#B38846] px-5 py-3 text-[11px] font-medium text-white shadow-[0_8px_25px_rgba(179,136,70,.16)] transition-colors hover:bg-[#9F783D] md:ml-8">
            Request a pilot conversation
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="px-5 pb-12 pt-12 text-center sm:px-8 sm:pb-16 sm:pt-16 lg:pt-20">
          <div className="mx-auto max-w-[900px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B38846]">UNIKMO for Hotels</p>
            <h1 className="mx-auto mt-4 max-w-[860px] font-serif text-[35px] leading-[1.04] tracking-[-0.025em] sm:text-[44px] lg:text-[52px]">
              Your welcome used to disappear.
              <br />
              <span className="text-[#22323A]/80">Now it becomes the thing they keep.</span>
            </h1>
          </div>

          <div className="mx-auto mt-9 max-w-[820px] rounded-[24px] border border-[#22323A]/[0.07] bg-[radial-gradient(circle_at_50%_38%,#FFFDF9_0%,#F2E8DE_58%,#E4D6C8_100%)] p-5 shadow-[0_24px_70px_rgba(34,50,58,.09)] sm:p-8">
            <div className="relative mx-auto aspect-[4/3] max-w-[680px] overflow-hidden rounded-[16px] border border-white/60 shadow-[0_24px_50px_rgba(40,30,20,.16)]">
              <Image src="/hotels/hotel-card.webp" alt="The UNIKMO hotel card: a physical key to a private memory" fill priority className="object-cover" sizes="(max-width:900px) 86vw, 680px" />
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-[760px]">
            <p className="text-[15px] leading-[1.65] text-[#22323A]/72 sm:text-[17px]">
              <strong className="font-semibold text-[#22323A]">A beautiful UNIKMO card waits in the room.</strong>{' '}
              Guests scan it, receive a personal welcome, and leave with a digital keepsake of their stay.
            </p>
            <p className="mx-auto mt-4 max-w-[720px] text-[13px] leading-[1.7] text-[#22323A]/58 sm:text-[14px]">
              No new app. No pitch at check-in. Just a moment that lasts.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <a href="#pilot" className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#B38846] px-7 text-[11px] font-medium text-white shadow-[0_10px_28px_rgba(179,136,70,.18)] transition-colors hover:bg-[#9F783D]">
                Start a one-property pilot
              </a>
              <ArrowLink
                href={TISONIK_HOTELS_URL}
                className="inline-flex min-h-[44px] items-center text-[11px] font-medium text-[#22323A]/68 underline decoration-[#B38846]/45 underline-offset-4 transition hover:text-[#22323A]"
              >
                See the full in-stay experience with Tisonik →
              </ArrowLink>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto grid max-w-[1040px] gap-9 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">The problem</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Most welcome notes are read once and thrown away.</h2>
            </div>
            <div className="self-end text-[15px] leading-[1.75] text-[#22323A]/68">
              <p>Printed letters, flyers and programmes create clutter and waste, then disappear.</p>
              <p className="mt-4">
                <strong className="font-semibold text-[#22323A]">Guests remember how they felt. They rarely keep the paper.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">The solution</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">One card. Two moments.</h2>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {moments.map((item) => (
                <article key={item.label} className="rounded-[18px] border border-[#22323A]/[0.07] bg-[#FCF9F4] p-7 shadow-[0_8px_26px_rgba(34,50,58,.04)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B38846]">{item.label}</p>
                  <h3 className="mt-3 font-serif text-[26px] leading-[1.1]">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#22323A]/66">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto grid max-w-[1080px] items-center gap-9 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[22px] border border-white/60 bg-[#F2E9DF] shadow-[0_18px_44px_rgba(40,30,20,.12)]">
              <Image src="/story/she-opens.png" alt="A person unlocking a private UNIKMO memory from a card" fill className="object-cover" sizes="(max-width:1024px) 100vw, 520px" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">How it works</p>
              <ol className="mt-4 space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-[14px] leading-[1.65] text-[#22323A]/72 sm:text-[15px]">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#4B6A66]/35 bg-[#E8EFEC] font-serif text-[16px] text-[#3F5E5A]">
                      {index + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 font-serif text-[22px] leading-[1.2]">Almost nothing changes in your daily operations.</p>
            </div>
          </div>
        </section>

        {/* Why properties choose it */}
        <section className="px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[900px]">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Why properties choose it</p>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3 sm:last:col-span-2 rounded-[16px] border border-[#22323A]/[0.08] bg-white/55 p-5 text-[14px] leading-[1.6] text-[#22323A]/74">
                  <span className="mt-2 block h-[3px] w-6 flex-none rounded-full bg-[#4B6A66]/55" aria-hidden="true" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Controlled pilots */}
        <section id="pilot" className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 text-center sm:px-8 sm:py-16">
          <div className="mx-auto max-w-[880px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Controlled pilots</p>
            <h2 className="mx-auto mt-3 max-w-[680px] font-serif text-[32px] leading-[1.05] sm:text-[40px]">
              Start with one property.
              <br />
              Define success together.
              <br />
              Scale only when the numbers prove it.
            </h2>
            <a
              href={PILOT_MAILTO}
              className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#B38846] px-8 text-[11px] font-medium text-white shadow-[0_10px_28px_rgba(179,136,70,.18)] transition-colors hover:bg-[#9F783D]"
            >
              Request a pilot conversation
            </a>
            <p className="mt-4 text-[12px] text-[#22323A]/55">{COMPANY.email}</p>
          </div>
        </section>

        {/* Cross-link */}
        <section className="px-5 py-12 text-center sm:px-8 sm:py-14">
          <div className="mx-auto max-w-[720px]">
            <p className="text-[14px] leading-[1.7] text-[#22323A]/66 sm:text-[15px]">
              Want the full experience layer during the stay: real-time recovery, staff recognition and relevant offers?
            </p>
            <ArrowLink
              href={TISONIK_HOTELS_URL}
              className="mt-4 inline-flex min-h-[44px] items-center text-[13px] font-medium text-[#22323A] underline decoration-[#B38846]/55 underline-offset-4 transition hover:text-[#B38846]"
            >
              → Explore Tisonik for Hotels
            </ArrowLink>
            <p className="mt-8 text-[11px] leading-[1.6] text-[#22323A]/45">UNIKMO is a project of {COMPANY.legalName}.</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
