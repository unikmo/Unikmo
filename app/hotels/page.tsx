import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { COMPANY } from '@/lib/company';

export const metadata: Metadata = {
  title: 'UNIKMO for Hotels | Guest Keepsakes, Retail & Premium Upsells',
  description:
    'Hotel-branded keepsake cards, standard UNIKMO retail and premium memory services for hotels and resorts. Keep photography with the hotel and earn 20% on UNIKMO retail and premium upgrades.',
  alternates: { canonical: 'https://www.unikmo.com/hotels' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'UNIKMO for Hotels',
    description:
      'A guest-memory model with hotel or co-branded cards, standard UNIKMO retail, optional curation and Times Square upgrades.',
    url: 'https://www.unikmo.com/hotels',
    siteName: 'UNIKMO',
    images: ['https://www.unikmo.com/og-image.jpg'],
    type: 'website',
  },
};

const hotelSeoLinks = [
  ['Hotel guest experience', '/hotel-guest-experience'],
  ['Luxury hotel amenities', '/luxury-hotel-amenities'],
  ['Boutique hotel amenities', '/boutique-hotel-amenities'],
  ['Hotel guest gifts', '/hotel-guest-gifts'],
  ['Hotel upselling ideas', '/hotel-upselling-ideas'],
  ['Hotel anniversary packages', '/hotel-anniversary-packages'],
  ['Hotel proposal packages', '/hotel-proposal-packages'],
  ['Hotel ancillary revenue', '/hotel-ancillary-revenue'],
];

