import { z } from "zod";

const bookRide = z.object({
    body: z.object({
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