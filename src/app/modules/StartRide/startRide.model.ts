import { Schema, model } from "mongoose";
import { TPassengerBooked, TStartRide } from "./startRide.interface";


const passengerBookedSchema = new Schema<TPassengerBooked>({
    email: { type: String, required: true },
    totalFare: { type: Number, required: true },
    numberOfSeats: { type: Number, required: true }
}, { _id: false }); // Disable automatic _id generation for this subdocument schema

// Define the Mongoose schema
const startRideSchema = new Schema<TStartRide>({
    driverName: { type: String, required: true },
    driverEmail: { type: String, required: true },
    passengerBooked: [passengerBookedSchema], // Use the subdocument schema
    totalFare: { type: Number, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    journeyDate: { type: String, required: true }, // Assuming date in "dd-mm-yyyy" format
    type: { type: String, enum: ["ride", "parcel"], required: true }
}, { timestamps: true }); // Optionally add timestamps

// Export the model
export const StartRideModel = model<TStartRide>("StartRide", startRideSchema);
