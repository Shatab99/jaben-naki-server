import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { userModel } from "../User/user.model";
import { driverModel } from "./driver.model";

const getMe = catchAsync(async (req, res) => {
    const {email}= req.user;
    const user = await userModel.isUserExists(email)

    if(user.status === 'pending'){
        throw new Error("Your Account is pending . Please Appeal for KYC ! ")
    }

    const result = await driverModel.findOne({email})

    resSend(res, 200 ,'Driver Retrived Successfully !', result)
})


export const driverController = {
    getMe
}

