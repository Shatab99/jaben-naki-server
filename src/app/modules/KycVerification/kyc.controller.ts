import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { carDetailsModel } from "../CarDetails/carDetails.model";
import { driverModel } from "../driver/driver.model";
import { userModel } from "../User/user.model";
import { kycModel } from "./kyc.model";

const appealKyc = catchAsync(async (req, res) => {
    // @ts-ignore
    const { email } = req.user;
    const data = req.body;
    const info = await carDetailsModel.findOne({ driverEmail: email })
    const result = await kycModel.create({
        driverEmail: info?.driverEmail, driverName: info?.driverName, category: info?.category, ...data
    })

    resSend(res, 200, "Successfully Appealed !", result);
})

const confirmAppeal = catchAsync(async (req, res) => {
    const { email } = req.body;
    const updateUser = await userModel.findOneAndUpdate({ email }, {
        status: "good",
    })
    const updateDriver = await driverModel.findOneAndUpdate({ email }, {
        kycVerified: true
    })

    const updateCardetails = await carDetailsModel.findOneAndUpdate({ driverEmail: email }, {
        verified: true
    })

    resSend(res, 200, "This Driver is now Verified by admin !", { updateCardetails, updateDriver, updateUser })

})


const getAllAppeals = catchAsync(async (req, res) => {
    const result = await kycModel.find();
    resSend(res, 200, "All KYC Application Retrived Successfully !", result)
})


export const kycController = {
    appealKyc, confirmAppeal,getAllAppeals
}