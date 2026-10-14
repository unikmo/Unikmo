import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.unikmo.com';
  const now = new Date();

  const acquisitionPages = [
    'thoughtful-gifts',
    'sentimental-gifts',
    'personalized-birthday-gifts',
    'personalized-anniversary-gifts',
    'long-distance-gifts',
    'personalized-video-message',
    'qr-code-gift',
  ];

  const hotelPages = [
    'hotel-guest-experience',
    'luxury-hotel-amenities',
    'boutique-hotel-amenities',
    'hotel-guest-gifts',
    'hotel-welcome-gifts',
    'hotel-upselling-ideas',
    'hotel-anniversary-packages',
    'hotel-proposal-packages',
    'hotel-ancillary-revenue',
    'hotel-branded-keepsake-cards',
    'resort-guest-experience',
  ];

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/how-unikmo-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/curated`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/hotels`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...hotelPages.map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...acquisitionPages.map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/imprint`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
