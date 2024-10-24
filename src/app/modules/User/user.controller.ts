import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { adminModel } from "../Admin/Admin.model";
import { carDetailsModel } from "../CarDetails/carDetails.model";
import { driverModel } from "../driver/driver.model";
import { PassengerModel } from "../passenger/passenger.model";
import { userModel } from "./user.model";

const createPassenger = catchAsync(async (req, res) => {
    const data = req.body;

    const { user, passenger } = data

    const userRes = await userModel.create({ role: 'passenger', ...user })

    const userData = await userModel.findOne({ email: user.email })

    const passengerRes = await PassengerModel.create({ pid: userData?._id, role: 'passenger', email: user?.email, ...passenger })


    resSend(res, 200, "Passenger Created Successfully", { passengerRes, userRes })
})

const createDriver = catchAsync(async (req, res) => {
    const data = req.body;

    const { user, driver, carDetails } = data
    const userRes = await userModel.create({ role: 'driver', status: "pending", ...user })

    const carDetailsRes = await carDetailsModel.create({
        driverEmail: user.email, driverName: driver.name, ...carDetails
    })

    const userData = await userModel.findOne({ email: user.email })
    const carDetailsData = await carDetailsModel.findOne({ driverEmail: user.email })
    
    const driverRes = await driverModel.create({ Did: userData?._id,carDetails : carDetailsData?._id , role: 'driver', email: user?.email, ...driver })

    resSend(res, 200, "Driver Created Successfully", { driverRes, userRes, carDetailsRes })
})

const createAdmin = catchAsync(async (req, res) => {
    const data = req.body;
    const { user, admin } = data;
    const userRes = await userModel.create({ role: "admin", ...user })
    const userData = await userModel.findOne({ email: user.email })
    const adminRes = await adminModel.create({
        Aid: userData?._id, role: "admin", email: user?.email, ...admin
    })

    resSend(res, 200, "Admin has Created Successfully", { userRes, adminRes })
})




export const UserController = {
    createPassenger, createDriver, createAdmin
}