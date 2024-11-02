import { Router } from "express";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import validate from "../../Utils/validation.zod";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";

const router = Router()
const { login } = authValidation

router.post("/login", validate(login), authController.login)
router.post("/verifyMail", auth(UserRole.admin,UserRole.passenger,UserRole.driver), authController.verifyEmail)
router.get("/update", authController.verifyUser)

export const authRouter = router;
