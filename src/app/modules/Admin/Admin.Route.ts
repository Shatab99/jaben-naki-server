import { Router } from "express";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";
import { adminController } from "./Admin.controller";

const router = Router()

router.get('/me',auth(UserRole.admin), adminController.getMe )
router.get('/get-all-driver',auth(UserRole.admin), adminController.getAllDriver )
router.get('/get-all-passenger',auth(UserRole.admin), adminController.getAllPassenger )



export const AdminRouter = router