import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import MomentCode from '@/models/MomentCode';
import { processPaidOrderAndGenerateCodes } from '@/lib/order-processing';
import { COMMERCE_PRODUCTS } from '@/lib/commerce-products';
import type { DeliveryType, Quantity } from '@/lib/code-generator';

export const dynamic = 'force-dynamic';

const PRODUCT_BY_QUANTITY = {
  1: COMMERCE_PRODUCTS.single,
  4: COMMERCE_PRODUCTS.four,
  7: COMMERCE_PRODUCTS.seven,
};

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const search = (searchParams.get('search') || '').trim();
    const source = (searchParams.get('source') || '').trim();

    const query: Record<string, any> = {};
    if (source === 'admin' || source === 'webhook' || source === 'stripe') {
      query.source = source;
    }
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { shopifyOrderId: { $regex: search, $options: 'i' } },
        { shopifyOrderName: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
      ];
    }

    const orders = await Order.find(query)
      .populate('user', 'email')
      .sort({ createdAt: -1 })
      .limit(100);

    const orderIds = orders.map((o) => o._id);
    const codeStats = await MomentCode.aggregate([
      { $match: { order: { $in: orderIds } } },
      {
        $group: {
          _id: '$order',
          totalCodes: { $sum: 1 },
          claimedCodes: {
            $sum: {
              $cond: [{ $eq: ['$status', 'claimed'] }, 1, 0],
            },
          },
          mediaCodes: {
            $sum: {
              $cond: [{ $gt: [{ $size: '$media' }, 0] }, 1, 0],
            },
          },
        },
      },
    ]);

    const statsMap = new Map<string, { totalCodes: number; claimedCodes: number; mediaCodes: number }>();
    for (const stat of codeStats) {
      statsMap.set(String(stat._id), {
        totalCodes: stat.totalCodes || 0,
        claimedCodes: stat.claimedCodes || 0,
        mediaCodes: stat.mediaCodes || 0,
      });
    }

    return NextResponse.json({
      orders: orders.map((order) => {
        const stats = statsMap.get(order._id.toString()) || {
          totalCodes: 0,
          claimedCodes: 0,
          mediaCodes: 0,
        };
        return {
          _id: order._id.toString(),
          shopifyOrderId: order.shopifyOrderId,
          shopifyOrderName: order.shopifyOrderName || '',
          email: order.email,
          customerName: order.customerName || '',
          totalPrice: order.totalPrice,
          currency: order.currency,
          source: order.source || 'webhook',
          paymentProvider: order.paymentProvider || (order.source === 'admin' ? 'manual' : 'shopify'),
          tags: order.tags || [],
          orderQuantity: order.orderQuantity,
          createdAt: order.createdAt,
          totalCodes: stats.totalCodes,
          claimedCodes: stats.claimedCodes,
          mediaCodes: stats.mediaCodes,
        };
      }),
    });
  } catch (error: any) {
    console.error('Admin orders list error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const customerName = String(body.customerName || '').trim();
    const productId = String(body.productId || '').trim();
    const variantId = String(body.variantId || '').trim();
    const momentQuantity = Number(body.momentQuantity) as Quantity;
    const deliveryType = String(body.deliveryType || '').trim() as DeliveryType;
    const customTag = String(body.customTag || '').trim();

    if (!email || !productId || !momentQuantity || !deliveryType) {
      return NextResponse.json(
        { error: 'email, productId, momentQuantity and deliveryType are required' },
        { status: 400 }
      );
    }

    if (![1, 4, 7].includes(momentQuantity) || !['digital', 'physical'].includes(deliveryType)) {
      return NextResponse.json({ error: 'Invalid quantity or delivery type' }, { status: 400 });
    }

    const product = PRODUCT_BY_QUANTITY[momentQuantity];
    if (!product || product.key !== productId || !product.allowedDeliveryTypes.includes(deliveryType)) {
      return NextResponse.json(
        { error: 'Selected product does not match the requested key quantity' },
        { status: 400 }
      );
    }

    const tags = ['admin_created', ...(customTag ? [customTag] : [])];
    const orderReference = `ADMIN-${crypto.randomUUID()}`;

    await connectDB();
    const result = await processPaidOrderAndGenerateCodes({
      shopifyOrderId: orderReference,
      shopifyOrderNumber: orderReference,
      shopifyOrderName: orderReference,
      email,
      totalPrice: product.unitAmount / 100,
      currency: product.currency.toUpperCase(),
      lineItems: [{ product_id: product.key, variant_id: variantId || deliveryType, quantity: 1 }],
      codesToGenerate: [{ quantity: momentQuantity, deliveryType, orderQuantity: 1 }],
      source: 'admin',
      paymentProvider: 'manual',
      tags,
      customerName,
    });

    if (result.generatedCodes.length === 0) {
      return NextResponse.json(
        { error: 'Order created, but code generation failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: result.orderId,
      orderReference,
      generatedCodes: result.generatedCodes,
    });
  } catch (error: any) {
    console.error('Admin create order error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
