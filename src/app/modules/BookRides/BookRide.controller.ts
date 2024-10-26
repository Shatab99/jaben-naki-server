import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { PassengerModel } from "../passenger/passenger.model";
import { ridePostsModel } from "../RidePosts/RidePosts.model";
import { bookRideModel } from "./BookRide.model";


const bookRide = catchAsync(async (req, res) => {
    const { email } = req.user;
    const id = req.params.id;
    const { numberOfSeats } = req.body;
    const ridePost = await ridePostsModel.findById(id).lean()

    if (Number(ridePost?.vacantSeats) < numberOfSeats) {
        throw new Error("No seat available !")
    }

    if (Number(ridePost?.vacantSeats) <= 0) {
        throw new Error("No seat available !")
    }

    const isBookExists = await bookRideModel.findOne({ passengerEmail: email })

    if (isBookExists) {
        throw new Error("You have already booked!!")
    }

    const passengerData = await PassengerModel.findOne({ email })


    const updateRidePost = await ridePostsModel.findByIdAndUpdate(id, {
        vacantSeats: Number(ridePost?.vacantSeats) - numberOfSeats,
        $push: { pessengerBooked: passengerData?._id }
    })

    const result = await bookRideModel.create({
        ridePostId: ridePost?._id,
        passengerEmail: passengerData?.email, passengerName: passengerData?.name, numberOfSeats,
        driverEmail: ridePost?.driverEmail,
        driverName: ridePost?.driverName,
        from: ridePost?.from,
        to: ridePost?.to,
        fare: Number(ridePost?.fare) * Number(numberOfSeats),
        journeyStartTime: ridePost?.journeyStartTime,
        journeyDate: ridePost?.journeyDate,
        status: "notPicked",
        type: ridePost?.type,
        isPaid: false
    })
    resSend(res, 200, "Ride Placed Successfully !", { result, updateRidePost })
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

    console.log(typeof (Number(ridePost?.fare)))
    console.log(Number(ridePost?.fare))
    console.log(ridePost)

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

})


export const RideController = {
    bookRide, editSeat
}