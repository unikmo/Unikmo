import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { COMPANY } from '@/lib/company';

export const metadata: Metadata = {
  title: 'UNIKMO for Hotels | A Keepsake Service for Boutique Properties',
  description:
    'Replace the welcome note with a shareable, consent-first keepsake. UNIKMO turns the moments your staff already notice into something guests post, keep, and remember your property by.',
  alternates: { canonical: 'https://www.unikmo.com/hotels' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'UNIKMO for Hotels',
    description:
      'A keepsake service for boutique and luxury properties — built to ask almost nothing of your team.',
    url: 'https://www.unikmo.com/hotels',
    siteName: 'UNIKMO',
    images: ['https://www.unikmo.com/og-image.jpg'],
    type: 'website',
  },
};

const steps = [
  { title: 'REVEAL', copy: 'The card waits in the room at arrival. No pitch, no desk conversation.' },
  { title: 'REQUEST', copy: 'If they want it, the guest visits reception and signs a short consent form.' },
  { title: 'KEEPSAKE', copy: 'Handed over as a gift at checkout — something to remember the stay by.' },
];

const trust = [
  {
    label: 'Guest-initiated, always',
    body: 'Nothing is captured unless the guest asks and signs the form at reception. No roaming capture of guests who never opted in.',
  },
  {
    label: 'Visible, never covert',
    body: 'Your guests always know a camera is present. Unobtrusive is not the same as hidden — we don’t do hidden.',
  },
  {
    label: 'Raw footage deleted',
    body: 'Source photos and video are removed the moment the finished keepsake is assembled. Nothing sits on a server afterward.',
  },
  {
    label: 'A seven-day window',
    body: 'Guests can request prints or extra copies from the finished keepsake, for a fee, for seven days. Then nothing further is produced.',
  },
];

const asks = [
  {
    label: 'Reception',
    body: 'Takes the consent form when a guest asks, and lets whoever captures the moment know. The entire new task.',
  },
  {
    label: 'Capture',
    body: 'Your own staff, or the freelance photographer many boutique properties already use for portraits and proposals. UNIKMO doesn’t supply or manage this.',
  },
  {
    label: 'Everything else',
    body: 'UNIKMO supplies the card and the curation behind it — the part that turns footage into a finished keepsake.',
  },
];

const faqs = [
  {
    question: 'What does this ask of our staff?',
    answer:
      'Reception takes a signed consent form when a guest requests it, and lets whoever captures the moment know. Capture itself is done by your own staff, or by a photographer your property already works with. There is no new equipment, booking system, or role to fill.',
  },
  {
    question: 'What happens to the photos and video?',
    answer:
      'Raw footage is used only to assemble the finished keepsake, then deleted immediately. Guests have a seven-day window afterward to request prints or extra copies from the finished piece, for a fee. Nothing is retained beyond that.',
  },
  {
    question: 'Does this put UNIKMO staff on our property?',
    answer:
      'No. UNIKMO supplies the card and the curation pipeline that assembles submitted footage into a finished memory. Consent, capture, and the guest-facing moment all stay with your property.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Pricing is worked out directly with each property, depending on volume and how the keepsake is offered to guests. Reach out and we’ll walk through it.',
  },
];

