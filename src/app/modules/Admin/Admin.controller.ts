import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { driverModel } from "../driver/driver.model";
import { PassengerModel } from "../passenger/passenger.model";
import { adminModel } from "./Admin.model";

const getMe = catchAsync(async (req, res)=>{
    const {email}= req.user;
    const result = await adminModel.findOne({email});
    resSend(res,200,"Admin Retrived Successfully", result);
})

const getAllDriver = catchAsync(async (req, res)=>{
    const result = await driverModel.find()
    resSend(res,200, "All Driver Accounts Retrived !!", result)
})
const getAllPassenger = catchAsync(async (req, res)=>{
    const result = await PassengerModel.find()
    resSend(res,200, "All Passenger Accounts Retrived !!", result)
})


export const adminController = {
    getMe, getAllDriver, getAllPassenger
}