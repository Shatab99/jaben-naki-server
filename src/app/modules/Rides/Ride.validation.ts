import { z } from "zod";

export const rideValidationSchema = z.object({
    body: z.object({
        passengerEmail: z.string().email({ message: "Invalid passenger email address" }),
        driverEmail: z.string().email({ message: "Invalid driver email address" }),
        passengerName: z.string().min(1, { message: "Passenger name is required" }),
        driverName: z.string().min(1, { message: "Driver name is required" }),
        from: z.string().min(1, { message: "Starting location is required" }),
        to: z.string().min(1, { message: "Destination is required" }),
        fare: z.string().min(1, { message: "Fare amount is required" }),
        status: z.enum(["notPicked", "startedRide", "reached"], {
            required_error: "Status is required",
            invalid_type_error: "Invalid status",
        }),
        type: z.enum(["ride", "parcel"], {
            required_error: "Type is required",
            invalid_type_error: "Invalid type",
        }),
    })
});
