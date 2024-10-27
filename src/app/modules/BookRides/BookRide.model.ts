import { Schema, model } from "mongoose";
import { TBookRide } from "./BookRide.interface";


const rideSchema = new Schema<TBookRide>({
  ridePostId :{ type: String, required: true },
  passengerEmail: { type: String, required: true },
  driverEmail: { type: String, required: true },
  passengerName: { type: String, required: true },
  driverName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  journeyStartTime: { type: String, required: true },
  journeyDate: { type: String, required: true },
  fare: { type: Number, required: true },
  numberOfSeats: { type: Number, required: true },
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
  isPaid : {type:Boolean, default : false}
}, { timestamps: true }); 

export const bookRideModel = model<TBookRide>("RideBook", rideSchema);
