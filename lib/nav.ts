export type MobileMenuLink = { label: string; href: string };

/** Default site-wide links for the small-screen menu. */
export const MAIN_LINKS: MobileMenuLink[] = [
  { label: 'Shop cards', href: '/#shop' },
  { label: 'How it works', href: '/how-unikmo-works' },
  { label: 'Curated UNIKMO', href: '/curated' },
  { label: 'UNIKMO for hotels', href: '/hotels' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];
