import { Schema, model } from "mongoose";
import { TKyc } from "./kyc.interface"; 

const kycSchema = new Schema<TKyc>({
  driverEmail: { type: String, required: true },
  driverName: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["car", "truck", "ambulance"], 
    required: true 
  },
  NIDSerial: { type: String, required: true },
  drivingLincenseSL: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  driverPic: { type: String, required: true },
  driverLinsensePic: { type: String, required: true },
}, { timestamps: true }); 

export const kycModel = model<TKyc>("KYCAppeal", kycSchema);
