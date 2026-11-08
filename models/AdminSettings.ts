import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminSettings extends Document {
  createdAt: Date;
  updatedAt: Date;
}

const AdminSettingsSchema: Schema = new Schema({}, { timestamps: true });

const AdminSettings: Model<IAdminSettings> =
  mongoose.models.AdminSettings || mongoose.model<IAdminSettings>('AdminSettings', AdminSettingsSchema);

export default AdminSettings;
