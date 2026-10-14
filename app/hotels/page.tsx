import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { COMPANY } from '@/lib/company';

export const metadata: Metadata = {
  title: 'UNIKMO for Hotels | A Keepsake Service for Boutique Properties',
  description:
    'Give guests a hotel-branded keepsake that outlasts the welcome note. Co-branded UNIKMO cards for your guest experience, and 20% on every UNIKMO sold from your property.',
  alternates: { canonical: 'https://www.unikmo.com/hotels' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'UNIKMO for Hotels',
    description: 'Hotel-branded keepsake cards for boutique and luxury properties, with 20% on every UNIKMO sold from your property.',
    url: 'https://www.unikmo.com/hotels',
    siteName: 'UNIKMO',
    images: ['https://www.unikmo.com/og-image.jpg'],
    type: 'website',
  },
};

const steps = [
  {
    title: 'The card is waiting',
    copy: 'A UNIKMO card, in your branding, is in the room at arrival. It explains itself. Nothing is said at check-in and nothing is sold.',
  },
  {
    title: 'The guest makes it theirs',
    copy: 'Your team activates the key. The guest adds their own photos, video and messages, and the memory is theirs to open, keep and share.',
  },
  {
    title: 'Remembered, with your name on it',
    copy: 'The keepsake travels home with your property’s name on it. Guests who want more can ask at reception for more cards or a curated memory.',
  },
];

const offers = [
  {
    eyebrow: 'For your guest experience',
    title: 'Your hotel. Your card.',
    body: 'A hotel-branded or co-branded UNIKMO, given as part of the stay: a welcome or VIP amenity, an anniversary or honeymoon package, a proposal package, a loyalty gift. Your team activates the key; the guest adds their own photos, video and messages.',
    figure: 'From around $4–5 per card',
    note: 'Depending on configuration and volume. The card is yours to use as you see fit.',
  },
  {
    eyebrow: 'For guests who want more',
    title: 'Sell UNIKMO from the property.',
    body: 'Hold stock and offer standard UNIKMO cards, Curated UNIKMO and the Times Square experience at normal UNIKMO prices. One published price everywhere, so there is nothing to negotiate and nothing to discount.',
    figure: 'Your hotel earns 20%',
    note: 'A $24 Single sold at reception earns you $4.80. The same 20% applies to Curated and Times Square orders.',
  },
  {
    eyebrow: 'Already offer photography?',
    title: 'Your photographer, your revenue.',
    body: 'Images from your own photographer can become part of the guest’s UNIKMO. Photography stays entirely your service: you set the price and keep all of it. UNIKMO does not process it.',
    figure: 'You keep 100%',
    note: 'An optional layer on top of either offer, never a requirement.',
  },
];

const trust = [
  {
    label: 'Private by default',
    body: 'Each UNIKMO opens only with its own key. The guest decides who they share it with, so nothing about their stay becomes public by accident.',
  },
  {
    label: 'Owned by the guest',
    body: 'The memory belongs to the person who made it. Your property is part of the story, never a gatekeeper of it.',
  },
  {
    label: 'Consent stays with you',
    body: 'UNIKMO does not capture anything on your property. Any photography you offer runs under your own consent process, and you decide what it covers.',
  },
  {
    label: 'One published price',
    body: 'Guests pay the same UNIKMO prices everywhere. There is nothing to discount and no awkward comparison for your front desk to explain.',
  },
];

const asks = [
  {
    label: 'Reception',
    body: 'Activates keys for hotel-branded cards and, if you choose to sell, hands over stock at the published price. That is the entire new task.',
  },
  {
    label: 'Photography',
    body: 'Entirely optional. If you already have a photographer, their images can be added to a guest’s UNIKMO. You set the price and keep the revenue.',
  },
  {
    label: 'Everything else',
    body: 'UNIKMO supplies the cards, the platform and the curation behind it, so your team never has to build or run anything.',
  },
];

const faqs = [
  {
    question: 'What does this ask of our staff?',
    answer:
      'Reception activates the key for any hotel-branded card and, if you sell UNIKMO from the property, hands over stock at the published price. There is no new equipment, booking system, or role to fill.',
  },
  {
    question: 'Can the cards carry our branding?',
    answer:
      'Yes. Cards can be hotel-branded or co-branded with UNIKMO, and the hotel decides how to use them: a welcome or VIP amenity, an anniversary or honeymoon package, a proposal package, a loyalty gift, or part of another package.',
  },
  {
    question: 'How does the 20% work?',
    answer:
      'Standard UNIKMO cards, Curated UNIKMO and the Times Square experience are sold at the published UNIKMO price, which the hotel does not change. When a guest buys through your property, your hotel earns 20% of the sale. For example, a $24 Single earns $4.80.',
  },
  {
    question: 'Who handles photography and consent?',
    answer:
      'You do, if you offer photography. It is your service and your revenue, and it runs under your own consent process. UNIKMO does not capture anything on your property and does not process photography payments. Images you provide can become part of a guest’s UNIKMO.',
  },
  {
    question: 'Does this put UNIKMO staff on our property?',
    answer:
      'No. UNIKMO supplies the cards, the platform and the curation behind it. The guest-facing moment stays with your property.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Hotel-branded or co-branded cards start from around $4–5 each, depending on configuration and volume, and you decide how to use them. Standard UNIKMO cards and services sold from your property are at the normal published prices, and your hotel earns 20% of each sale. Photography you offer is yours to price and keep.',
  },
];

