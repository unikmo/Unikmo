import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import MomentCode from '@/models/MomentCode';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ codeId: string }> }
) {
  try {
    await connectDB();

    const { codeId } = await params;
    const code = await MomentCode.findById(codeId)
      .populate('user', 'email')
      .populate('order', 'orderReference email totalPrice');

    if (!code) {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 });
    }

    return NextResponse.json({
      code: {
        _id: code._id.toString(),
        code: code.code,
        user: code.user,
        order: code.order,
        quantity: code.quantity,
        deliveryType: code.deliveryType,
        status: code.status,
        claimedAt: code.claimedAt,
        media: code.media,
        createdAt: code.createdAt,
        updatedAt: code.updatedAt,
      },
    });
  } catch (error: any) {
    console.error('Code detail error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
