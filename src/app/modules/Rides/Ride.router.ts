import { Router } from "express";
import { RideController } from "./Ride.controller";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";
import validate from "../../Utils/validation.zod";
import { rideValidationSchema } from "./Ride.validation";

const router = Router()

router.post("/create-Ride", auth(UserRole.passenger),validate(rideValidationSchema) , RideController.createRide)

export const RideRouter = router;
