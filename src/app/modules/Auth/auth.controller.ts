import config from "../../config";
import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import sendVerifyEmail from "../../Utils/verifyEmail";
import { adminModel } from "../Admin/Admin.model";
import { driverModel } from "../driver/driver.model";
import { PassengerModel } from "../passenger/passenger.model";
import { userModel } from "../User/user.model";
import { createToken } from "./auth.utils";
import jwt, { JwtPayload } from "jsonwebtoken"

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.isUserExists(email);
    const { role, userName } = user

    if (!user) {
        throw new Error("User Doesn't exists")
    }

    const isPasswordCorrect = await userModel.isPasswordCorrect(password, user?.password)

    if (!isPasswordCorrect) {
        throw new Error("Incorrect Password !")
    }

    if (user?.status === 'blocked') {
        throw new Error("This user is blocked !! ")
    }

    const token = createToken({ email, role, userName })

    res.cookie("token", token, {
        secure: config.nodeEnv === 'production',
        httpOnly: true
    })

    resSend(res, 200, "Successfully logged in", { token })
})

const verifyEmail = catchAsync(async (req, res) => {
    const {email} = req.user;
    const token = req.cookies.token;
    const verifyUrl = `https://jaben-naki-server.vercel.app/api/v1/auth/update?token=${token}&email=${email}`;
    sendVerifyEmail(email,verifyUrl)
    resSend(res, 200, `Mail send successfully to ${email} , Please check your mail !`,{email,token})
})

const verifyUser = catchAsync(async (req, res)=>{
    const token = req.query.token;
    const email = req.query.email;

    const decode = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload

    if(decode.email !== email){
        throw new Error("You are not authrized !!")
    }

    if(decode.role === "admin"){
        const result = await adminModel.findOneAndUpdate({email},{
            isVerified : true
        })
    }
    if(decode.role === "driver"){
        const result = await driverModel.findOneAndUpdate({email},{
            isVerified : true
        })
    }
    if(decode.role === "passenger"){
        const result = await PassengerModel.findOneAndUpdate({email},{
            isVerified : true
        })
    }
    

    res.send("Your mail is now verified !!")
})




export const authController = {
    login, verifyEmail,verifyUser
}