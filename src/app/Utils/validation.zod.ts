import { Schema } from "zod";
import catchAsync from "./catchAsync";

const validate =(schema : Schema)=>{
    return catchAsync(async (req, res ,next)=>{
        await schema.parse({
            body : req.body,
            cookie : req.cookies
        })
        next();
    })
}


export default validate;