import { ZodError, ZodIssue } from "zod";

const zodErrorHandler = (err: ZodError)=>{
    const errorSource = err.issues.map((issue : ZodIssue)=>{
        return {
            path : issue?.path[issue.path.length-1],
            message : issue?.message
        }
    })
    return {
        statusCode : 400 ,
        message : "Validation Error",
        errorSource
    }
}

export default zodErrorHandler;