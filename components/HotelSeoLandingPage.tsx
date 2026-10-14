import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from './SiteFooter';
import type { HotelSeoPage } from '@/lib/hotel-seo-pages';
import { hotelSeoPages } from '@/lib/hotel-seo-pages';

function PageHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#22323A]/[0.07] bg-[#FCF9F4]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center px-5 sm:px-8">
        <Link href="/" className="inline-flex items-center" aria-label="UNIKMO home">
          <Image src="/unikmo-logo-header.png" alt="UNIKMO — The Key to Your Memory" width={729} height={220} priority className="h-8 w-auto sm:h-9" />
        </Link>
        <nav className="ml-auto hidden items-center gap-7 text-[11px] text-[#22323A]/65 md:flex">
          <Link href="/hotels" className="transition-colors hover:text-[#B38846]">Hotels</Link>
          <Link href="/curated" className="transition-colors hover:text-[#B38846]">Curated UNIKMO</Link>
        </nav>
        <Link href="/hotels#contact" className="ml-auto rounded-lg bg-[#B38846] px-5 py-3 text-[11px] font-medium text-white transition hover:bg-[#9F783D] md:ml-8">
          Partner with UNIKMO
        </Link>
      </div>
    </header>
  );
}

function RevenueModel() {
  const rows = [
    {
      label: 'Hotel / co-branded cards',
      value: 'Approx. $4–5 per card',
      copy: 'A separate B2B card product purchased by the property for its own guest-experience use. Hotel partners generate the keys for cards they issue.',
    },
    {
      label: 'Standard UNIKMO retail',
      value: '20% hotel commission',
      copy: 'The hotel sells at UNIKMO’s published retail price. It does not buy these standard cards as wholesale stock.',
    },
    {
      label: 'Curated UNIKMO',
      value: '$250 · 20% commission',
      copy: 'UNIKMO professionally assembles the guest’s chosen photos, videos and messages. The hotel earns commission when the order is attributed to the property.',
    },
    {
      label: 'Show It — Times Square',
      value: '$450 · 20% commission',
      copy: 'The premium Times Square experience remains an UNIKMO service, with the same partner commission model.',
    },
    {
      label: 'Hotel photography',
      value: 'Hotel sets the price',
      copy: 'Photography is the hotel’s own service. UNIKMO does not arrange photographers or take a share of that hotel revenue.',
    },
  ];

  return (
    <section className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-[1080px]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">The partner model</p>
          <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Two card channels. Clear ownership. Clear economics.</h2>
        </div>
        <div className="mt-9 overflow-hidden rounded-[20px] border border-[#22323A]/[0.08] bg-[#FCF9F4]">
          {rows.map((row, index) => (
            <div key={row.label} className={'grid gap-3 p-6 md:grid-cols-[220px_220px_1fr] md:items-start ' + (index ? 'border-t border-[#22323A]/[0.08]' : '')}>
              <h3 className="font-serif text-[20px] leading-[1.15]">{row.label}</h3>
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#B38846]">{row.value}</p>
              <p className="text-[13px] leading-[1.65] text-[#22323A]/64">{row.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuestJourney() {
  return (
    <section className="px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Guest journey</p>
          <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Seamless by default. Hotel involvement only when the guest asks for it.</h2>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-4">
          {[
            ['01', 'Discover', 'The guest receives or sees an UNIKMO card at the property.'],
            ['02', 'Create', 'They use their own photos, videos and messages in the normal UNIKMO flow.'],
            ['03', 'Add more', 'If wanted, they can buy standard UNIKMO, Curated or Show It through the hotel.'],
            ['04', 'Optional photography', 'If the guest wants hotel photography, the hotel arranges and sells that service directly.'],
          ].map(([n, title, copy]) => (
            <article key={n} className="rounded-[18px] border border-[#22323A]/[0.08] bg-white/55 p-6 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#B38846]/40 text-[10px] font-semibold text-[#B38846]">{n}</div>
              <h3 className="mt-4 font-serif text-[23px]">{title}</h3>
              <p className="mt-3 text-[12px] leading-[1.65] text-[#22323A]/62">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HotelSeoLandingPage({ page }: { page: HotelSeoPage }) {
  const url = 'https://www.unikmo.com/' + page.slug;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'UNIKMO', item: 'https://www.unikmo.com/' },
      { '@type': 'ListItem', position: 2, name: 'UNIKMO for Hotels', item: 'https://www.unikmo.com/hotels' },
      { '@type': 'ListItem', position: 3, name: page.primaryKeyword, item: url },
    ],
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name: page.metaTitle,
    description: page.metaDescription,
    isPartOf: { '@id': 'https://www.unikmo.com/#website' },
    about: { '@id': 'https://www.unikmo.com/#brand' },
    inLanguage: 'en',
  };

  return (
    <div className="min-h-screen bg-[#FCF9F4] text-[#22323A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHeader />

      <main>
        <section className="px-5 pb-12 pt-12 text-center sm:px-8 sm:pb-16 sm:pt-16 lg:pt-20">
          <div className="mx-auto max-w-[930px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B38846]">{page.eyebrow}</p>
            <h1 className="mx-auto mt-4 max-w-[900px] font-serif text-[35px] leading-[1.04] tracking-[-0.025em] sm:text-[45px] lg:text-[54px]">{page.title}</h1>
            <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.7] text-[#22323A]/68 sm:text-[17px]">{page.intro}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link href="/hotels#contact" className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#B38846] px-7 text-[11px] font-medium text-white transition hover:bg-[#9F783D]">Discuss a hotel partnership</Link>
              <Link href="/hotels" className="inline-flex min-h-[44px] items-center text-[11px] font-medium text-[#22323A]/68 underline decoration-[#B38846]/45 underline-offset-4">See UNIKMO for Hotels</Link>
            </div>
          </div>

          <div className="mx-auto mt-9 grid max-w-[1080px] overflow-hidden rounded-[24px] border border-[#22323A]/[0.07] bg-[#F3E9DE] shadow-[0_24px_70px_rgba(34,50,58,.08)] lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative aspect-[4/3] min-h-[320px]">
              <Image src="/hotels/unikmo-hotel-card.png" alt="UNIKMO hotel keepsake card" fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 54vw" />
            </div>
            <div className="flex items-center p-7 text-left sm:p-10">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B38846]">One partner model, two card types</p>
                <h2 className="mt-3 font-serif text-[30px] leading-[1.08]">Hotel cards for your own guest experience. UNIKMO retail when the guest wants more.</h2>
                <ul className="mt-6 space-y-3 text-[13px] leading-[1.65] text-[#22323A]/66">
                  <li><strong className="font-semibold text-[#22323A]">Hotel/co-branded cards:</strong> approximately $4–5 each for the property’s own use.</li>
                  <li><strong className="font-semibold text-[#22323A]">Standard UNIKMO:</strong> sold at UNIKMO retail prices, with 20% hotel commission.</li>
                  <li><strong className="font-semibold text-[#22323A]">Curated / Show It:</strong> $250 / $450, with 20% hotel commission.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto grid max-w-[1040px] gap-9 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">The opportunity</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">{page.situationTitle}</h2>
            </div>
            <p className="self-end text-[15px] leading-[1.75] text-[#22323A]/68">{page.situationCopy}</p>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto max-w-[760px] text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Why UNIKMO</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">{page.benefitTitle}</h2>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {page.benefits.map((item, index) => (
                <article key={item.title} className="rounded-[18px] border border-[#22323A]/[0.08] bg-white/55 p-6 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#B38846]/40 font-serif text-[20px] text-[#B38846]">{index + 1}</div>
                  <h3 className="mt-4 font-serif text-[24px] leading-[1.08]">{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-[#22323A]/64">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <GuestJourney />
        <RevenueModel />

        <section className="px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[1080px]">
            <div className="max-w-[760px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Practical use cases</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">{page.examplesTitle}</h2>
              <p className="mt-4 max-w-[680px] text-[14px] leading-[1.7] text-[#22323A]/64">{page.examplesIntro}</p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {page.examples.map((example) => (
                <article key={example.title} className="rounded-[18px] border border-[#22323A]/[0.08] bg-white/55 p-6">
                  <h3 className="font-serif text-[24px] leading-[1.08]">{example.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-[#22323A]/64">{example.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#22323A]/[0.06] bg-[#F7F0E8] px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-[920px]">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Questions</p>
              <h2 className="mt-3 font-serif text-[34px] leading-[1.04] sm:text-[42px]">Questions about {page.primaryKeyword}.</h2>
            </div>
            <div className="mt-8 divide-y divide-[#22323A]/[0.08] border-y border-[#22323A]/[0.08]">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[15px] font-medium">
                    {faq.question}<span className="text-[#B38846] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-[760px] pb-6 pr-10 text-[14px] leading-[1.7] text-[#22323A]/64">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 text-center sm:px-8 sm:py-14">
          <div className="mx-auto max-w-[900px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B38846]">Explore the hotel model</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {page.related.map((slug) => {
                const related = hotelSeoPages[slug];
                return related ? <Link key={slug} href={'/' + slug} className="rounded-full border border-[#22323A]/[0.10] bg-white/55 px-4 py-2 text-[11px] text-[#22323A]/65 transition hover:border-[#B38846]/40 hover:text-[#B38846]">{related.primaryKeyword}</Link> : null;
              })}
            </div>
            <h2 className="mx-auto mt-10 max-w-[700px] font-serif text-[32px] leading-[1.05] sm:text-[40px]">Make the memory part of the stay — without making the hotel run UNIKMO.</h2>
            <p className="mx-auto mt-4 max-w-[650px] text-[14px] leading-[1.7] text-[#22323A]/62">Hotel cards, standard UNIKMO retail and premium services stay clearly separated so guests understand the offer and the property keeps control of its own services.</p>
            <Link href="/hotels#contact" className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#B38846] px-8 text-[11px] font-medium text-white transition hover:bg-[#9F783D]">Discuss a hotel partnership</Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
