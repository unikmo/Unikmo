import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { COMPANY } from '@/lib/company';

const CONTACT_MAILTO = `mailto:${COMPANY.email}?subject=${encodeURIComponent('UNIKMO for organizations')}`;

export const metadata: Metadata = {
  title: 'UNIKMO for Organizations | Recognition Presented as a Private Message',
  description:
    'A premium physical card that opens a private message from your organization. For employee recognition, onboarding and client appreciation. Contact us to discuss your requirements.',
  alternates: { canonical: 'https://www.unikmo.com/corporate' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'UNIKMO for Organizations',
    description: 'A premium card that opens a private message of recognition. Contact us to discuss your requirements.',
    url: 'https://www.unikmo.com/corporate',
    siteName: 'UNIKMO',
    images: ['https://www.unikmo.com/og-image.jpg'],
    type: 'website',
  },
};

const uses = [
  {
    title: 'Employee recognition',
    body: 'Acknowledge a contribution in your own words, presented with a card the recipient can keep.',
  },
  {
    title: 'Onboarding',
    body: 'Welcome a new colleague with a personal message from their team or leadership.',
  },
  {
    title: 'Client appreciation',
    body: 'Thank a client with a private message, presented as a considered physical gift.',
  },
  {
    title: 'Leadership messages',
    body: 'Share a message from a senior leader with the people it is meant for.',
  },
];

const steps = [
  ['01', 'Contact us', 'Tell us about the occasion and the number of recipients.'],
  ['02', 'We confirm the details', 'We respond by email to agree the scope, price and delivery, and confirm them in a written order confirmation.'],
  ['03', 'You prepare the messages', 'A video, voice note, photos or written words for each recipient. Please make sure you have permission from anyone who appears in them and the rights to any music or images you use.'],
  ['04', 'You present the cards', 'Each recipient scans their card to open their message. No app or account is required.'],
];

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6528]';

export default function CorporatePage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.unikmo.com/corporate#webpage',
    url: 'https://www.unikmo.com/corporate',
    name: 'UNIKMO for Organizations',
    isPartOf: { '@id': 'https://www.unikmo.com/#website' },
    about: { '@id': 'https://www.unikmo.com/#brand' },
    inLanguage: 'en',
  };

  return (
    <div className="min-h-screen bg-[#FCF9F4] text-[#22323A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <header className="sticky top-0 z-40 border-b border-[#22323A]/[0.07] bg-[#FCF9F4]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center px-5 sm:px-8">
          <Link href="/" aria-label="UNIKMO home" className={`inline-flex min-h-[44px] items-center ${focusRing}`}>
            <Image src="/unikmo-logo-header.png" alt="UNIKMO" width={729} height={220} priority className="h-8 w-auto sm:h-9" />
          </Link>
          <nav aria-label="Primary" className="ml-auto hidden items-center gap-6 text-[13px] text-[#22323A]/75 md:flex">
            <Link href="/how-unikmo-works" className={`inline-flex min-h-[44px] items-center hover:text-[#8A6528] ${focusRing}`}>How it works</Link>
            <Link href="/hotels" className={`inline-flex min-h-[44px] items-center hover:text-[#8A6528] ${focusRing}`}>For hotels &amp; cruises</Link>
            <Link href="/faq" className={`inline-flex min-h-[44px] items-center hover:text-[#8A6528] ${focusRing}`}>FAQ</Link>
          </nav>
          <a
            href="#contact"
            className={`ml-auto inline-flex min-h-[44px] items-center rounded-lg bg-[#22323A] px-5 text-[13px] font-medium text-white transition hover:bg-[#2F4550] md:ml-6 ${focusRing}`}
          >
            Contact us
          </a>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="px-5 pb-14 pt-14 text-center sm:px-8 sm:pb-16 sm:pt-20">
          <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#8A6528]">UNIKMO for organizations</p>
          <h1 className="mx-auto mt-4 max-w-[860px] font-serif text-[36px] leading-[1.08] tracking-[-0.02em] sm:text-[48px] lg:text-[56px]">
            Recognition, presented as a private message.
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[16px] leading-[1.7] text-[#22323A]/75 sm:text-[17px]">
            A UNIKMO is a premium physical card that opens a private message from your organization. It is intended for employee recognition, onboarding and client appreciation.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#contact"
              className={`inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#22323A] px-8 text-[14px] font-medium text-white transition hover:bg-[#2F4550] ${focusRing}`}
            >
              Contact us
            </a>
          </div>
        </section>

        <section id="uses" className="border-y border-[#22323A]/[0.06] bg-[#F8F2EB] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[1120px]">
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#8A6528]">Applications</p>
              <h2 className="mt-3 font-serif text-[30px] sm:text-[38px]">Where it is used</h2>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {uses.map((use) => (
                <li key={use.title} className="rounded-[18px] border border-[#22323A]/[0.08] bg-[#FCF9F4] p-6">
                  <h3 className="font-serif text-[22px] leading-[1.2]">{use.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#22323A]/75">{use.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#8A6528]">For the recipient</p>
            <h2 className="mt-3 font-serif text-[30px] sm:text-[38px]">Scan the card to open the message.</h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#22323A]/75">
              Each card carries a QR code and a private access code. The message opens in the recipient&rsquo;s phone browser. No app and no account are required.
            </p>
          </div>
        </section>

        <section id="how" className="border-y border-[#22323A]/[0.06] bg-[#F8F2EB] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[1120px]">
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#8A6528]">Process</p>
              <h2 className="mt-3 font-serif text-[30px] sm:text-[38px]">How an organizational order works</h2>
            </div>
            <ol className="mt-10 grid gap-8 md:grid-cols-4">
              {steps.map(([n, title, body]) => (
                <li key={n} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#8A6528]/50 text-[13px] font-semibold text-[#8A6528]">{n}</div>
                  <h3 className="mt-4 font-serif text-[22px]">{title}</h3>
                  <p className="mx-auto mt-2 max-w-[240px] text-[14px] leading-[1.65] text-[#22323A]/75">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[640px] text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#8A6528]">Enquiries</p>
            <h2 className="mt-3 font-serif text-[30px] sm:text-[38px]">Contact us</h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#22323A]/75">
              To discuss your requirements, write to us and we will reply by email. Organizational orders are governed by our Terms together with the written order confirmation; where they differ, the order confirmation applies.
            </p>
            <p className="mt-6">
              <a
                href={CONTACT_MAILTO}
                className={`inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#22323A] px-8 text-[15px] font-medium text-white transition hover:bg-[#2F4550] ${focusRing}`}
              >
                {COMPANY.email}
              </a>
            </p>
          </div>
        </section>

        <section className="border-t border-[#22323A]/[0.06] bg-[#F8F2EB] px-5 py-10 sm:px-8">
          <p className="mx-auto max-w-[640px] text-center text-[14px] leading-[1.75] text-[#22323A]/75">
            Hospitality organizations may prefer{' '}
            <Link href="/hotels" className={`underline decoration-[#8A6528]/60 underline-offset-4 hover:text-[#8A6528] ${focusRing}`}>
              UNIKMO for hotels and cruises
            </Link>
            .
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
