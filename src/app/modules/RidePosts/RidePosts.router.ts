import { Router } from "express";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";
import validate from "../../Utils/validation.zod";
import { ridePostsValidation } from "./RidePosts.validation";
import { ridePostsController } from "./RidePosts.controller";

const router = Router()
const {createRidePosts, updateRidePosts} = ridePostsValidation


router.post("/post-ride", auth(UserRole.driver), validate(createRidePosts), ridePostsController.postARide)
router.put("/update-ride", auth(UserRole.driver), validate(updateRidePosts), ridePostsController.updateRidePosts)


export const ridePostsRouter = router