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

function normalizeId(id: string | number | undefined): string {
  return id != null ? String(id) : '';
}

/**
 * Extracts quantity from product metafields and deliveryType from variant metafields.
 */
export async function processPaidOrderAndGenerateCodes(input: ProcessOrderInput): Promise<{
  created: boolean;
  orderId: string;
  generatedCodes: string[];
}> {
  const normalizedEmail = input.email.toLowerCase().trim();
  const existingOrder = await Order.findOne({ orderReference: input.orderReference });
  if (existingOrder) {
    return {
      created: false,
      orderId: existingOrder._id.toString(),
      generatedCodes: [],
    };
  }

  let user = await User.findOne({ email: normalizedEmail });
  if (!user) user = await User.create({ email: normalizedEmail, roles: ['buyer'] });

  const totalQuantity = input.lineItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const firstProductId = normalizeId(input.lineItems[0]?.product_id);

  const orderRecord = await Order.create({
    orderReference: input.orderReference,
    orderName: input.orderName || input.orderNumber,
    shopifyProductId: firstProductId,
    orderQuantity: totalQuantity,
    user: user._id,
    email: normalizedEmail,
    customerName: input.customerName || '',
    totalPrice: input.totalPrice,
    currency: input.currency || 'USD',
    paymentStatus: 'paid',
    source: input.source || 'webhook',
    paymentProvider: input.paymentProvider || (input.source === 'admin' ? 'manual' : 'stripe'),
    tags: input.tags || [],
    lineItems: input.lineItems.map((item) => ({
      productId: normalizeId(item.product_id),
      variantId: normalizeId(item.variant_id),
      quantity: item.quantity || 0,
    })),
  });

  const generatedCodes: string[] = [];
  for (const item of input.codesToGenerate) {
    for (let i = 0; i < item.quantity; i++) {
      try {
        let code = '';
        let attempts = 0;
        const maxAttempts = 10;
        do {
          code = generateMomentCode(item.quantity, item.deliveryType);
          attempts += 1;
          if (attempts >= maxAttempts) {
            throw new Error('Failed to generate unique code after multiple attempts');
          }
        } while (await MomentCode.findOne({ code }));

        await MomentCode.create({
          code,
          user: user._id,
          order: orderRecord._id,
          quantity: item.quantity,
          deliveryType: item.deliveryType,
          status: 'new',
        });
        generatedCodes.push(code);
      } catch (error) {
        console.error('Error generating code:', error);
      }
    }
  }

  if (generatedCodes.length > 0) {
    try {
      await sendMomentCodesEmail(normalizedEmail, generatedCodes, input.orderNumber);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }
  }

  return {
    created: true,
    orderId: orderRecord._id.toString(),
    generatedCodes,
  };
}
