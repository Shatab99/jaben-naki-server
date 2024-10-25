import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { bookRideModel } from "./BookRide.model";


const createRide = catchAsync(async (req, res)=>{
    const data = req.body;
    const result = await bookRideModel.create(data)
    resSend(res,200,"Ride Placed Successfully !", result)
})

export const RideController = {
    createRide
}