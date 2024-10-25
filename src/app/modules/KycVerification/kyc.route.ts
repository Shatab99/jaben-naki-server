import { Router } from "express";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";
import { kycController } from "./kyc.controller";
import validate from "../../Utils/validation.zod";
import { kycValidation } from "./kyc.validation";

const router = Router()

const { kycAppealValidation, confirmAppeal } = kycValidation

router.get('/get-all-appeals', auth(UserRole.admin), kycController.getAllAppeals)

router.post('/for-appeal', auth(UserRole.driver), validate(kycAppealValidation), kycController.appealKyc)

router.patch('/confirm-appeal', auth(UserRole.admin), validate(confirmAppeal), kycController.confirmAppeal)

export const kycRouter = router