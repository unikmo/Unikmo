import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import RetailPack from '@/models/RetailPack';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Existing admin accounts only. Partner staff require separate scoped authentication before rollout.
export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  const actor = token ? await verifyToken(token) : null;
  if (!actor?.roles?.includes('admin')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null);
  const barcode = typeof body?.barcode === 'string' ? body.barcode.trim().toUpperCase() : '';
  if (!/^PK-[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(barcode)) return NextResponse.json({ error: 'Invalid pack barcode' }, { status: 400 });
  if (body?.paymentConfirmed !== true) return NextResponse.json({ error: 'Payment confirmation required' }, { status: 400 });
  const recoveryEmail = typeof body?.recoveryEmail === 'string' ? body.recoveryEmail.trim().toLowerCase() : '';
  if (recoveryEmail && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryEmail) || recoveryEmail.length > 254)) return NextResponse.json({ error: 'Invalid recovery email' }, { status: 400 });
  const saleReference = typeof body?.saleReference === 'string' ? body.saleReference.trim().slice(0,120) : '';
  await connectDB();
  // Atomic state transition prevents repeat scans from creating duplicate sales.
  const pack = await RetailPack.findOneAndUpdate(
    { barcode, status: 'available' },
    { $set: { status: 'sold', soldAt: new Date(), soldBy: actor.userId, ...(saleReference ? { saleReference } : {}), ...(recoveryEmail ? { recoveryEmail } : {}) } },
    { new: true }
  );
  if (!pack) {
    const existing = await RetailPack.findOne({ barcode }).select('status');
    return NextResponse.json({ error: existing ? 'Pack is not available for sale' : 'Pack not found' }, { status: existing ? 409 : 404 });
  }
  return NextResponse.json({ success: true, barcode: pack.barcode, bundleSize: pack.bundleSize, status: pack.status, soldAt: pack.soldAt, retailPrice: pack.retailPrice, commission: Number((pack.retailPrice * pack.commissionRate).toFixed(2)) });
}
