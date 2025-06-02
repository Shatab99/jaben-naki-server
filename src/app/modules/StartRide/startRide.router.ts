import { Router } from "express";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";
import { startRideController } from "./startRide.controller";

const router = Router()

router.post("/started-ride/:id", auth(UserRole.driver), startRideController.createStartRide)

router.get("/started-ride/:id",  startRideController.getRideStarted)


export const startRideRouter = router