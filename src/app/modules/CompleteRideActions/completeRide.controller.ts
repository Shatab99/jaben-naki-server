import { io } from "../../../server";
import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { driverModel } from "../driver/driver.model";
import { StartRideModel } from "../StartRide/startRide.model";
import { userModel } from "../User/user.model";
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

    if (!startRideData) throw new Error("Start ride data not found");

    if (email !== startRideData?.driverEmail) {
        throw new Error("You are not allowed to complete the ride !")
    }

    const passengers = startRideData?.passengerBooked.map(p => {
        return {
            email: p.email,
            totalFare: p.totalFare,
            numberOfSeats: p.numberOfSeats
        };
    });

    if (!passengers) throw new Error("No passengers found for this ride");

    //driver Section
    await DriverRideHistoryModel.create({
        driverEmail: startRideData?.driverEmail,
        from: startRideData?.from,
        to: startRideData?.to,
        type: startRideData?.type,
        totalFare: startRideData?.totalFare,
        reachedTime: getCurrentTime(),
        passengers
    })

    const driverAcc = await driverModel.findOne({ email: startRideData?.driverEmail })

    await driverModel.findOneAndUpdate({ email: startRideData?.driverEmail }, {
        credit: Number(driverAcc?.credit) + Number(startRideData?.totalFare),
        complitedRides: Number(driverAcc?.complitedRides) + 1,
    })


    const passengerHistories = passengers.map(passenger => ({
        driverName: startRideData?.driverName,
        passengerEmail: passenger.email,
        driverEmail: startRideData?.driverEmail,
        from: startRideData?.from,
        to: startRideData?.to,
        type: startRideData?.type,
        fare: passenger.totalFare,
        numberOfSeats: passenger.numberOfSeats,
        reachedTime: getCurrentTime()
    }));

    await PassengerRideHistoryModel.insertMany(passengerHistories);

    //upadate driver and passenger status
    await userModel.findOneAndUpdate({ email }, { $set: { isRiding: false, startRideId: null } });
    await userModel.updateMany(
        { email: { $in: passengers.map(p => p.email) } },
        { $set: { isRiding: false, startRideId: null } }
    );

    //send notification to passengers
    const passengerEmails = passengers.map(p => p.email);
    passengerEmails.forEach(email => {
        io.to(email).emit("ride-completed", { driverEmail: startRideData?.driverEmail });
    });

    resSend(res, 200, "Ride Completed Successfully !", {})

})

const getAllDriverHistory = catchAsync(async (req, res) => {
    //@ts-ignore
    const { email } = req.user;
    const result = await DriverRideHistoryModel.find({ driverEmail: email })
    resSend(res, 200, "All History Received ", result)
})
const getAllPassengerHistory = catchAsync(async (req, res) => {
    //@ts-ignore
    const { email } = req.user;
    const result = await PassengerRideHistoryModel.find({ passengerEmail: email })
    resSend(res, 200, "All History Received ", result)
})


export const completeRideController = {
    completeRide, getAllDriverHistory, getAllPassengerHistory
}