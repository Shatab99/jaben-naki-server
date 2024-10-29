import { Schema, model } from "mongoose";
import { TDriverRideHistory, TPassengers } from "./driver.rideHistory.interface";

const passengersSchema = new Schema<TPassengers>({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

const driverRideHistorySchema = new Schema<TDriverRideHistory>({
    driverEmail: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    passengers: { type: [passengersSchema], required: true },
    type: { type: String, enum: ["ride", "parcel"], required: true },
    totalFare: { type: Number, required: true },
    reachedTime: { type: String, required: true }
}, { timestamps: true });

export const DriverRideHistoryModel = model<TDriverRideHistory>("DriverRideHistory", driverRideHistorySchema);

