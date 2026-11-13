import type { Metadata } from 'next';
import HashAlias from '@/components/HashAlias';
import HomeContent from '@/components/HomePage';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'UNIKMO | Give a moment they can revisit',
  description: 'Turn a private video, voice note, photo or message into a physical UNIKMO card they can scan and keep.',
  path: '/',
});

export default function HomePage() {
  return (
    <div className="production-home">
      <HashAlias />
      <HomeContent />
    </div>
  );
}
