import { Router } from "express";
import { driverController } from "./driver.controller";

const router = Router()

router.get("/me", driverController.getMe)


export const driverRouter = router