function KeyMark() {
  return (
    <svg viewBox="0 0 32 52" className="h-8 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="16" cy="10" r="6" />
      <path d="M16 16v27m0-17h7m-7 8h5m-5 9h5" />
    </svg>
  );
}

export default function HotelsPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.unikmo.com/hotels#webpage',
    url: 'https://www.unikmo.com/hotels',
    name: 'UNIKMO for Hotels',
    description: 'Hotel-branded keepsake cards for boutique and luxury properties, built on UNIKMO’s existing memory platform.',
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
        <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center" aria-label="UNIKMO home">
            <Image src="/unikmo-logo-header.png" alt="UNIKMO — The Key to Your Memory" width={729} height={220} priority className="h-8 w-auto sm:h-9" />
          </Link>
          <nav className="ml-auto hidden items-center gap-7 text-[11px] text-[#22323A]/65 md:flex">
            <Link href="/how-unikmo-works" className="transition-colors hover:text-[#B38846]">How it works</Link>
            <Link href="/curated" className="transition-colors hover:text-[#B38846]">Curated UNIKMO</Link>
          </nav>
          <a href="#contact" className="ml-auto rounded-lg bg-[#B38846] px-5 py-3 text-[11px] font-medium text-white shadow-[0_8px_25px_rgba(179,136,70,.16)] transition-colors hover:bg-[#9F783D] md:ml-8">
            Partner with us
          </a>
        </div>
      </header>

      <main>
        <section className="px-5 pb-12 pt-12 text-center sm:px-8 sm:pb-16 sm:pt-16 lg:pt-20">
          <div className="mx-auto max-w-[900px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B38846]">UNIKMO for Hotels</p>
            <h1 className="mx-auto mt-4 max-w-[860px] font-serif text-[35px] leading-[1.04] tracking-[-0.025em] sm:text-[44px] lg:text-[52px]">
              Your welcome note was always thoughtful. Now it can last.
            </h1>
          </div>

          <div className="mx-auto mt-9 max-w-[820px] rounded-[24px] border border-[#22323A]/[0.07] bg-[radial-gradient(circle_at_50%_38%,#FFFDF9_0%,#F2E8DE_58%,#E4D6C8_100%)] p-5 shadow-[0_24px_70px_rgba(34,50,58,.09)] sm:p-8">
            <div className="relative mx-auto aspect-[1748/1240] max-w-[680px] overflow-hidden rounded-[16px] border border-white/60 shadow-[0_24px_50px_rgba(40,30,20,.16)]">
              <Image src="/hotels/unikmo-hotel-card.png" alt="The UNIKMO hotel card: a physical key to a private memory" fill priority className="object-cover" sizes="(max-width:900px) 86vw, 680px" />
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-[760px]">
            <p className="text-[15px] leading-[1.65] text-[#22323A]/72 sm:text-[17px]">
              <strong className="font-semibold text-[#22323A]">Give guests a keepsake with your name on it, that they keep and share.</strong>{' '}
              An anniversary, a proposal, a milestone stay, remembered by your property.
            </p>
            <p className="mx-auto mt-4 max-w-[720px] text-[13px] leading-[1.7] text-[#22323A]/58 sm:text-[14px]">
              No new equipment. No new role. No pitch at check-in.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <a href="#contact" className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#B38846] px-7 text-[11px] font-medium text-white shadow-[0_10px_28px_rgba(179,136,70,.18)] transition-colors hover:bg-[#9F783D]">
                Start a partner conversation
              </a>
              <a href="#how" className="inline-flex min-h-[44px] items-center text-[11px] font-medium text-[#22323A]/68 underline decoration-[#B38846]/45 underline-offset-4 transition hover:text-[#22323A]">
                See how it works
              </a>
            </div>
            <div className="mx-auto mt-6 flex max-w-[640px] flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-[#22323A]/52">
              <span>Hotel-branded</span><span aria-hidden="true">•</span><span>Private by default</span><span aria-hidden="true">•</span><span>20% on every sale</span>
            </div>
          </div>
        </section>

        <section className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto grid max-w-[1040px] gap-9 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">The moment</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">A note is thoughtful once. Then it is gone.</h2>
            </div>
            <div className="self-end text-[15px] leading-[1.75] text-[#22323A]/68">
              <p>
                A note on the pillow, a bottle, a handwritten card. It is read once and thrown away: one voice, nothing from the
                people who matter to the guest, no life after checkout.
              </p>
              <p className="mt-4">
                UNIKMO replaces it with a keepsake. The guest’s own photos, video and messages, in one private memory they can{' '}
                <strong className="font-semibold text-[#22323A]">post, or keep, for good.</strong>
              </p>
            </div>
          </div>
        </section>

        <section id="how" className="px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">The welcome</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">It starts with a surprise in the room.</h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[14px] leading-[1.7] text-[#22323A]/64">The card does the explaining. Interest turns into a request, with no pitch from your team.</p>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step.title} className="rounded-[18px] border border-[#22323A]/[0.07] bg-[#FCF9F4] p-6 text-center shadow-[0_8px_26px_rgba(34,50,58,.04)]">
                  <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#4B6A66]/35 bg-[#E8EFEC] text-[#3F5E5A]">
                    {index === 1 ? <KeyMark /> : <span className="font-serif text-[21px]">{index === 0 ? 1 : 3}</span>}
                  </div>
                  <h3 className="font-serif text-[24px] leading-[1.08]">{step.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-[#22323A]/64">{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">How hotels work with UNIKMO</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Offer it as a gift. Sell it as a service.</h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[14px] leading-[1.7] text-[#22323A]/64">Use one, or all three. Each is simple, and none needs a new role at your property.</p>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {offers.map((offer) => (
                <article key={offer.title} className="flex flex-col rounded-[18px] border border-[#22323A]/[0.07] bg-[#FCF9F4] p-6 shadow-[0_8px_26px_rgba(34,50,58,.04)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B38846]">{offer.eyebrow}</p>
                  <h3 className="mt-3 font-serif text-[26px] leading-[1.08]">{offer.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.7] text-[#22323A]/66">{offer.body}</p>
                  <div className="mt-auto pt-6">
                    <span className="mb-3 block h-[3px] w-9 rounded-full bg-[#4B6A66]/55" aria-hidden="true" />
                    <p className="font-serif text-[22px] leading-[1.1]">{offer.figure}</p>
                    <p className="mt-2 text-[12px] leading-[1.6] text-[#22323A]/55">{offer.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto grid max-w-[1080px] items-center gap-9 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[22px] border border-white/60 bg-[#F2E9DF] shadow-[0_18px_44px_rgba(40,30,20,.12)]">
              <Image src="/story/she-opens.png" alt="A guest unlocking a private UNIKMO memory" fill className="object-cover" sizes="(max-width:1024px) 100vw, 520px" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Photography, if you offer it</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Your photographer. Your revenue.</h2>
              <p className="mt-4 max-w-[520px] text-[14px] leading-[1.75] text-[#22323A]/66 sm:text-[15px]">
                Many boutique properties already work with a photographer for portraits and proposals. Those images can
                become part of a guest&rsquo;s UNIKMO, an unposed, candid record of the stay. It is your service: you set the
                price, you run consent, and you keep the revenue. UNIKMO simply gives the photographs somewhere to live.
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Trust, by design</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Built to protect your guests and your name.</h2>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {trust.map((item) => (
                <article key={item.label} className="rounded-[18px] border border-[#22323A]/[0.08] bg-white/55 p-6">
                  <span className="mb-4 block h-[3px] w-9 rounded-full bg-[#4B6A66]/55" aria-hidden="true" />
                  <h3 className="font-serif text-[24px] leading-[1.08]">{item.label}</h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-[#22323A]/64">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">What this asks of your property</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Almost nothing changes about how you work.</h2>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {asks.map((item) => (
                <article key={item.label} className="rounded-[18px] border border-[#22323A]/[0.07] bg-[#FCF9F4] p-6 shadow-[0_8px_26px_rgba(34,50,58,.04)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B38846]">{item.label}</p>
                  <p className="mt-3 text-[13px] leading-[1.7] text-[#22323A]/66">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[920px]">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Questions</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Before you reach out.</h2>
            </div>
            <div className="mt-8 divide-y divide-[#22323A]/[0.08] border-y border-[#22323A]/[0.08]">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[15px] font-medium">
                    {faq.question}
                    <span className="text-[#B38846] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-[760px] pb-6 pr-10 text-[14px] leading-[1.7] text-[#22323A]/64">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 text-center sm:px-8 sm:py-16">
          <div className="mx-auto max-w-[880px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Let’s talk</p>
            <h2 className="mx-auto mt-3 max-w-[680px] font-serif text-[32px] leading-[1.05] sm:text-[40px]">Give your guests something that lasts.</h2>
            <p className="mx-auto mt-4 max-w-[620px] text-[14px] leading-[1.7] text-[#22323A]/62">
              We are starting with a small number of boutique properties. Reach out and we will walk through what a pilot would look like for yours.
            </p>
            <a
              href={`mailto:${COMPANY.email}`}
              className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#B38846] px-8 text-[11px] font-medium text-white shadow-[0_10px_28px_rgba(179,136,70,.18)] transition-colors hover:bg-[#9F783D]"
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
