import { Router } from "express";
import { userRouter } from "../User/user.router";
import { authRouter } from "../Auth/auth.route";
import { passengerRouter } from "../passenger/passenger.router";
import { driverRouter } from "../driver/driver.route";
import { AdminRouter } from "../Admin/Admin.Route";
import { ridePostsRouter } from "../RidePosts/RidePosts.router";
import { kycRouter } from "../KycVerification/kyc.route";
import { BookRidesRouter } from "../BookRides/BookRide.router";



const router = Router()


const modules = [
    {
        path : "/user",
        route: userRouter
    },
    {
        path : "/auth",
        route: authRouter
    },
    {
        path : "/passenger",
        route: passengerRouter
    },
    {
        path : "/driver",
        route: driverRouter
    },
    {
        path : "/admin",
        route: AdminRouter
    },
    {
        path : "/book-ride",
        route: BookRidesRouter
    },
    {
        path : "/ridePosts",
        route: ridePostsRouter
    },
    {
        path : "/kyc",
        route: kycRouter
    },
]

modules.forEach(route => router.use(route.path, route.route))

export default router