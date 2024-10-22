import { z } from "zod";

const createRidePosts = z.object({
    body: z.object({
        from: z.string().min(1, { message: "Starting location is required" }),
        to: z.string().min(1, { message: "Destination is required" }),
        fare: z.string().min(1, { message: "Fare amount is required" }),
        type: z.enum(["ride", "parcel"], {
            required_error: "Type is required",
            invalid_type_error: "Invalid type",
        }),
    })
});
const updateRidePosts = z.object({
    body: z.object({
        from: z.string().min(1, { message: "Starting location is required" }).optional(),
        to: z.string().min(1, { message: "Destination is required" }).optional(),
        fare: z.string().min(1, { message: "Fare amount is required" }).optional(),
        type: z.enum(["ride", "parcel"], {
            required_error: "Type is required",
            invalid_type_error: "Invalid type",
        }).optional(),
    })
});

export const ridePostsValidation = {
    createRidePosts,updateRidePosts
}



