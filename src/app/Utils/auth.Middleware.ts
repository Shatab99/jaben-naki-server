import { TUserRole } from "../GlobalInterfaces/global.userRole";
import jwt, { JwtPayload } from "jsonwebtoken"
import catchAsync from "./catchAsync";
import config from "../config";
import { userModel } from "../modules/User/user.model";

const auth = (...roles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {
        const token = req.cookies.token;

        if(!token){
            throw new Error("Please Log in !")
        }

        const decode = jwt.verify(token, config.jwtSecret as string) as JwtPayload

        const { email, role , userName } = decode as JwtPayload

        const user = await userModel.isUserExists(email)

        if(!user){
            throw new Error("User Does not exits !")
        }

        if(user.status === 'blocked'){
            throw new Error("This user is Blocked !!")
        }

        if(roles && !roles.includes(role)){
            throw new Error("You are not authorized !!")
        }
        
        req.user = decode as JwtPayload;
        
        next()
    })
}


export default auth;