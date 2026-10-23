import { NextRequest, NextResponse } from 'next/server';
import { generateMomentCode } from '@/lib/code-generator';
import connectDB from '@/lib/db';
import RetailPack from '@/models/RetailPack';
import MomentCode from '@/models/MomentCode';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { generateRetailPackBarcode } from '@/lib/retail-pack-barcode';

export const dynamic = 'force-dynamic';
const prices: Record<number, number> = { 1: 24, 4: 64, 7: 72 };
async function admin(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  const actor = token ? await verifyToken(token) : null;
  return actor?.roles?.includes('admin') ? actor : null;
}
export async function GET(request: NextRequest) {
  if (!await admin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const organisationId = request.nextUrl.searchParams.get('organisationId')?.trim();
  const filter = organisationId ? { organisationId } : {};
  const packs = await RetailPack.find(filter).sort({ createdAt: -1 }).limit(100).lean();
  const counts = await RetailPack.aggregate([{ $match: filter }, { $group: { _id: '$status', count: { $sum: 1 } } }]);
  return NextResponse.json({ packs, counts });
}
export async function POST(request: NextRequest) {
  const actor = await admin(request);
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null);
  const bundleSize = Number(body?.bundleSize);
  const count = Number(body?.count);
  const channel = body?.channel;
  const organisationId = typeof body?.organisationId === 'string' ? body.organisationId.trim() : '';
  const locationId = typeof body?.locationId === 'string' ? body.locationId.trim() : '';
  const voyageId = typeof body?.voyageId === 'string' ? body.voyageId.trim() : '';
  const commissionRate = Number(body?.commissionRate);
  // Pilot status must be determined from a verified organisation agreement before partner rollout.
  if (![1,4,7].includes(bundleSize) || !Number.isInteger(count) || count < 1 || count > 100 ||
      !['hotel','cruise'].includes(channel) || !organisationId || !locationId ||
      organisationId.length > 120 || locationId.length > 120 ||
      (channel === 'cruise' && !voyageId) ||
      !Number.isFinite(commissionRate) || (channel === 'hotel' && commissionRate !== .3) ||
      (channel === 'cruise' && ![.25,.3].includes(commissionRate))) {
    return NextResponse.json({ error: 'Invalid package details' }, { status: 400 });
  }
  await connectDB();
  const user = await User.findById(actor.userId);
  if (!user) return NextResponse.json({ error: 'Admin user not found' }, { status: 403 });
  const created: { barcode: string; keys: string[] }[] = [];
  const allocated: string[] = [];
  try {
    for (let i = 0; i < count; i++) {
      let pack = null;
      for (let attempt = 0; attempt < 5 && !pack; attempt++) {
        try {
          pack = await RetailPack.create({
            barcode: generateRetailPackBarcode(), bundleSize, channel, organisationId, locationId,
            ...(voyageId ? { voyageId } : {}), retailPrice: prices[bundleSize], commissionRate,
          });
        } catch (error: any) { if (error?.code !== 11000) throw error; }
      }
      if (!pack) throw new Error('Unable to allocate unique barcode');
      allocated.push(pack.barcode);
      const keys: string[] = [];
      for (let k = 0; k < bundleSize; k++) {
        let issued = false;
        for (let attempt = 0; attempt < 8 && !issued; attempt++) {
          const key = generateMomentCode(bundleSize as 1 | 4 | 7, 'physical');
          try {
            await MomentCode.create({ code: key, user: user._id, retailPack: pack._id, quantity: bundleSize, deliveryType: 'physical', status: 'new' });
            keys.push(key);
            issued = true;
          } catch (error: any) { if (error?.code !== 11000) throw error; }
        }
        if (!issued) throw new Error('Unable to allocate unique Moment Key');
      }
      created.push({ barcode: pack.barcode, keys });
    }
    return NextResponse.json({ success: true, created }, { status: 201 });
  } catch (error) {
    // Fail closed: remove incomplete available packs and their associated keys.
    for (const barcode of allocated) {
      const pack = await RetailPack.findOne({ barcode, status: 'available' });
      if (pack) { await MomentCode.deleteMany({ retailPack: pack._id }); await pack.deleteOne(); }
    }
    return NextResponse.json({ error: 'Package generation failed; inspect inventory before retrying' }, { status: 500 });
  }
}
