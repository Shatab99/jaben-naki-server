import { Router } from "express";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";
import { passengerController } from "./passenger.controller";

const router = Router()

router.get('/me',auth(UserRole.passenger), passengerController.getMe)

export const passengerRouter = router