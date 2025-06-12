import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { PassengerRideHistoryModel } from "../CompleteRideActions/passenger.rideHistory.model";
import { driverModel } from "../driver/driver.model";
import { DriverReviewModel } from "./driverReview.model";

const giveReview = catchAsync(async (req, res) => {
    //@ts-ignore
    const { email: passengerEmail } = req.user
    const data: { driverEmail: string, rating: number, message: string } = req.body

    const history = await PassengerRideHistoryModel.find({ passengerEmail, driverEmail: data.driverEmail })
    if (!history) throw new Error("You are not his customer!")

    const reviewCount = await DriverReviewModel.countDocuments({ passengerEmail })

    const ratingCount = await DriverReviewModel.countDocuments({ driverEmail: data.driverEmail })

    if (reviewCount >= history.length) throw new Error("you had already gave a review !")

    const driver = await driverModel.findOne({ email: data.driverEmail })

    if (!driver) throw new Error("driver not found !")

    const oldRating = driver.rating
    const newRating = (oldRating * ratingCount + data.rating) / (ratingCount + 1)

    await driverModel.updateOne(
        { email: data.driverEmail },
        {
            rating: newRating
        }
    )

    await DriverReviewModel.create({
        passengerEmail, ...data
    })

    resSend(res, 200, "Your review posted successfully", {})
})


export const driverReviewController = {
    giveReview
}