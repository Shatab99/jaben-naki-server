import { Router } from "express";
import { RideController } from "./Ride.controller";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";

const router = Router()

router.post("/create-Ride",auth(UserRole.passenger), RideController.createRide)

export const RideRouter = router;
