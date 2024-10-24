import { z } from "zod";

const kycAppealValidation = z.object({
    body: z.object({
        NIDSerial: z.string().min(1, { message: "National ID serial is required" }),
        drivingLincenseSL: z.string().min(1, { message: "Driving license serial is required" }),
        dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),  // You can use date validation as well
        driverPic: z.string().min(1, { message: "Driver picture URL is required" }),
        driverLinsensePic: z.string().min(1, { message: "Driver license picture URL is required" })
    })
});

const confirmAppeal = z.object({
    body : z.object({
        email: z.string().email({ message: "Invalid email address" }),
    })
})

export const kycValidation = {
    kycAppealValidation,confirmAppeal
}
