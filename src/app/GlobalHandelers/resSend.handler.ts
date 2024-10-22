import { Response } from "express";

const resSend = (res: Response, code: number, message: string, payload: {} | null) => {
    res.send({
        success: true,
        statusCode: code,
        message,
        payload
    })
}

export default resSend;