import { Router } from "express";
import { UserController } from "./user.controller";
import validate from "../../Utils/validation.zod";
import { userValidation } from "./user.validation";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";

const router = Router()
const { createPassenger, createDriver, createAdmin } = userValidation

router.post("/create-passenger", validate(createPassenger), UserController.createPassenger);
router.post("/create-driver", validate(createDriver), UserController.createDriver);
router.post("/create-admin", validate(createAdmin), UserController.createAdmin);
router.get("/me",auth(UserRole.passenger, UserRole.driver), UserController.getMe);

export const userRouter = router;