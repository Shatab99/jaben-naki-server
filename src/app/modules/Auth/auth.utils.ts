import config from "../../config";
import jwt from 'jsonwebtoken'



export const createToken = (payload: {}) => jwt.sign(payload, config.jwtSecret as string,{expiresIn:'10h'})