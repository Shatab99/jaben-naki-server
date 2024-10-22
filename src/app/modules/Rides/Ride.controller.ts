import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { rideModel } from "./Ride.model";

const createRide = catchAsync(async (req, res)=>{
    const data = req.body;
    const result = await rideModel.create(data)
    resSend(res,200,"Ride Placed Successfully !", result)
})

export const RideController = {
    createRide
}