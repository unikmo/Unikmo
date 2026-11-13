import type { Metadata } from 'next';
import { withSocial } from '@/lib/seo';
import LegalPageShell from '@/components/LegalPageShell';
import ContactForm from '@/components/ContactForm';
import { COMPANY } from '@/lib/company';

const baseMetadata: Metadata = {
  title: 'Contact | UNIKMO',
  description: 'Get in touch with the UNIKMO team about an order, a lost access code, Curated UNIKMO, or a privacy request.',
  alternates: { canonical: 'https://www.unikmo.com/contact' },
};
export const metadata: Metadata = withSocial(baseMetadata);

export default function ContactPage() {
  return (
    <LegalPageShell
      eyebrow="Get in touch"
      title="Contact"
      intro="Questions about an order, a lost access code, Curated UNIKMO, or a privacy request — send us a message and we'll reply by email."
    >
      <ContactForm />

      {/* Draft for Sophie review: scaffolding for an abuse and content report route. */}
      <div id="report" className="rounded-[18px] border border-[#22323A]/[0.08] bg-white/60 p-6 text-[13px] leading-[1.75] text-[#22323A]/70">
        <h2 className="font-serif text-[20px] text-[#22323A]">Report a problem with content</h2>
        <p className="mt-2">
          If you think a UNIKMO moment breaks our Terms or the law, email{' '}
          <a
            href={`mailto:${COMPANY.email}?subject=Report%20content`}
            className="underline decoration-[#B38846]/50 underline-offset-4 hover:text-[#8A6528]"
          >
            {COMPANY.email}
          </a>{' '}
          with the subject &ldquo;Report content&rdquo;. Tell us what you saw and, if you can, the moment code or link. We
          will review it.
        </p>
      </div>

      <div className="text-[13px] leading-[1.75] text-[#22323A]/70">
        <p>
          You can also email us directly at{' '}
          <a href={`mailto:${COMPANY.email}`} className="underline decoration-[#B38846]/50 underline-offset-4 hover:text-[#8A6528]">
            {COMPANY.email}
          </a>
          .
        </p>
        <p className="mt-3">
          UNIKMO is a product of {COMPANY.legalName}, {COMPANY.addressOneLine}. Full company details are on the{' '}
          <a href="/imprint" className="underline decoration-[#B38846]/50 underline-offset-4 hover:text-[#8A6528]">
            legal notice
          </a>{' '}
          page.
        </p>
      </div>
    </LegalPageShell>
  );
}
