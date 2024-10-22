import { Schema, model } from "mongoose";
import { TAdmin } from "./Admin.interface";

const adminSchema = new Schema<TAdmin>({
  Aid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['admin'], required: true },
  profileImg: { type: String},
});

export const adminModel = model<TAdmin>("Admin", adminSchema);
