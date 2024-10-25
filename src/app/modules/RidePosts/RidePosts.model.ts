import { Schema, model } from "mongoose";
import { TRidePosts } from "./RidePosts.interface";
  

const ridePostsSchema = new Schema<TRidePosts>({
  driverEmail: { type: String, required: true },
  driverName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  fare: { type: String, required: true },
  journeyStartTime: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["ride", "parcel"], 
    required: true 
  },
}, { timestamps: true });  // Adding timestamps for createdAt and updatedAt fields

export const ridePostsModel = model<TRidePosts>("RidePost", ridePostsSchema);
