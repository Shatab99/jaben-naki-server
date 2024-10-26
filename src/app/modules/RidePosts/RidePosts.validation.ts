import { z } from "zod";

const createRidePosts = z.object({
    body: z.object({
        from: z.string().min(1, { message: "Starting location is required" }),
        to: z.string().min(1, { message: "Destination is required" }),
        fare: z.string().min(1, { message: "Fare amount is required" }),
        journeyStartTime: z
            .string()
            .regex(
                /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/,
                "journeyStartTime must be in HH:MM AM/PM format"
            ),
        journeyDate: z
            .string()
            .regex(
                /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
                "journeyDate must be in dd-mm-yyyy format"
            ).optional(),
        type: z.enum(["ride", "parcel"], {
            required_error: "Type is required",
            invalid_type_error: "Invalid type",
        }),
    }),
});


const updateRidePosts = z.object({
    body: z.object({
        from: z.string().min(1, { message: "Starting location is required" }).optional(),
        to: z.string().min(1, { message: "Destination is required" }).optional(),
        fare: z.string().min(1, { message: "Fare amount is required" }).optional(),
        journeyStartTime: z
            .string()
            .regex(
                /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/,
                "journeyStartTime must be in HH:MM AM/PM format"
            ).optional(),
        type: z.enum(["ride", "parcel"], {
            required_error: "Type is required",
            invalid_type_error: "Invalid type",
        }).optional(),
    })
});

export const ridePostsValidation = {
    createRidePosts, updateRidePosts
}



