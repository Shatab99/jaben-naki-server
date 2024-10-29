import { Schema, model } from "mongoose";
import { TStartRide } from "./startRide.interface";

// Define the Mongoose schema
const startRideSchema = new Schema<TStartRide>({
    driverName: { type: String, required: true },
    driverEmail: { type: String, required: true },
    bookingIds: [{ type: String, required: true }], // Array of strings
    totalFare: { type: Number, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    journeyDate: { type: String, required: true }, // Assuming date in "dd-mm-yyyy" format
    type: { type: String, enum: ["ride", "parcel"], required: true }
}, { timestamps: true }); // Optionally add timestamps

// Export the model
export const StartRideModel = model<TStartRide>("StartRide", startRideSchema);