const faqs = [
  {
    question: 'What is the difference between hotel cards and standard UNIKMO cards?',
    answer:
      'Hotel or co-branded cards are a separate B2B product bought by the property for its own guest-experience use. Standard UNIKMO cards remain UNIKMO retail products; hotels can sell them at official UNIKMO prices and earn a 20% commission.',
  },
  {
    question: 'What does a hotel or co-branded card cost?',
    answer:
      'The current partner model is approximately $4–5 per hotel or co-branded card, with final pricing depending on configuration and volume.',
  },
  {
    question: 'Does UNIKMO arrange photographers?',
    answer:
      'No. Photography is the hotel’s own optional service. The hotel arranges it, sets the price and receives the guest payment. UNIKMO does not take a share of hotel photography revenue.',
  },
  {
    question: 'What if the guest only wants to use their own photos?',
    answer:
      'That is the default low-friction path. The guest can create the UNIKMO memory from their own photos, videos and messages without a hotel photography workflow.',
  },
  {
    question: 'What can the hotel earn on UNIKMO services?',
    answer:
      'The current model is a 20% hotel commission on standard UNIKMO retail and on UNIKMO premium services sold through or attributed to the property. At current pricing, Curated is $250 and Show It — Times Square is $450.',
  },
  {
    question: 'Can hotel staff generate keys for cards they issue?',
    answer:
      'Yes. The hotel partner model includes access for generating the UNIKMO keys needed for hotel or co-branded cards issued by the property.',
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
      'A hotel guest-memory model with branded keepsake cards, UNIKMO retail, premium curation and Times Square upgrades.',
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
            <Link href="/hotel-guest-experience" className="transition-colors hover:text-[#B38846]">Guest experience</Link>
            <Link href="/hotel-upselling-ideas" className="transition-colors hover:text-[#B38846]">Revenue model</Link>
          </nav>
          <a href="#contact" className="ml-auto rounded-lg bg-[#B38846] px-5 py-3 text-[11px] font-medium text-white transition hover:bg-[#9F783D] md:ml-8">
            Partner with us
          </a>
        </div>
      </header>

      <main>
        <section className="px-5 pb-12 pt-12 text-center sm:px-8 sm:pb-16 sm:pt-16 lg:pt-20">
          <div className="mx-auto max-w-[920px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B38846]">UNIKMO for Hotels</p>
            <h1 className="mx-auto mt-4 max-w-[880px] font-serif text-[37px] leading-[1.04] tracking-[-0.025em] sm:text-[48px] lg:text-[58px]">
              Make the memory part of the stay.
            </h1>
            <p className="mx-auto mt-5 max-w-[780px] text-[15px] leading-[1.7] text-[#22323A]/68 sm:text-[17px]">
              Hotel-branded keepsake cards for your own guest experience. Standard UNIKMO retail when guests want more. Curated and Times Square when the moment deserves another level.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <a href="#contact" className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#B38846] px-7 text-[11px] font-medium text-white transition hover:bg-[#9F783D]">Discuss a partnership</a>
              <a href="#model" className="inline-flex min-h-[44px] items-center text-[11px] font-medium text-[#22323A]/68 underline decoration-[#B38846]/45 underline-offset-4">See the model</a>
            </div>
          </div>

          <div className="mx-auto mt-9 max-w-[860px] rounded-[24px] border border-[#22323A]/[0.07] bg-[radial-gradient(circle_at_50%_38%,#FFFDF9_0%,#F2E8DE_58%,#E4D6C8_100%)] p-5 shadow-[0_24px_70px_rgba(34,50,58,.09)] sm:p-8">
            <div className="relative mx-auto aspect-[1748/1240] max-w-[700px] overflow-hidden rounded-[16px] border border-white/60 shadow-[0_24px_50px_rgba(40,30,20,.16)]">
              <Image src="/hotels/unikmo-hotel-card.png" alt="UNIKMO hotel keepsake card" fill priority className="object-cover" sizes="(max-width:900px) 86vw, 700px" />
            </div>
          </div>

          <div className="mx-auto mt-7 flex max-w-[760px] flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-[#22323A]/52">
            <span>Hotel cards from approx. $4–5</span><span aria-hidden="true">•</span><span>20% on UNIKMO retail</span><span aria-hidden="true">•</span><span>Photography stays your service</span>
          </div>
        </section>

        <section id="model" className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto max-w-[760px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Two card channels</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Your hotel card and UNIKMO retail are not the same product.</h2>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              <article className="rounded-[20px] border border-[#22323A]/[0.08] bg-[#FCF9F4] p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B38846]">1 · Hotel / co-branded cards</p>
                <h3 className="mt-3 font-serif text-[28px]">A guest-experience card owned by the property.</h3>
                <p className="mt-4 text-[13px] leading-[1.7] text-[#22323A]/64">Hotels buy these cards at approximately $4–5 each, depending on final configuration and volume. Use them as a welcome amenity, VIP gift, proposal-package inclusion, anniversary keepsake or another property-led experience.</p>
                <p className="mt-4 text-[13px] leading-[1.7] text-[#22323A]/64">Hotel partners receive access to generate the UNIKMO keys for the cards they issue.</p>
              </article>
              <article className="rounded-[20px] border border-[#22323A]/[0.08] bg-[#FCF9F4] p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B38846]">2 · Standard UNIKMO retail</p>
                <h3 className="mt-3 font-serif text-[28px]">A retail product the guest can buy from you.</h3>
                <p className="mt-4 text-[13px] leading-[1.7] text-[#22323A]/64">The hotel does not buy standard UNIKMO cards as wholesale inventory. It sells them at UNIKMO’s published retail prices and receives a 20% commission on attributed sales.</p>
                <p className="mt-4 text-[13px] leading-[1.7] text-[#22323A]/64">This keeps the retail offer and pricing consistent across the hotel and direct UNIKMO channels.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto max-w-[760px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">The guest flow</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Seamless when they use their own moments. Optional when they want more.</h2>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-4">
              {[
                ['01', 'Discover', 'The guest receives or sees an UNIKMO card during the stay.'],
                ['02', 'Create', 'They use their own photos, videos and messages in the normal UNIKMO flow.'],
                ['03', 'Upgrade', 'They can add standard UNIKMO retail, Curated or Show It through the property.'],
                ['04', 'Photography', 'If they want hotel photography, the hotel arranges, prices and sells that service directly.'],
              ].map(([number, title, copy]) => (
                <article key={number} className="rounded-[18px] border border-[#22323A]/[0.08] bg-white/55 p-6 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#B38846]/40 text-[10px] font-semibold text-[#B38846]">{number}</div>
                  <h3 className="mt-4 font-serif text-[23px]">{title}</h3>
                  <p className="mt-3 text-[12px] leading-[1.65] text-[#22323A]/62">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-[1080px]">
            <div className="mx-auto max-w-[760px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Revenue model</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">The hotel keeps its own services. UNIKMO pays commission on ours.</h2>
            </div>
            <div className="mt-9 overflow-hidden rounded-[20px] border border-[#22323A]/[0.08] bg-[#FCF9F4]">
              {[
                ['Hotel / co-branded card', 'Approx. $4–5 each', 'Purchased by the property for its own guest-experience use.'],
                ['Standard UNIKMO retail', '20% hotel commission', 'Sold at UNIKMO’s published retail price.'],
                ['Curated UNIKMO', '$250 · $50 hotel commission', 'UNIKMO curates the guest’s selected photos, videos and messages.'],
                ['Show It — Times Square', '$450 · $90 hotel commission', 'UNIKMO delivers the Times Square experience and finished memory.'],
                ['Hotel photography', 'Hotel keeps the revenue', 'The hotel arranges the photographer, sets the price and receives guest payment directly.'],
              ].map(([label, value, copy], index) => (
                <div key={label} className={'grid gap-3 p-6 md:grid-cols-[240px_250px_1fr] md:items-start ' + (index ? 'border-t border-[#22323A]/[0.08]' : '')}>
                  <h3 className="font-serif text-[20px]">{label}</h3>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#B38846]">{value}</p>
                  <p className="text-[13px] leading-[1.65] text-[#22323A]/64">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto max-w-[760px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Where it fits</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Use UNIKMO where the stay already means something.</h2>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {[
                ['Proposal packages', 'The hotel creates the setting and keeps photography as its own optional service. UNIKMO provides the keepsake layer.'],
                ['Anniversaries & honeymoons', 'Include a hotel-branded card in the stay, then let the guest decide whether to use their own content or upgrade.'],
                ['VIP & milestone stays', 'Give selected guests a co-branded keepsake and keep standard UNIKMO retail available when they want additional cards.'],
              ].map(([title, copy]) => (
                <article key={title} className="rounded-[18px] border border-[#22323A]/[0.08] bg-white/55 p-6">
                  <h3 className="font-serif text-[24px] leading-[1.08]">{title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-[#22323A]/64">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-[980px] text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Explore the hotel opportunity</p>
            <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Built for search. Built around the actual operating model.</h2>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {hotelSeoLinks.map(([label, href]) => (
                <Link key={href} href={href} className="rounded-full border border-[#22323A]/[0.10] bg-white/55 px-4 py-2 text-[11px] text-[#22323A]/65 transition hover:border-[#B38846]/40 hover:text-[#B38846]">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[920px]">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Questions</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">How the hotel model works.</h2>
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Hotel partnerships</p>
            <h2 className="mx-auto mt-3 max-w-[700px] font-serif text-[32px] leading-[1.05] sm:text-[40px]">Start with the guest experience you already have.</h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[14px] leading-[1.7] text-[#22323A]/62">
              We can structure hotel-card inventory, standard UNIKMO retail and premium upgrades around the property’s existing packages and services.
            </p>
            <a
              href={'mailto:' + COMPANY.email}
              className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#B38846] px-8 text-[11px] font-medium text-white transition hover:bg-[#9F783D]"
            >
              {COMPANY.email}
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
