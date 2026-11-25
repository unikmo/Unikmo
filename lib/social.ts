/**
 * Single source of truth for UNIKMO social accounts.
 * Change a handle or URL here and the footer, contact page and structured data all follow.
 * An entry is shown only when `enabled` is true and `url` is set.
 * Instagram and Facebook are placeholders until verified URLs are supplied by the owner.
 */
export type SocialPlatform = 'tiktok' | 'instagram' | 'facebook';

export type SocialAccount = {
  platform: SocialPlatform;
  label: string;
  handle: string;
  url: string;
  enabled: boolean;
};

export const SOCIAL_ACCOUNTS: SocialAccount[] = [
  { platform: 'tiktok', label: 'TikTok', handle: '@myunikmo', url: 'https://www.tiktok.com/@myunikmo', enabled: true },
  { platform: 'instagram', label: 'Instagram', handle: '', url: '', enabled: false },
  { platform: 'facebook', label: 'Facebook', handle: '', url: '', enabled: false },
];

export const VISIBLE_SOCIAL_ACCOUNTS = SOCIAL_ACCOUNTS.filter((a) => a.enabled && a.url);
