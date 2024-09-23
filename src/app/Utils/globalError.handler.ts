import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import zodErrorHandler from "../GlobalHandelers/zodError";
import { TErroSource } from "../GlobalInterfaces/error.interface";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode: number
    statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong !"
    let errorSource : TErroSource =[{
        path: "",
        message: "something went wrong !"
    }]


    if( err instanceof ZodError){
        const error = zodErrorHandler(err)
        statusCode = error.statusCode
        message = error.message
        errorSource = error.errorSource
    }


    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSource
    })
}


export default globalErrorHandler;