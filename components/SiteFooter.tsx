import Link from 'next/link';
import { COMPANY } from '@/lib/company';
import SocialLinks from '@/components/SocialLinks';

const legal = [
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Terms', href: '/terms' },
  { label: 'Legal Notice', href: '/imprint' },
];

const footerLink =
  'inline-flex min-h-[44px] items-center transition hover:text-[#8A6528]';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#22323A]/[0.08] bg-[#FCF9F4] px-5 py-10 sm:px-8 lg:py-12">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col items-center gap-4 text-[12px] uppercase tracking-[0.1em] text-[#22323A]/65 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span>UNIKMO &copy; {year}</span>
            <span aria-hidden="true" className="text-[#22323A]/20">|</span>
            <span>{COMPANY.legalName}, Wyoming, USA</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-0">
            {legal.map((item) => (
              <Link key={item.href} href={item.href} className={footerLink}>
                {item.label}
              </Link>
            ))}
            <span aria-hidden="true" className="text-[#22323A]/20">|</span>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
