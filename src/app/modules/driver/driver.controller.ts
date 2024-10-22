import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { driverModel } from "./driver.model";

const getMe = catchAsync(async (req, res) => {
    const {email}= req.user;
    const result = await driverModel.findOne({email})

    resSend(res, 200 ,'Driver Retrived Successfully !', result)
})


export const driverController = {
    getMe
}

