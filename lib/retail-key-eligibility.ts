import RetailPack from '@/models/RetailPack';
/** Prevent unsold retail keys from being activated or used to upload media. */
export async function isRetailKeyEligible(momentCode: { retailPack?: unknown }): Promise<boolean> {
  if (!momentCode.retailPack) return true;
  const pack = await RetailPack.findById(momentCode.retailPack).select('status').lean();
  return Boolean(pack && pack.status === 'sold');
}
