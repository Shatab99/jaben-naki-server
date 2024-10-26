import { Schema, model } from "mongoose";
import { TRidePosts } from "./RidePosts.interface";

const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const ridePostsSchema = new Schema<TRidePosts>({
    driverEmail: { type: String, required: true },
    driverName: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    fare: { type: Number, required: true },
    journeyStartTime: { type: String, required: true },
    journeyDate: { 
        type: String, 
        required: true, 
        default: () => formatDate(new Date()) // Setting today's date as default in dd-mm-yyyy format
    },
    type: { 
        type: String, 
        enum: ["ride", "parcel"], 
        required: true 
    },
    vacantSeats: { type: Number, default : 0 },
    pessengerBooked: [{ type: String, ref: "Passengers" }]
}, { timestamps: true });  // Adding timestamps for createdAt and updatedAt fields

export const ridePostsModel = model<TRidePosts>("RidePost", ridePostsSchema);

