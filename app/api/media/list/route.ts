import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import MomentCode from '@/models/MomentCode';
import { isRetailKeyEligible } from '@/lib/retail-key-eligibility';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code')?.toUpperCase().trim();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    await connectDB();

    const momentCode = await MomentCode.findOne({ code }).select('media status retailPack');

    if (!momentCode) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 404 });
    }

    if (!await isRetailKeyEligible(momentCode)) return NextResponse.json({ error: 'Key not sold' }, { status: 403 });

    return NextResponse.json({
      media: momentCode.media || [],
      status: momentCode.status,
    });
  } catch (error: any) {
    console.error('Media list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
