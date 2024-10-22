import config from "../../config";
import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { userModel } from "../User/user.model";
import { createToken } from "./auth.utils";

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.isUserExists(email);
    const { role,userName } = user

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

    const token = createToken({ email, role , userName})

    res.cookie("token", token,{
        secure: config.nodeEnv === 'production',
        httpOnly : true
    })

    resSend(res, 200, "Successfully logged in", { token })
})

export const authController = {
    login
}