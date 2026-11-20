export default function SiteEntityJsonLd() {
  const entityGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.unikmo.com/#organization',
        name: 'UNIKMO',
        legalName: 'TSquare Ventures LLC',
        url: 'https://www.unikmo.com/',
        description:
          'Less stuff. More us. UNIKMO creates premium physical keepsake cards that unlock a private video, voice note, photo or written message from someone who matters.',
        email: 'hello@unikmo.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '30 N Gould St, Ste R',
          addressLocality: 'Sheridan',
          addressRegion: 'WY',
          postalCode: '82801',
          addressCountry: 'US',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'hello@unikmo.com',
          contactType: 'customer support',
          url: 'https://www.unikmo.com/contact',
          availableLanguage: 'en',
        },
        sameAs: [
          'https://www.instagram.com/unikmo_first',
          'https://www.tiktok.com/@myunikmo',
        ],
        logo: {
          '@type': 'ImageObject',
          '@id': 'https://www.unikmo.com/#logo',
          url: 'https://www.unikmo.com/unikmo-logo-header.png',
          contentUrl: 'https://www.unikmo.com/unikmo-logo-header.png',
          caption: 'UNIKMO',
        },
        brand: { '@id': 'https://www.unikmo.com/#brand' },
      },
      {
        '@type': 'Brand',
        '@id': 'https://www.unikmo.com/#brand',
        name: 'UNIKMO',
        url: 'https://www.unikmo.com/',
        description:
          'Less stuff. More us. Your voice, your words, their private moment — carried in a physical UNIKMO card.',
        logo: { '@id': 'https://www.unikmo.com/#logo' },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.unikmo.com/#website',
        url: 'https://www.unikmo.com/',
        name: 'UNIKMO',
        description:
          'Less stuff. More us. Discover private moments in physical UNIKMO cards, and the optional Curated UNIKMO experience.',
        publisher: { '@id': 'https://www.unikmo.com/#organization' },
        inLanguage: 'en',
        hasPart: [
          {
            '@type': 'WebPage',
            '@id': 'https://www.unikmo.com/how-unikmo-works#webpage',
            url: 'https://www.unikmo.com/how-unikmo-works',
            name: 'How UNIKMO Works',
          },
          {
            '@type': 'WebPage',
            '@id': 'https://www.unikmo.com/curated#webpage',
            url: 'https://www.unikmo.com/curated',
            name: 'Curated UNIKMO',
          },
          {
            '@type': 'WebPage',
            url: 'https://www.unikmo.com/faq',
            name: 'UNIKMO FAQ',
          },
          {
            '@type': 'WebPage',
            url: 'https://www.unikmo.com/contact',
            name: 'Contact UNIKMO',
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(entityGraph) }}
    />
  );
}
