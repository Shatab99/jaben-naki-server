import { Router } from "express";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import validate from "../../Utils/validation.zod";

const router = Router()
const { login } = authValidation

router.post("/login", validate(login), authController.login)

export const authRouter = router;
