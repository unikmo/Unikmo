import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPageShell from '@/components/LegalPageShell';
import { COMPANY } from '@/lib/company';
import { privateMetadata } from '@/lib/seo';

export const metadata: Metadata = privateMetadata('Page not found | UNIKMO');

export default function NotFound() {
  return (
    <LegalPageShell eyebrow="404" title="This page is not here." intro="The link may be old, or the address may have a typo.">
      <p>
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#8F6A2C] px-7 text-[12px] font-medium text-white transition hover:bg-[#7A5A24]"
        >
          Back to the home page
        </Link>
      </p>
      <p>
        Need a hand? Email{' '}
        <a href={`mailto:${COMPANY.email}`} className="underline decoration-[#B38846]/50 underline-offset-4 hover:text-[#8A6528]">
          {COMPANY.email}
        </a>
        .
      </p>
    </LegalPageShell>
  );
}
