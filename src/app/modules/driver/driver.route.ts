import { Router } from "express";
import { driverController } from "./driver.controller";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";

const router = Router()

router.get("/me",auth(UserRole.driver), driverController.getMe)


export const driverRouter = router