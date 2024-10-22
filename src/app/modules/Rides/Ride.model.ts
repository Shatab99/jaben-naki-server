import { Schema, model } from "mongoose";
import { TRide } from "./Ride.interface";

const rideSchema = new Schema<TRide>({
  passengerEmail: { type: String, required: true },
  driverEmail: { type: String, required: true },
  passengerName: { type: String, required: true },
  driverName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  fare: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["notPicked", "startedRide", "reached"], 
    required: true 
  },
  type: { 
    type: String, 
    enum: ["ride", "parcel"], 
    required: true 
  },
}, { timestamps: true }); 

export const rideModel = model<TRide>("Ride", rideSchema);