export default function HotelsPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.unikmo.com/hotels#webpage',
    url: 'https://www.unikmo.com/hotels',
    name: 'UNIKMO for Hotels',
    description:
      'A keepsake service for boutique and luxury properties, built on UNIKMO’s existing curated-memory pipeline.',
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://www.unikmo.com/hotels#faq',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FCF9F4] text-[#22323A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="sticky top-0 z-40 border-b border-[#22323A]/[0.07] bg-[#FCF9F4]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center px-5 sm:px-8">
          <Link href="/" aria-label="UNIKMO home">
            <Image src="/unikmo-logo-header.png" alt="UNIKMO — The Key to Your Memory" width={729} height={220} priority className="h-8 w-auto sm:h-9" />
          </Link>
          <nav className="ml-auto hidden items-center gap-7 text-[11px] text-[#22323A]/65 md:flex">
            <Link href="/how-unikmo-works" className="hover:text-[#B38846]">How it works</Link>
            <Link href="/curated" className="hover:text-[#B38846]">Curated UNIKMO</Link>
          </nav>
          <a href="#contact" className="ml-auto rounded-lg bg-[#B38846] px-5 py-3 text-[11px] font-medium text-white transition hover:bg-[#9D773D] md:ml-8">
            Partner with us
          </a>
        </div>
      </header>

      <main>
        <section className="px-5 pb-14 pt-12 text-center sm:px-8 sm:pb-16 sm:pt-16 lg:pt-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B38846]">UNIKMO for Hotels</p>
          <h1 className="mx-auto mt-4 max-w-[940px] font-serif text-[36px] leading-[1.06] tracking-[-0.025em] sm:text-[48px] lg:text-[58px]">
            Your welcome note was always thoughtful. Now it can last.
          </h1>

          <div className="mx-auto mt-9 grid max-w-[1180px] gap-5 lg:grid-cols-2">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] border border-[#22323A]/[0.06] bg-[#EDE4D8]">
              <Image
                src="/curated/curated-card.webp"
                alt="A finished UNIKMO keepsake card beside printed photos"
                fill
                priority
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] border border-[#22323A]/[0.06] bg-[#EDE4D8]">
              <Image
                src="/story/she-opens.png"
                alt="A guest unlocking a private UNIKMO memory"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <p className="mx-auto mt-7 max-w-[760px] text-[15px] leading-[1.75] text-[#22323A]/68 sm:text-[17px]">
            UNIKMO turns the moments your staff already notice — an anniversary, a proposal, a milestone stay —
            into a keepsake your guest keeps, shares, and remembers your property by. No new equipment. No new role.
            No pitch at check-in.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a href="#contact" className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#B38846] px-7 text-[11px] font-medium text-white transition hover:bg-[#9D773D]">
              Start a partner conversation
            </a>
            <a href="#how" className="inline-flex min-h-[44px] items-center text-[11px] font-medium text-[#22323A]/70 underline decoration-[#B38846]/50 underline-offset-4">
              See how it works
            </a>
          </div>
        </section>

        <section className="border-y border-[#22323A]/[0.06] bg-[#F8F2EB] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[820px] text-center">
            <p className="font-serif text-[20px] italic leading-[1.5] text-[#22323A]/55">
              &ldquo;A note on the pillow, a bottle, a handwritten card.&rdquo;
            </p>
            <p className="mt-6 text-[15px] leading-[1.8] text-[#22323A]/70 sm:text-[17px]">
              It&rsquo;s genuinely thoughtful. It is also <strong className="text-[#22323A]">read once and thrown away</strong> —
              one voice, nothing from the people who actually matter to the guest, no life after checkout.
            </p>
            <p className="mt-5 text-[15px] leading-[1.8] text-[#22323A]/70 sm:text-[17px]">
              UNIKMO replaces it with a keepsake: real footage from the stay, assembled into one finished piece the
              guest can <strong className="text-[#22323A]">post, or keep, for good.</strong>
            </p>
          </div>
        </section>

        <section id="how" className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[980px]">
            <div className="mx-auto max-w-[680px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B38846]">How it reaches the guest</p>
              <h2 className="mt-3 font-serif text-[32px] sm:text-[42px]">Low-pressure, guest-led, done.</h2>
            </div>

            <div className="mt-10 grid overflow-hidden rounded-[20px] border border-[#22323A]/[0.08] bg-[#22323A] text-white md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className={`p-8 text-center ${index ? 'border-t border-white/10 md:border-l md:border-t-0' : ''}`}>
                  <p className="text-[10px] font-semibold tracking-[0.22em] text-[#D7B77C]">{step.title}</p>
                  <p className="mx-auto mt-3 max-w-[240px] text-[13px] leading-[1.65] text-white/62">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#22323A]/[0.06] bg-[#F8F2EB] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[820px] text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B38846]">Capture, done right</p>
            <h2 className="mt-3 font-serif text-[32px] sm:text-[42px]">Real moments, not posed ones.</h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[14px] leading-[1.75] text-[#22323A]/62 sm:text-[15px]">
              A visible camera, an unobtrusive photographer who stays back and never says &ldquo;smile&rdquo; — never a
              hidden or disguised one. Candid, not covert.
            </p>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[980px]">
            <div className="mx-auto max-w-[680px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B38846]">Trust, by design</p>
              <h2 className="mt-3 font-serif text-[32px] sm:text-[42px]">What this protects — for your guests and your name.</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {trust.map((item) => (
                <article key={item.label} className="rounded-[20px] border border-[#22323A]/[0.08] bg-[#FCF9F4] p-7">
                  <h3 className="font-serif text-[22px] leading-[1.2]">{item.label}</h3>
                  <p className="mt-3 text-[13px] leading-[1.7] text-[#22323A]/62">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#22323A]/[0.06] bg-[#F8F2EB] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[980px]">
            <div className="mx-auto max-w-[680px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B38846]">What this asks of your property</p>
              <h2 className="mt-3 font-serif text-[32px] sm:text-[42px]">Almost nothing changes about how you already work.</h2>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {asks.map((item) => (
                <div key={item.label} className="border-t border-[#22323A]/[0.12] pt-5 text-center sm:text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B38846]">{item.label}</p>
                  <p className="mt-3 text-[13px] leading-[1.7] text-[#22323A]/62">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[900px]">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B38846]">Questions</p>
              <h2 className="mt-3 font-serif text-[32px] sm:text-[42px]">Before you reach out.</h2>
            </div>

            <div className="mt-10 divide-y divide-[#22323A]/[0.08] border-y border-[#22323A]/[0.08]">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-serif text-[20px] leading-[1.25] sm:text-[22px]">
                    {faq.question}
                    <span className="shrink-0 text-[#B38846] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-[760px] pb-6 pr-10 text-[14px] leading-[1.75] text-[#22323A]/66 sm:text-[15px]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-[#22323A]/[0.06] bg-[#F8F2EB] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[680px] text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B38846]">Let&rsquo;s talk</p>
            <h2 className="mt-3 font-serif text-[32px] sm:text-[42px]">Bring UNIKMO to your property.</h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[14px] leading-[1.75] text-[#22323A]/62 sm:text-[15px]">
              We&rsquo;re starting with a small number of boutique properties. Reach out and we&rsquo;ll walk through
              what a pilot would look like for yours.
            </p>
            <a
              href={`mailto:${COMPANY.email}`}
              className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#B38846] px-7 text-[11px] font-medium text-white transition hover:bg-[#9D773D]"
            >
              {COMPANY.email}
            </a>
            <p className="mt-5 text-[11px] leading-[1.6] text-[#22323A]/45">UNIKMO is a project of {COMPANY.legalName}.</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
