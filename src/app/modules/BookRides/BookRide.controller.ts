import { io } from "../../../server";
import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { PassengerModel } from "../passenger/passenger.model";
import { ridePostsModel } from "../RidePosts/RidePosts.model";
import { bookRideModel } from "./BookRide.model";


const bookRide = catchAsync(async (req, res) => {
    //@ts-ignore
    const { email } = req.user;
    const id = req.params.id;
    const { numberOfSeats } = req.body;
    const ridePost = await ridePostsModel.findById(id).lean()

    if (!ridePost) throw new Error("Ride Post not found!");

    if (Number(ridePost?.vacantSeats) < numberOfSeats) throw new Error("No seat available !")


    if (Number(ridePost?.vacantSeats) <= 0) throw new Error("No seat available !");

    const isBookExists = await bookRideModel.findOne({ passengerEmail: email });

    if (isBookExists) throw new Error("You have already booked!!");

    const passengerData = await PassengerModel.findOne({ email });

    if (!passengerData) throw new Error("Passenger not found!");

    const result = await bookRideModel.create({
        ridePostId: ridePost._id,
        passengerEmail: passengerData.email,
        passengerName: passengerData.name,
        numberOfSeats: Number(numberOfSeats),
        driverEmail: ridePost.driverEmail,
        driverName: ridePost.driverName,
        from: ridePost.from,
        to: ridePost.to,
        fare: Number(ridePost.fare) * Number(numberOfSeats),
        journeyStartTime: ridePost.journeyStartTime,
        journeyDate: ridePost.journeyDate,
        status: "notPicked",
        type: ridePost.type,
        isPaid: false,
        passengerPhone: passengerData.contactNumber
    })

    const afterBook = await bookRideModel.findOne({ passengerEmail: email })

    const updateRidePost = await ridePostsModel.findByIdAndUpdate(id, {
        vacantSeats: Number(ridePost?.vacantSeats) - numberOfSeats,
        $push: { bookingIds: afterBook?._id }
    })

    // send  notification to driver

    io.to(ridePost.driverEmail).emit("ride-booked", { email: passengerData.email, name: passengerData.name })


    resSend(res, 200, "Ride Placed Successfully !", { result, updateRidePost })
})

const getMyBookedRides = catchAsync(async (req, res) => {
    //@ts-ignore
    const { email } = req.user;

    const bookedRides = await bookRideModel.find({ passengerEmail: email }).populate("ridePostId").lean();

    if (bookedRides.length === 0) {
        return resSend(res, 404, "No booked rides found!", []);
    }

    resSend(res, 200, "All booked rides retrieved successfully", bookedRides);
})

const editSeat = catchAsync(async (req, res) => {
    const id = req.params.id;
    const { numberOfSeats } = req.body

    const bookRideData = await bookRideModel.findById(id);

    const newSeat = Number(bookRideData?.numberOfSeats) - numberOfSeats;

    const ridePost = await ridePostsModel.findById(bookRideData?.ridePostId);

    const currentSeats = ridePost?.vacantSeats;

    const vacantSeats = Number(currentSeats) + newSeat

    if (vacantSeats < 0) {
        throw new Error("No seat Available !")
    }

    const updateRes = await bookRideModel.findByIdAndUpdate(id, {
        numberOfSeats, fare: Number(ridePost?.fare) * Number(numberOfSeats)
    })

    const updateRidePost = await ridePostsModel.findByIdAndUpdate(bookRideData?.ridePostId, {
        vacantSeats: Number(currentSeats) + newSeat
    })

    resSend(res, 200, "Seat Updated Successfully !", { updateRes, updateRidePost })
})


const cancelRide = catchAsync(async (req, res) => {
    const id = req.params.id;
    const bookRide = await bookRideModel.findById(id);
    const ridePost = await ridePostsModel.findById(bookRide?.ridePostId)


    const updateRidePost = await ridePostsModel.findByIdAndUpdate(bookRide?.ridePostId, {
        vacantSeats: Number(ridePost?.vacantSeats) + Number(bookRide?.numberOfSeats),
        $pull: { bookingIds: bookRide?._id }
    })

    const cancelResult = await bookRideModel.findByIdAndDelete(id)

    resSend(res, 200, "Ride canceled Successfully", { updateRidePost, cancelResult })
})

const getBookingDetails = catchAsync(async (req, res) => {
    const id = req.params.id;

    const bookingDetails = await bookRideModel.findById(id).populate("ridePostId").lean();

    if (!bookingDetails) throw new Error("Booking not found!");

    resSend(res, 200, "Booking details retrieved successfully", bookingDetails);
})

export const RideController = {
    bookRide, editSeat, cancelRide, getMyBookedRides, getBookingDetails
}