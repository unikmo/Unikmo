import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CorporateEnquiryForm from '@/components/CorporateEnquiryForm';
import MobileMenu from '@/components/MobileMenu';
import { MAIN_LINKS } from '@/lib/nav';
import SiteFooter from '@/components/SiteFooter';
import { withSocial } from '@/lib/seo';

/*
 * DRAFT ROUTE. All wording below is placeholder copy, marked "draft for Sophie review".
 * Nova/Maya copy was not available. Not linked from the site, not in the sitemap, noindex.
 * To publish: owner approval + Sophie review, then remove the noindex below and add to
 * app/sitemap.ts and the navigation.
 * Rules applied: no logo-branding promise, no result claims, no "forever", no price list,
 * no personal name, no payment on the form.
 */
const baseMetadata: Metadata = {
  title: 'UNIKMO for Teams | A personal message. A meaningful gift.',
  description:
    'A premium card that opens a private message from you. For recognition, onboarding and client thanks. No app. No account.',
  alternates: { canonical: 'https://www.unikmo.com/corporate' },
};
export const metadata: Metadata = { ...withSocial(baseMetadata), robots: { index: false, follow: false } };

const uses = [
  {
    title: 'A private message from the CEO',
    body: 'Record a few honest words. Put them behind a card your team can hold.',
  },
  {
    title: 'Employee recognition',
    body: 'Say thank you in your own voice. Not in a template.',
  },
  {
    title: 'Onboarding welcomes',
    body: 'A new hire opens a welcome on day one. From you, to them.',
  },
  {
    title: 'Client appreciation',
    body: 'Send a thank-you video that comes with something to keep.',
  },
];

const steps = [
  ['01', 'Tell us what you need', 'Send a sample request or a bulk inquiry. It takes a minute.'],
  ['02', 'We reply by email', 'We confirm the details with you. Nothing is charged on this page.'],
  ['03', 'You add the messages', 'Record a video, a voice note, or write a few lines for each card.'],
  ['04', 'You give the cards', 'Each person scans their card and opens their message. No app. No account.'],
];

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-[#FCF9F4] text-[#22323A]">
      <div role="note" className="bg-[#22323A] px-5 py-2 text-center text-[12px] text-white">
        Draft for Sophie review. Placeholder copy. Not published.
      </div>

      <header className="sticky top-0 z-40 border-b border-[#22323A]/[0.07] bg-[#FCF9F4]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center px-5 sm:px-8">
          <Link href="/" aria-label="UNIKMO home">
            <Image src="/unikmo-logo-header.png" alt="UNIKMO — The Key to Your Memory" width={729} height={220} priority className="h-8 w-auto sm:h-9" />
          </Link>
          <nav className="ml-auto hidden items-center gap-7 text-[12px] text-[#22323A]/70 md:flex">
            <a href="#uses" className="hover:text-[#8A6528]">Uses</a>
            <a href="#how" className="hover:text-[#8A6528]">How it works</a>
            <Link href="/faq" className="hover:text-[#8A6528]">FAQ</Link>
          </nav>
          <a href="#request" className="ml-auto rounded-lg bg-[#8F6A2C] px-5 py-3 text-[12px] font-medium text-white transition hover:bg-[#7A5A24] md:ml-8">Request a sample</a>
          <MobileMenu links={[{ label: 'Request a sample', href: '#request' }, ...MAIN_LINKS]} className="ml-2" />
        </div>
      </header>

      <main>
        <section className="px-5 pb-14 pt-14 text-center sm:px-8 sm:pb-16 sm:pt-20">
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#8A6528]">UNIKMO for teams</p>
          <h1 className="mx-auto mt-4 max-w-[860px] font-serif text-[36px] leading-[1.06] tracking-[-0.02em] sm:text-[50px] lg:text-[58px]">
            A personal message. A meaningful gift. No app. No account.
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-[16px] leading-[1.7] text-[#22323A]/70 sm:text-[17px]">
            A premium card that opens a private message from you. For the people who work with you, and for the clients you value.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a href="#request" className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#8F6A2C] px-7 text-[12px] font-medium text-white transition hover:bg-[#7A5A24]">Request a free sample</a>
            <a href="#how" className="inline-flex min-h-[44px] items-center text-[12px] font-medium text-[#22323A]/70 underline decoration-[#B38846]/50 underline-offset-4">See how company orders work</a>
          </div>
        </section>

        <section id="uses" className="border-y border-[#22323A]/[0.06] bg-[#F8F2EB] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[1120px]">
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#8A6528]">Where it fits</p>
              <h2 className="mt-3 font-serif text-[30px] sm:text-[40px]">Four ways teams use it.</h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {uses.map((use) => (
                <article key={use.title} className="rounded-[18px] border border-[#22323A]/[0.08] bg-[#FCF9F4] p-6">
                  <h3 className="font-serif text-[22px] leading-[1.2]">{use.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#22323A]/70">{use.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#8A6528]">Simple for the receiver</p>
            <h2 className="mt-3 font-serif text-[30px] sm:text-[40px]">They scan. They open it.</h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#22323A]/70">
              Each card has a QR code and a private code. The message opens in the phone&rsquo;s browser. Nothing to download. Nobody needs to sign up.
            </p>
          </div>
        </section>

        <section id="how" className="border-y border-[#22323A]/[0.06] bg-[#F8F2EB] px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[1120px]">
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#8A6528]">How company orders work</p>
              <h2 className="mt-3 font-serif text-[30px] sm:text-[40px]">Four steps.</h2>
            </div>
            <ol className="mt-10 grid gap-7 md:grid-cols-4">
              {steps.map(([n, title, body]) => (
                <li key={n} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#8A6528]/50 text-[12px] font-semibold text-[#8A6528]">{n}</div>
                  <h3 className="mt-4 font-serif text-[22px]">{title}</h3>
                  <p className="mx-auto mt-2 max-w-[240px] text-[14px] leading-[1.65] text-[#22323A]/70">{body}</p>
                </li>
              ))}
            </ol>
            <p className="mx-auto mt-10 max-w-[600px] text-center text-[14px] leading-[1.7] text-[#22323A]/70">
              Pricing for company orders is shared by email. There is no price list on this page yet.
            </p>
          </div>
        </section>

        <section id="request" className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[820px]">
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#8A6528]">Get started</p>
              <h2 className="mt-3 font-serif text-[30px] sm:text-[40px]">Ask for a sample, or tell us your numbers.</h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#22323A]/70">
                Use your work email. We reply there.
              </p>
            </div>
            <div className="mt-9"><CorporateEnquiryForm /></div>
          </div>
        </section>

        <section className="border-t border-[#22323A]/[0.06] bg-[#F8F2EB] px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-[760px] text-center text-[14px] leading-[1.75] text-[#22323A]/70">
            <p>
              Running a hotel or a cruise line? See{' '}
              <Link href="/hotels" className="underline decoration-[#B38846]/50 underline-offset-4 hover:text-[#8A6528]">UNIKMO for hotels</Link>.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
