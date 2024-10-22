import resSend from "../../GlobalHandelers/resSend.handler";
import catchAsync from "../../Utils/catchAsync";
import { adminModel } from "./Admin.model";

const getMe = catchAsync(async (req, res)=>{
    const {email}= req.user;
    const result = await adminModel.findOne({email});
    resSend(res,200,"Admin Retrived Successfully", result);
})


export const adminController = {
    getMe
}