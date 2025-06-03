import { Schema, model } from "mongoose";
import { TDriverRideHistory, TPassengers } from "./driver.rideHistory.interface";


const TPassengersSchema = new Schema<TPassengers>({
    email: { type: String, required: true },
    totalFare: { type: Number, required: true },
    numberOfSeats: { type: Number, required: true }
}, { _id: false }); // Disable automatic _id generation for this subdocument schema

const driverRideHistorySchema = new Schema<TDriverRideHistory>({
    driverEmail: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    passengers: { type: [TPassengersSchema], required: true },
    type: { type: String, enum: ["ride", "parcel"], required: true },
    totalFare: { type: Number, required: true },
    reachedTime: { type: String, required: true }
}, { timestamps: true });

export const DriverRideHistoryModel = model<TDriverRideHistory>("DriverRideHistory", driverRideHistorySchema);

