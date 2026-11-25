import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRetailPack extends Document {
  barcode: string;
  bundleSize: 1 | 4 | 7;
  channel: 'hotel' | 'cruise';
  organisationId: string;
  locationId: string;
  voyageId?: string;
  status: 'available' | 'sold' | 'void';
  recoveryEmail?: string;
  soldAt?: Date;
  soldBy?: string;
  saleReference?: string;
  retailPrice: number;
  discountAmount?: number;
  saleValue?: number;
  commissionAmount?: number;
  commissionRate: number;
  createdAt: Date;
  updatedAt: Date;
}
const RetailPackSchema = new Schema<IRetailPack>({
  barcode: { type: String, required: true, unique: true, index: true },
  bundleSize: { type: Number, enum: [1,4,7], required: true },
  channel: { type: String, enum: ['hotel','cruise'], required: true },
  organisationId: { type: String, required: true, index: true },
  locationId: { type: String, required: true },
  voyageId: String,
  status: { type: String, enum: ['available','sold','void'], default: 'available', required: true },
  recoveryEmail: { type: String, lowercase: true, trim: true },
  soldAt: Date,
  soldBy: String,
  saleReference: String,
  retailPrice: { type: Number, required: true },
  discountAmount: Number,
  saleValue: Number,
  commissionAmount: Number,
  commissionRate: { type: Number, required: true },
}, { timestamps: true });
RetailPackSchema.index({ organisationId: 1, status: 1 });
const RetailPack: Model<IRetailPack> = mongoose.models.RetailPack || mongoose.model<IRetailPack>('RetailPack', RetailPackSchema);
export default RetailPack;
