import { Router } from "express";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";
import { adminController } from "./Admin.controller";

const router = Router()

router.get('/me',auth(UserRole.admin), adminController.getMe )



export const AdminRouter = router