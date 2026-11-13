import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { privateMetadata } from '@/lib/seo';

export const metadata: Metadata = privateMetadata('Add your moment | UNIKMO');

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
