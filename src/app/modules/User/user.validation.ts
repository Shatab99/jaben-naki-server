import { z } from "zod";

const createPassenger = z.object({
    body: z.object({
        user: z.object({
            email: z.string().email({ message: "Invalid email address" }),
            userName: z.string().min(3, { message: "Username must be at least 3 characters long" }),
            password: z.string().min(6, { message: "Password must be at least 6 characters long" })
        }),
        passenger: z.object({
            name: z.string().min(1, { message: "Name is required" }),
            dateOfBirth: z.string({ message: "Invalid date of birth" }),
            contactNumber: z.string().min(10, { message: "Contact number must be at least 10 characters long" })
        })
    })
});

const createDriver = z.object({
    body: z.object({
        user: z.object({
            email: z.string().email({ message: "Invalid email address" }),
            userName: z.string().min(3, { message: "Username must be at least 3 characters long" }),
            password: z.string().min(6, { message: "Password must be at least 6 characters long" })
        }),

        driver: z.object({
            name: z.string().min(1, { message: "Name is required" }),
            dateOfBirth: z.string().min(1, { message: "Date of Birth is required" }),
            contactNumber: z.string().min(10, { message: "Contact number must be at least 10 characters long" }),
            isActive: z.boolean(),
            profileImg: z.string().url({ message: "Invalid URL for profile image" })
        }),

        carDetails: z.object({
            carSerialNo: z.string().min(1, { message: "Car serial number is required" }),
            category: z.enum(["car", "truck", "ambulance"], {
                required_error: "Category is required",
                invalid_type_error: "Invalid category",
            }),
            carImg: z.string().min(1, { message: "Car image URL is required" }),
            carColor: z.string().min(1, { message: "Car color is required" }),
        })
    })
});

const createAdmin = z.object({
    body: z.object({
        user: z.object({
            email: z.string().email({ message: "Invalid email address" }),
            userName: z.string().min(3, { message: "Username must be at least 3 characters long" }),
            password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
            status: z.enum(["warned", "blocked", "good"], { message: "Invalid status" })
        }),
        admin: z.object({
            name: z.string().min(1, { message: "Name is required" }),
            contactNumber: z.string().min(1, { message: "Contact number is required" }),
            isVerified: z.boolean().optional().default(false),
        })
    })
});

export const userValidation = {
    createPassenger, createDriver, createAdmin
}



