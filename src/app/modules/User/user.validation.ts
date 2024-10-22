import { z } from "zod";

const createPassenger = z.object({
    body: z.object({
        user: z.object({
            email: z.string().email({ message: "Invalid email address" }),
            userName: z.string().min(3, { message: "Username must be at least 3 characters long" }),
            password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
            status: z.enum(["warned", "blocked", "good"], { message: "Invalid status" })
        }),
        passenger: z.object({
            email: z.string().email({ message: "Invalid email address" }),
            name: z.string().min(1, { message: "Name is required" }),
            dateOfBirth: z.string({ message: "Invalid date of birth" }),
            contactNumber: z.string().min(10, { message: "Contact number must be at least 10 characters long" }),
            isVerified: z.boolean().default(false),
            rideHistory: z.array(z.string()).optional(),
        })
    })
});

const createDriver = z.object({
    body: z.object({
        user: z.object({
            email: z.string().email({ message: "Invalid email address" }),
            userName: z.string().min(3, { message: "Username must be at least 3 characters long" }),
            password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
            status: z.enum(["warned", "blocked", "good"], { message: "Invalid status" })
        }),
        driver: z.object({
            email: z.string().email({ message: "Invalid email address" }),
            name: z.string().min(1, { message: "Name is required" }),
            dateOfBirth: z.string().min(1, { message: "Date of Birth is required" }),
            contactNumber: z.string().min(10, { message: "Contact number must be at least 10 characters long" }),
            CurstomerReview: z.array(z.object({
                Cname: z.string().min(1, { message: "Customer name is required" }),
                review: z.string().min(1, { message: "Review is required" })
            })).optional(),
            category: z.enum(["car", "truck"], { message: "Invalid vehicle category" }),
            isActive: z.boolean().default(true),
            profileImg: z.string().url({ message: "Invalid URL for profile image" }),
            rideHistory: z.array(z.string()).optional(),
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



