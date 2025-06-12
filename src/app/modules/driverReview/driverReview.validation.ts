import { z } from 'zod';

export const driverReviewSchema = z.object({
    body: z.object({
        driverEmail: z
            .string()
            .email({ message: 'Driver email must be a valid email address' })
            .toLowerCase()
            .trim(),
        rating: z
            .number()
            .min(1, { message: 'Rating must be at least 1' })
            .max(5, { message: 'Rating cannot exceed 5' }),

        message: z
            .string()
            .max(500, { message: 'Message should not exceed 500 characters' })
            .optional()
    })
});