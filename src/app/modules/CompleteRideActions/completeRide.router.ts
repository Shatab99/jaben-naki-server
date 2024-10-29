import { Router } from "express";
import { completeRideController } from "./completeRide.controller";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";

const router = Router();

router.post("/complete-the-ride/:id", auth(UserRole.driver), completeRideController.completeRide)

router.get("/passenger-history", auth(UserRole.passenger), completeRideController.getAllPassengerHistory)

router.get("/driver-history", auth(UserRole.driver), completeRideController.getAllDriverHistory)

export const completeRideRouter = router;