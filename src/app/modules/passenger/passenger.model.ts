import { Schema, model } from "mongoose";
import { TPassenger } from "./passenger.interface";

const passengerSchema = new Schema<TPassenger>({
  pid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  contactNumber: { type: String, required: true },
  isVerified: { type: Boolean, required: true, default: false },
  role: {
    type: String,
    required: true
  },
  profileImg: String,
  rideHistory: [{ type: String, ref: "Rides" }]
});

export const PassengerModel = model<TPassenger>("Passenger", passengerSchema);

