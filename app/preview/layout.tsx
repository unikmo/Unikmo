import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { privateMetadata } from '@/lib/seo';

export const metadata: Metadata = privateMetadata('Preview | UNIKMO');

/** Internal design preview. Returns the 404 page in production builds. */
export default function PreviewLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === 'production') notFound();
  return children;
}
