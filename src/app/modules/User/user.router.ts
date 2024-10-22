import { Router } from "express";
import { UserController } from "./user.controller";
import validate from "../../Utils/validation.zod";
import { userValidation } from "./user.validation";

const router = Router()
const { createPassenger, createDriver, createAdmin } = userValidation

router.post("/create-passenger", validate(createPassenger), UserController.createPassenger);
router.post("/create-driver", validate(createDriver), UserController.createDriver);
router.post("/create-admin", validate(createAdmin), UserController.createAdmin);

export const userRouter = router;