import config from "../../config";
import jwt from 'jsonwebtoken'



export const createToken = (payload: {}, expiresIn : string) => jwt.sign(payload, config.jwtSecret as string,{expiresIn})