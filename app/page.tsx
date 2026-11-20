import type { Metadata } from 'next';
import HashAlias from '@/components/HashAlias';
import TestPage from './test/page';

export const metadata: Metadata = {
  title: 'UNIKMO | Less stuff. More us.',
  description: 'The gift isn't the card. It's what they feel when they open it. Your voice, your words, their private moment.',
  alternates: { canonical: 'https://www.unikmo.com/' },
};

export default function HomePage() {
  return (
    <div className="production-home">
      <HashAlias />
      <TestPage />
    </div>
  );
}
