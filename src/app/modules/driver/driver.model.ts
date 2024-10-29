import { Schema, model } from "mongoose";
import { TDriver } from "./driver.interface";

const driverSchema = new Schema<TDriver>({
  Did: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  carDetails: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  contactNumber: { type: String, required: true },
  isVerified: { type: Boolean, default:false },
  kycVerified: { type: Boolean, default : false },
  role: { type: String},
  credit: { type: Number,  default: 0 },
  rating: { type: Number,  default: 0 },
  complitedRides: { type: Number, default:0 },
  CurstomerReview: [{
    Cname: { type: String},
    review: { type: String }
  }],
  isActive: { type: Boolean, default: true },
  profileImg: { type: String },
  rideHistory: [{ type: String , ref :'Rides'}]
});

export const driverModel = model<TDriver>("Driver", driverSchema);

