import Link from 'next/link';
import TimesSquareRotator from './TimesSquareRotator';

const offerings = [
  {
    eyebrow: 'Keep It',
    title: 'Curated Memory',
    price: '$199',
    copy: 'We professionally assemble the photos, videos and messages you choose into one finished UNIKMO.',
  },
  {
    eyebrow: 'Show It',
    title: 'Times Square Edition',
    price: 'Coming soon',
    copy: 'A public Times Square moment, captured and preserved inside your UNIKMO. Not available to order yet.',
  },
  {
    eyebrow: 'Share It',
    title: 'Extra Keepsakes',
    price: '$12 each',
    copy: 'Give the same finished memory to everyone who was part of it — added at checkout.',
  },
] as const;

function OfferingIcon({ kind }: { kind: 'lock' | 'screen' | 'share' }) {
  const common = 'h-5 w-5';
  if (kind === 'lock') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }
  if (kind === 'screen') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="4" width="18" height="13" rx="1.5" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="5" y="5" width="14" height="16" rx="2" />
      <path d="M12 15V3m0 0 4 4m-4-4-4 4" />
    </svg>
  );
}

export default function CuratedUnikmoTeaser() {
  return (
    <section
      id="curated"
      className="border-t border-[#B38846]/20 bg-[#FCF9F4] px-5 py-14 sm:px-8 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1240px] overflow-hidden rounded-[24px] border border-[#B38846]/35 bg-[#F8F2EB] shadow-[0_22px_65px_rgba(34,50,58,.07)] lg:grid-cols-[1.05fr_1fr]">
        <TimesSquareRotator className="min-h-[360px] overflow-hidden sm:min-h-[460px] lg:min-h-[600px]" />

        <div className="flex items-center p-7 sm:p-10 lg:p-12">
          <div className="w-full">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#8A6528]">
              Curated UNIKMO
            </p>
            <h2 className="mt-4 max-w-[520px] font-serif text-[32px] leading-[1.08] sm:text-[42px]">
              Want the memory without doing the work?
            </h2>
            <p className="mt-5 max-w-[540px] text-[13px] leading-[1.75] text-[#22323A]/70 sm:text-[14px]">
              Send us the photos, videos and messages. We&rsquo;ll curate the story and deliver your
              finished UNIKMO. A Times Square Edition is coming soon.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {offerings.map((offering) => (
                <article
                  key={offering.eyebrow}
                  className="rounded-[16px] border border-[#B38846]/25 bg-white/55 p-5 text-center"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#B38846]/45 text-[#8A6528]">
                    <OfferingIcon
                      kind={
                        offering.eyebrow === 'Keep It'
                          ? 'lock'
                          : offering.eyebrow === 'Show It'
                            ? 'screen'
                            : 'share'
                      }
                    />
                  </div>
                  <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8A6528]">
                    {offering.eyebrow}
                  </p>
                  <h3 className="mt-1 font-serif text-[18px]">{offering.title}</h3>
                  <p className="mt-2 font-serif text-[17px] text-[#22323A]">{offering.price}</p>
                  <p className="mt-2 text-[12px] leading-[1.6] text-[#22323A]/70">{offering.copy}</p>
                </article>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href="/curated#order"
                className="inline-flex min-h-[46px] items-center justify-center rounded-lg bg-[#8F6A2C] px-6 text-[12px] font-medium text-white transition hover:bg-[#7A5A24]"
              >
                Have Us Create It <span className="ml-2" aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/curated"
                className="text-[12px] font-medium text-[#22323A]/70 underline decoration-[#B38846]/55 underline-offset-4"
              >
                Learn about Curated UNIKMO &rarr;
              </Link>
            </div>

            <p className="mt-5 text-[12px] text-[#22323A]/70">
              Curated is optional. Standard UNIKMO remains self-created and private by design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
