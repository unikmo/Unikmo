'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { MobileMenuLink } from '@/lib/nav';

/**
 * Small-screen navigation. Shown below the md breakpoint only (the desktop
 * <nav> in each header is hidden there). The panel anchors to the sticky
 * header, so the wrapper must not be positioned.
 */
export default function MobileMenu({
  links,
  className = '',
}: {
  links: MobileMenuLink[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className={`md:hidden ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#22323A]/[0.15] text-[#22323A]"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open ? (
        <nav
          id="mobile-menu-panel"
          aria-label="Main menu"
          className="absolute inset-x-0 top-full border-b border-[#22323A]/[0.08] bg-[#FCF9F4] px-5 py-3 shadow-[0_18px_30px_rgba(34,50,58,.08)]"
        >
          <ul>
            {links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center text-[14px] font-medium text-[#22323A]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
