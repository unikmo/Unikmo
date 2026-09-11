import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import Order from '@/models/Order';
import MomentCode from '@/models/MomentCode';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const [totalBuyers, totalOrders, totalCodes, claimedCodes, unclaimedCodes, revenueRows, providerRows, recentOrders] = await Promise.all([
      User.countDocuments({ roles: { $in: ['buyer'] } }),
      Order.countDocuments(),
      MomentCode.countDocuments(),
      MomentCode.countDocuments({ status: 'claimed' }),
      MomentCode.countDocuments({ status: 'new' }),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: '$currency', amount: { $sum: '$totalPrice' } } },
        { $sort: { _id: 1 } },
      ]),
      Order.aggregate([
        {
          $group: {
            _id: {
              $ifNull: [
                '$paymentProvider',
                { $cond: [{ $eq: ['$source', 'admin'] }, 'manual', 'shopify'] },
              ],
            },
            count: { $sum: 1 },
          },
        },
      ]),
      Order.find().sort({ createdAt: -1 }).limit(5).select('shopifyOrderName totalPrice currency paymentProvider source createdAt').lean(),
    ]);

    return NextResponse.json({
      totalBuyers,
      totalOrders,
      totalCodes,
      claimedCodes,
      unclaimedCodes,
      revenue: revenueRows.map((row) => ({ currency: row._id || 'USD', amount: row.amount || 0 })),
      providers: providerRows.reduce<Record<string, number>>((acc, row) => {
        acc[row._id] = row.count;
        return acc;
      }, {}),
      recentOrders,
    });
  } catch (error: any) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
