import { Schema, model } from "mongoose";
import { TPassengerRideHistory } from "./passenger.rideHistory.interface";

const passengerRideHistorySchema = new Schema<TPassengerRideHistory>({
    driverName: { type: String, required: true },
    passengerEmail: { type: String, required: true },
    driverEmail: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    type: { type: String, enum: ["ride", "parcel"], required: true },
    fare: { type: Number, required: true },
    numberOfSeats: { type: Number, required: true },
    reachedTime: { type: String, required: true },
}, { timestamps: true });

export const PassengerRideHistoryModel = model<TPassengerRideHistory>("PassengerRideHistory", passengerRideHistorySchema);
