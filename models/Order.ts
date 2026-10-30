import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ILineItem {
  productId: string;
  variantId: string;
  quantity: number;
  metafields?: Record<string, any>;
}

export interface IOrder extends Document {
  orderReference: string;
  orderName?: string;
  productReference: string;
  orderQuantity: number;
  user: Types.ObjectId;
  email: string;
  customerName?: string;
  totalPrice: number;
  currency: string;
  paymentStatus: 'paid';
  source: 'webhook' | 'admin' | 'stripe';
  paymentProvider: 'stripe' | 'manual';
  tags: string[];
  lineItems: ILineItem[];
  fulfillmentEmailStatus?: 'pending' | 'sending' | 'sent';
  fulfillmentEmailLeaseAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderReference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    productReference: {
      type: String,
      required: true,
    },
    orderName: {
      type: String,
      required: false,
    },
    orderQuantity: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    customerName: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: 'USD',
    },
    paymentStatus: {
      type: String,
      enum: ['paid'],
      default: 'paid',
      required: true,
    },
    source: {
      type: String,
      enum: ['webhook', 'admin', 'stripe'],
      default: 'webhook',
      required: true,
      index: true,
    },
    paymentProvider: {
      type: String,
      enum: ['stripe', 'manual'],
      default: 'stripe',
      required: true,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    fulfillmentEmailStatus: { type: String, enum: ['pending', 'sending', 'sent'], default: 'pending' },
    fulfillmentEmailLeaseAt: { type: Date },
    lineItems: [
      {
        productId: String,
        variantId: String,
        quantity: Number,
        metafields: Schema.Types.Mixed,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation during development
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
