import { VISIBLE_SOCIAL_ACCOUNTS, type SocialPlatform } from '@/lib/social';

const ICONS: Record<SocialPlatform, string> = {
  tiktok:
    'M16.6 3c.3 2.4 1.7 3.9 4 4.1v3.1c-1.5.1-2.8-.4-4-1.2v5.9c0 3.7-2.6 6.1-5.9 6.1A5.8 5.8 0 0 1 5 15.2c0-3.7 3.1-6.4 6.7-5.8v3.2c-1.7-.5-3.4.5-3.4 2.4 0 1.5 1.2 2.6 2.6 2.6 1.6 0 2.7-1 2.7-2.9V3h3Z',
  instagram:
    'M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.2-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z',
  facebook:
    'M13.5 22v-8.200h2.8l.4-3.3h-3.2V8.4c0-.9.300-1.6 1.6-1.6h1.7V3.900c-.3 0-1.300-.1-2.4-.1-2.4 0-4.100 1.500-4.100 4.200v2.500H7.500v3.3h2.8V22h3.2Z',
};

/** Icon-only social links, driven by lib/social.ts. Same order everywhere it is used. */
export default function SocialLinks({ className = '' }: { className?: string }) {
  if (VISIBLE_SOCIAL_ACCOUNTS.length === 0) return null;
  return (
    <ul className={`flex items-center gap-1 ${className}`} aria-label="UNIKMO on social media">
      {VISIBLE_SOCIAL_ACCOUNTS.map((a) => (
        <li key={a.platform}>
          <a
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={a.accessibleName ?? `UNIKMO on ${a.label} (${a.handle})`}
            title={a.accessibleName ?? `${a.label} ${a.handle}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#22323A]/70 transition hover:text-[#8A6528] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8A6528]"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
              <path d={ICONS[a.platform]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
