import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { driverModel } from "../driver/driver.model";
import { ridePostsModel } from "./RidePosts.model";

const postARide = catchAsync(async (req,res)=>{
    const {email} = req.user;
    const body = req.body
    const driver = await driverModel.findOne({email})
    const result = await ridePostsModel.create({
        driverName : driver?.name , driverEmail : driver?.email,...body 
    })
    resSend(res, 200, "Ride Placed Successfully !", result)
})


const updateRidePosts = catchAsync(async (req, res)=>{
    const {email} = req.user;
    const body = req.body;
    const result = await ridePostsModel.findByIdAndUpdate(body)
    resSend(res,200,"Ride Post Updated", result)
})


export const ridePostsController = {
    postARide,updateRidePosts
}