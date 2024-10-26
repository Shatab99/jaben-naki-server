import { z } from "zod";

const bookRide = z.object({
    body: z.object({
        passengerEmail: z.string().email({ message: "Invalid email address" }),
        passengerName: z.string().min(3, { message: "Username must be at least 3 characters long" }),
        numberOfSeats : z.number().min(1,{message :"Minimun 1 seat required !"})
    })
});
const editSeat = z.object({
    body: z.object({
        numberOfSeats : z.number().min(1,{message :"Minimun 1 seat required !"})
    })
});


export const bookRideValidation ={
    bookRide,editSeat
}