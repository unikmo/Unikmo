import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import connectDB from '@/lib/db';
import MomentCode from '@/models/MomentCode';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/** Explicit, audited revocation of unsold legacy keys; never infer sale from 'new' alone. */
export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  const actor = token ? await verifyToken(token) : null;
  if (!actor?.roles?.includes('admin')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null);
  const ids: unknown[] = body?.codeIds;
  if (!Array.isArray(ids) || !ids.length || ids.length > 100 ||
      !ids.every(id => typeof id === 'string' && Types.ObjectId.isValid(id)) ||
      new Set(ids).size !== ids.length) {
    return NextResponse.json({ error: 'Supply 1-100 distinct code IDs' }, { status: 400 });
  }
  await connectDB();
  const candidates = await MomentCode.find({ _id: { $in: ids }, status: 'new', retailPack: { $exists: false }, 'media.0': { $exists: false } })
    .select('_id code order status').lean();
  // A valid code can belong to a paid order. Require an explicit per-code confirmation.
  const matched = candidates.map(x => ({ id: String(x._id), code: x.code, linkedOrder: Boolean(x.order) }));
  if (body?.confirm !== 'REVOKE_UNSOLD_LEGACY_KEYS') {
    return NextResponse.json({ dryRun: true, eligible: matched, excluded: ids.length - matched.length });
  }
  if (matched.length !== ids.length || matched.some(x => x.linkedOrder)) {
    return NextResponse.json({ error: 'Cannot bulk revoke codes with orders or ineligible codes; review the dry run.', eligible: matched }, { status: 409 });
  }
  const result = await MomentCode.updateMany({
    _id: { $in: ids }, status: 'new', order: { $exists: false },
    retailPack: { $exists: false }, 'media.0': { $exists: false },
  }, { $set: { status: 'revoked', unlockable: false } });
  return NextResponse.json({ revoked: result.modifiedCount, requested: ids.length });
}
