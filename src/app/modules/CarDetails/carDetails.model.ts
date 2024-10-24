import { Schema, model } from "mongoose";
import { TCarDetails } from "./carDetails.interface"; 

const carDetailsSchema = new Schema<TCarDetails>({
  driverEmail: { type: String, required: true },
  driverName: { type: String, required: true },
  carSerialNo: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    enum: ["car", "truck", "ambulance"], 
    required: true 
  },
  verified: { type: Boolean, default: false },
  carImg: { type: String, required: true },
  carColor: { type: String, required: true },
}, { timestamps: true }); 

export const carDetailsModel = model<TCarDetails>("CarDetails", carDetailsSchema);
