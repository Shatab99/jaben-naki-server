import { model, Schema } from "mongoose";

export type TDriverReview = {
    driverEmail: string;
    passengerEmail: string;
    rating: number;
    message: string;
}

const driverReviewSchema = new Schema<TDriverReview>(
    {
        driverEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        passengerEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        message: {
            type: String,
            required: false,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const DriverReviewModel = model<TDriverReview>("DriverReview", driverReviewSchema)