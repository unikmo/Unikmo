export function getJwtSecret(): string {
  const secret = process.env.VERCEL_ENV === 'preview'
    ? process.env.PREVIEW_JWT_SECRET
    : process.env.JWT_SECRET;
  if (!secret) throw new Error('Authentication secret is not configured');
  return secret;
}
