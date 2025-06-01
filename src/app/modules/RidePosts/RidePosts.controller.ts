import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { driverModel } from "../driver/driver.model";
import { userModel } from "../User/user.model";
import { ridePostsModel } from "./RidePosts.model";

const getAllRidePost = catchAsync(async (req, res) => {
    const email = req.query.email;

    if (email) {
        const result = await ridePostsModel.find({ driverEmail: email })
        resSend(res, 200, "All Ride Posts retrived Successfully Filtered By email", result)
    }
    else {
        const result = await ridePostsModel.find()
        resSend(res, 200, "All Ride Posts retrived Successfully", result)
    }
})

const getAllRidesForPassenger = catchAsync(async (req, res) => {
  const { from, to, date, seat } = req.query;

  const query: any = {};

  // Case-insensitive exact matches for strings
  if (from) {
    query.from = { $regex: new RegExp(`^${from}$`, "i") };
  }
  if (to) {
    query.to = { $regex: new RegExp(`^${to}$`, "i") };
  }
  if (date) {
    query.journeyDate = { $regex: new RegExp(`^${date}$`, "i") };
  }
  if (seat) {
    const seatCount = parseInt(seat as string, 10);
    if (!isNaN(seatCount)) {
      query.vacantSeats = { $gte: seatCount };
    }
  }

  const result = await ridePostsModel.find(query);

  if (result.length === 0) {
    return resSend(res, 404, "No rides found!", []);
  }

  resSend(res, 200, "All rides retrieved successfully", result);
});





const postARide = catchAsync(async (req, res) => {
    // @ts-ignore
    const { email } = req.user;
    const body = req.body
    // const pending = await userModel.isUserPending(email);

    // if (pending) {
    //     throw new Error("This account is pending .Please appeal for KYC varification!")
    // }

    const driver = await driverModel.findOne({ email })
    const result = await ridePostsModel.create({
        driverName: driver?.name, driverEmail: driver?.email, ...body
    })
    resSend(res, 200, "Ride Placed Successfully !", result)
})


const updateRidePosts = catchAsync(async (req, res) => {
    const body = req.body;
    const result = await ridePostsModel.findByIdAndUpdate(body)
    resSend(res, 200, "Ride Post Updated", result)
})

const cancelRidePost = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await ridePostsModel.findByIdAndDelete(id);
    resSend(res, 200, "Your Ride post has been removed From everywhere", result)
})




export const ridePostsController = {
    postARide, updateRidePosts, cancelRidePost,getAllRidePost,getAllRidesForPassenger
}