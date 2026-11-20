import type { Metadata } from 'next';
import HashAlias from '@/components/HashAlias';
import TestPage from './test/page';

export const metadata: Metadata = {
  title: 'UNIKMO | Less stuff. More us.',
  description: 'Give a moment, not more stuff. A physical UNIKMO card unlocks your private video, voice note, photo or message.',
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
