/**
 * Single source of truth for UNIKMO social accounts.
 * Change a handle or URL here and the footer, contact page and structured data all follow.
 * An entry is shown only when `enabled` is true and `url` is set.
 * Instagram is a placeholder until a verified URL is supplied by the owner. Facebook Page confirmed by the owner.
 */
export type SocialPlatform = 'tiktok' | 'instagram' | 'facebook';

export type SocialAccount = {
  platform: SocialPlatform;
  label: string;
  handle: string;
  /** Optional override for the accessible name. */
  accessibleName?: string;
  url: string;
  enabled: boolean;
};

export const SOCIAL_ACCOUNTS: SocialAccount[] = [
  { platform: 'tiktok', label: 'TikTok', handle: '@myunikmo', url: 'https://www.tiktok.com/@myunikmo', enabled: true },
  { platform: 'instagram', label: 'Instagram', handle: '', url: '', enabled: false },
  { platform: 'facebook', label: 'Facebook', handle: 'Unikmo', accessibleName: 'Unikmo on Facebook', url: 'https://www.facebook.com/profile.php?id=61572563300919', enabled: true },
];

export const VISIBLE_SOCIAL_ACCOUNTS = SOCIAL_ACCOUNTS.filter((a) => a.enabled && a.url);
