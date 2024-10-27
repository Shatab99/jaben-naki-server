import { Router } from "express";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";
import { startRideController } from "./startRide.controller";

const router = Router()

router.post("/started-ride/:id", auth(UserRole.driver), startRideController.createStartRide)


export const startRideRouter = router