import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { bookRideModel } from "../BookRides/BookRide.model";
import { driverModel } from "../driver/driver.model";
import { StartRideModel } from "../StartRide/startRide.model";
import { DriverRideHistoryModel } from "./driver.rideHistory.model";
import { PassengerRideHistoryModel } from "./passenger.rideHistory.model";

function getCurrentTime(): string {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format, with 12 instead of 0 for midnight/noon
    return `${hours}:${minutes} ${ampm}`;
}

const completeRide = catchAsync(async (req, res) => {
    //@ts-ignore
    const { email } = req.user;
    const startRideId = req.params.id;

    const startRideData = await StartRideModel.findById(startRideId);

    if (email !== startRideData?.driverEmail) {
        throw new Error("You are not allowed to complete the ride !")
    }

    const bookRides = await bookRideModel.find({
        _id: { $in: startRideData?.bookingIds }
    })

    const passengers = bookRides.map(bookRide => {
        return {
            name: bookRide.passengerName,
            email: bookRide.passengerEmail,
        }
    })

    //driver Section

    const driverRideHistory = await DriverRideHistoryModel.create({
        driverEmail: startRideData?.driverEmail,
        from: startRideData?.from,
        to: startRideData?.to,
        type: startRideData?.type,
        totalFare: startRideData?.totalFare,
        reachedTime: getCurrentTime(),
        passengers
    })

    const driverAcc = await driverModel.findOne({ email: startRideData?.driverEmail })

    const driverAccUpdate = await driverModel.findOneAndUpdate({ email: startRideData?.driverEmail }, {
        credit: Number(driverAcc?.credit) + Number(startRideData?.totalFare),
        complitedRides: Number(driverAcc?.complitedRides) + 1,
    })


    //passenger Section

    const passengerHistories = bookRides.map(bookRide => {
        return {
            driverName: bookRide?.driverName,
            passengerEmail: bookRide?.passengerEmail,
            driverEmail: bookRide?.driverEmail,
            from: bookRide?.from,
            to: bookRide?.to,
            type: bookRide?.type,
            fare: bookRide?.fare,
            numberOfSeats: bookRide?.numberOfSeats,
            reachedTime: getCurrentTime(),
        }
    })


    const savePassengerHistories = await PassengerRideHistoryModel.insertMany(passengerHistories);


    resSend(res, 200, "Ride Completed Successfully !", { driverRideHistory, savePassengerHistories, driverAccUpdate })

})

const getAllDriverHistory = catchAsync(async (req, res) => {
    //@ts-ignore
    const {email} = req.user;
    const result = await DriverRideHistoryModel.find({driverEmail : email})
    resSend(res,200, "All History Received ", result)
})
const getAllPassengerHistory = catchAsync(async (req, res) => {
    //@ts-ignore
    const {email} = req.user;
    const result = await PassengerRideHistoryModel.find({passengerEmail : email})
    resSend(res,200, "All History Received ", result)
})


export const completeRideController = {
    completeRide, getAllDriverHistory, getAllPassengerHistory
}