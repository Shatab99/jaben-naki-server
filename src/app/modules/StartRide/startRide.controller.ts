import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { bookRideModel } from "../BookRides/BookRide.model";
import { ridePostsModel } from "../RidePosts/RidePosts.model";
import { userModel } from "../User/user.model";
import { StartRideModel } from "./startRide.model";

const createStartRide = catchAsync(async (req, res) => {
    // @ts-ignore
    const { email } = req.user;
    const ridePostId = req.params.id;
    const ridePost = await ridePostsModel.findById(ridePostId);

    if (!ridePost) throw new Error("Ride post not found");

    if (email !== ridePost?.driverEmail) throw new Error("You can not start Other driver's ride")

    const books = await bookRideModel.find(
        { _id: { $in: ridePost.bookingIds } }
    );

    if (!books) throw new Error("No passengers found for this ride post");

    const passengerBooked = books.map(book => ({
        email: book.passengerEmail,
        totalFare: book.fare,
        numberOfSeats: book.numberOfSeats
    }));


    const insertInStartRide = await StartRideModel.create({
        driverName: ridePost?.driverName,
        driverEmail: ridePost?.driverEmail,
        passengerBooked,
        totalFare: Number(ridePost?.fare) * (Number(ridePost?.totalSeats) - Number(ridePost?.vacantSeats)),
        from: ridePost?.from,
        to: ridePost?.to,
        journeyDate: ridePost?.journeyDate,
        type: ridePost?.type
    })

    //update driver's ride post status
    await userModel.findOneAndUpdate({ email }, { $set: { isRiding: true, startRideId: insertInStartRide._id } });

    // update passenger's isRiding status
    await userModel.updateMany(
        { email: { $in: passengerBooked.map(p => p.email) } },
        { $set: { isRiding: true, startRideId: insertInStartRide._id } }
    );

    // update status of passenger
    await bookRideModel.deleteMany(
        { _id: { $in: ridePost?.bookingIds } }
    );
    //delete Ride post
    await ridePostsModel.findByIdAndDelete(ridePostId);

    resSend(res, 200, "You have Started Ride . FiAmanillah for your journey ☺", { startRideId: insertInStartRide._id })
})


const getRideStarted = catchAsync(async (req, res) => {
    const id = req.params.id;
    const startedRides = await StartRideModel.findById(id);
    if (!startedRides) {
        throw new Error("You have not started any ride yet")
    }
    resSend(res, 200, "Started Rides fetched successfully",  startedRides )
})


export const startRideController = {
    createStartRide,
    getRideStarted
}