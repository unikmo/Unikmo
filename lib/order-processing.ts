import User from '@/models/User';
import Order from '@/models/Order';
import MomentCode from '@/models/MomentCode';
import { generateMomentCode, type DeliveryType, type Quantity } from '@/lib/code-generator';
import { sendMomentCodesEmail } from '@/lib/email';

export interface OrderLineItem {
  id?: string | number;
  product_id?: string | number;
  variant_id?: string | number;
  quantity?: number;
}
export interface CodesToGenerateItem {
  quantity: Quantity;
  deliveryType: DeliveryType;
  orderQuantity: number;
}
export interface ProcessOrderInput {
  orderReference: string;
  orderNumber: string;
  email: string;
  totalPrice: number;
  currency: string;
  lineItems: OrderLineItem[];
  codesToGenerate: CodesToGenerateItem[];
  source?: 'webhook' | 'admin' | 'stripe';
  paymentProvider?: 'stripe' | 'manual';
  tags?: string[];
  orderName?: string;
  customerName?: string;
}
const normalizeId = (id: string | number | undefined) => id == null ? '' : String(id);
const isDuplicate = (error: unknown) => !!error && typeof error === 'object' && 'code' in error && error.code === 11000;

/**
 * Resume fulfillment by deterministic order slots. Each slot is protected by a
 * compound unique index; duplicate webhook deliveries cannot mint extra codes.
 * Failures propagate so Stripe can retry instead of acknowledging lost orders.
 */
export async function processPaidOrderAndGenerateCodes(input: ProcessOrderInput): Promise<{
  created: boolean;
  orderId: string;
  generatedCodes: string[];
}> {
  const email = input.email.toLowerCase().trim();
  const expected = input.codesToGenerate.flatMap(item => {
    if (![1, 4, 7].includes(item.quantity) || !['digital', 'physical', 'split'].includes(item.deliveryType) ||
        !Number.isSafeInteger(item.orderQuantity) || item.orderQuantity < 1 || item.orderQuantity > 50) {
      throw new Error('Invalid fulfillment quantities');
    }
    return Array.from({ length: item.orderQuantity }, () => item);
  });
  if (!expected.length || expected.length > 50) throw new Error('Invalid fulfillment size');

  let user = await User.findOne({ email });
  if (!user) {
    try { user = await User.create({ email, roles: ['buyer'] }); }
    catch (error) {
      if (!isDuplicate(error)) throw error;
      user = await User.findOne({ email });
    }
  }
  if (!user) throw new Error('Unable to resolve buyer');

  let order = await Order.findOne({ orderReference: input.orderReference });
  let created = false;
  if (!order) {
    try {
      order = await Order.create({
        orderReference: input.orderReference,
        orderName: input.orderName || input.orderNumber,
        productReference: normalizeId(input.lineItems[0]?.product_id),
        orderQuantity: input.lineItems.reduce((sum, item) => sum + (item.quantity || 0), 0),
        user: user._id, email, customerName: input.customerName || '',
        totalPrice: input.totalPrice, currency: input.currency || 'USD',
        paymentStatus: 'paid', source: input.source || 'webhook',
        paymentProvider: input.paymentProvider || (input.source === 'admin' ? 'manual' : 'stripe'),
        tags: input.tags || [],
        lineItems: input.lineItems.map(item => ({
          productId: normalizeId(item.product_id), variantId: normalizeId(item.variant_id),
          quantity: item.quantity || 0,
        })),
        fulfillmentEmailStatus: 'pending',
      });
      created = true;
    } catch (error) {
      if (!isDuplicate(error)) throw error;
      order = await Order.findOne({ orderReference: input.orderReference });
    }
  }
  if (!order) throw new Error('Unable to resolve paid order');
  if (order.email !== email || order.paymentProvider !== (input.paymentProvider || (input.source === 'admin' ? 'manual' : 'stripe'))) {
    throw new Error('Conflicting order reference');
  }

  for (let slot = 0; slot < expected.length; slot++) {
    const item = expected[slot];
    let codeRecord = await MomentCode.findOne({ order: order._id, fulfillmentSlot: slot });
    if (codeRecord) {
      if (codeRecord.quantity !== item.quantity || codeRecord.deliveryType !== item.deliveryType) {
        throw new Error('Conflicting fulfillment slot');
      }
      continue;
    }
    let inserted = false;
    for (let attempt = 0; attempt < 10 && !inserted; attempt++) {
      try {
        await MomentCode.create({
          code: generateMomentCode(item.quantity, item.deliveryType),
          user: user._id, order: order._id, fulfillmentSlot: slot,
          quantity: item.quantity, deliveryType: item.deliveryType, status: 'new',
        });
        inserted = true;
      } catch (error) {
        if (!isDuplicate(error)) throw error;
        codeRecord = await MomentCode.findOne({ order: order._id, fulfillmentSlot: slot });
        if (codeRecord) inserted = true;
      }
    }
    if (!inserted) throw new Error('Could not issue unique code');
  }

  const issued = await MomentCode.find({ order: order._id, fulfillmentSlot: { $gte: 0, $lt: expected.length } }).sort({ fulfillmentSlot: 1 });
  if (issued.length !== expected.length || issued.some((item, index) => item.fulfillmentSlot !== index)) {
    throw new Error('Fulfillment incomplete; retry required');
  }
  const codes = issued.map(item => item.code);

  // Lease prevents parallel webhook deliveries from sending duplicate emails.
  // A crashed worker can be retried after the lease expires. SMTP delivery is
  // at-least-once: a crash after sending but before recording 'sent' may resend.
  const leaseCutoff = new Date(Date.now() - 5 * 60 * 1000);
  const leased = await Order.findOneAndUpdate({
    _id: order._id,
    $or: [
      { fulfillmentEmailStatus: { $exists: false } },
      { fulfillmentEmailStatus: 'pending' },
      { fulfillmentEmailStatus: 'sending', fulfillmentEmailLeaseAt: { $lt: leaseCutoff } },
    ],
  }, { $set: { fulfillmentEmailStatus: 'sending', fulfillmentEmailLeaseAt: new Date() } }, { new: true });

  if (leased) {
    try {
      await sendMomentCodesEmail(email, codes, input.orderNumber);
      await Order.updateOne({ _id: order._id, fulfillmentEmailStatus: 'sending', fulfillmentEmailLeaseAt: leased.fulfillmentEmailLeaseAt },
        { $set: { fulfillmentEmailStatus: 'sent' }, $unset: { fulfillmentEmailLeaseAt: '' } });
    } catch (error) {
      await Order.updateOne({ _id: order._id, fulfillmentEmailStatus: 'sending', fulfillmentEmailLeaseAt: leased.fulfillmentEmailLeaseAt },
        { $set: { fulfillmentEmailStatus: 'pending' }, $unset: { fulfillmentEmailLeaseAt: '' } });
      throw error;
    }
  }
  return { created, orderId: order._id.toString(), generatedCodes: codes };
}
