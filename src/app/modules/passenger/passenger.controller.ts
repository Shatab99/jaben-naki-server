import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { PassengerModel } from "./passenger.model";

const getMe = catchAsync(async (req, res) => {
    const { email } = req.user;

    const passenger = await PassengerModel.findOne({ email })

    resSend(res, 200, "User Retrived Successfully !", passenger)
})


export const passengerController = {
    getMe
}