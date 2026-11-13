import type { Metadata } from 'next';

export const SITE_URL = 'https://www.unikmo.com';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Per-page metadata with its own canonical, og:* and twitter:* values.
 * Pages that only set `title` inherit the home page og:url / og:title from the
 * root layout, which is what produced wrong link previews.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { title, description, type: 'website', url, siteName: 'UNIKMO', images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  };
}

/** For private or utility pages: no canonical to the home page, not indexed. */
export function privateMetadata(title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
    alternates: { canonical: null },
    openGraph: { title, url: undefined },
    twitter: { title },
  };
}

/**
 * Fills in og:* and twitter:* (and robots) from a page's own title,
 * description and canonical, without overriding anything the page set.
 */
export function withSocial(base: Metadata): Metadata {
  const title = typeof base.title === 'string' ? base.title : undefined;
  const description = base.description ?? undefined;
  const canonical = base.alternates?.canonical;
  const url = typeof canonical === 'string' ? canonical : undefined;
  return {
    robots: { index: true, follow: true },
    ...base,
    openGraph: {
      title,
      description,
      url,
      siteName: 'UNIKMO',
      type: 'website',
      images: [OG_IMAGE],
      ...(base.openGraph as object | undefined),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
      ...(base.twitter as object | undefined),
    },
  };
}
