import { Router } from "express";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";
import validate from "../../Utils/validation.zod";
import { driverReviewSchema } from "./driverReview.validation";
import { driverReviewController } from "./driverReview.controller";

const router = Router()

router.post("/give-review", auth(UserRole.passenger), validate(driverReviewSchema), driverReviewController.giveReview)

export const driverReviewRouter = router