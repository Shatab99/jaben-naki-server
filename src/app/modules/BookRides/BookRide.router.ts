import { Router } from "express";
import { RideController } from "./BookRide.controller";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";
import validate from "../../Utils/validation.zod";
import { bookRideValidation } from "./BookRide.validation";



const router = Router()

router.post("/create-Ride", auth(UserRole.passenger),validate(bookRideValidation) , RideController.createRide)

export const BookRidesRouter = router;
