import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { bookRideModel } from "../BookRides/BookRide.model";
import { PassengerModel } from "../passenger/passenger.model";
import { ridePostsModel } from "../RidePosts/RidePosts.model";
import { StartRideModel } from "./startRide.model";

const createStartRide = catchAsync(async (req, res) => {
    const {email} = req.user;
    const ridePostId = req.params.id;
    const ridePost = await ridePostsModel.findById(ridePostId);

    if(email !== ridePost?.driverEmail){
        throw new Error("You can not start Other driver's ride")
    }


    const insertInStartRide = await StartRideModel.create({
        driverName: ridePost?.driverName,
        driverEmail: ridePost?.driverEmail,
        passengerBooked: ridePost?.bookingIds,
        totalFare: Number(ridePost?.fare) * (Number(ridePost?.totalSeats) - Number(ridePost?.vacantSeats)),
        from: ridePost?.from,
        to: ridePost?.to,
        journeyDate: ridePost?.journeyDate,
        type: ridePost?.type
    })

    // update status of passenger

    const updateStatusOfAllPassengers = await bookRideModel.updateMany(
        { _id: { $in: ridePost?.bookingIds } },
        { $set: { status: "startedRide" } }
    )
    //delete Ride post 

    const deleteRidePost = await ridePostsModel.findByIdAndDelete(ridePostId);

    resSend(res, 200, "You have Started Ride . FiAmanillah for your journey ☺", { insertInStartRide, updateStatusOfAllPassengers })


})


export const startRideController = {
    createStartRide
}