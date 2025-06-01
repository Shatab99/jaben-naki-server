import { Router } from "express";
import { RideController } from "./BookRide.controller";
import auth from "../../Utils/auth.Middleware";
import { UserRole } from "../../GlobalInterfaces/global.userRole";
import validate from "../../Utils/validation.zod";
import { bookRideValidation } from "./BookRide.validation";

const router = Router()
const {bookRide, editSeat} = bookRideValidation

router.post("/:id", auth(UserRole.passenger),validate(bookRide) , RideController.bookRide)
router.get("/my-rides", auth(UserRole.passenger), RideController.getMyBookedRides)

router.get("/get-ride/:id", RideController.getBookingDetails)

router.patch("/edit-seat/:id", auth(UserRole.passenger),validate(editSeat) , RideController.editSeat)
router.delete("/cancel/:id", auth(UserRole.passenger),RideController.cancelRide)

export const BookRidesRouter = router;
