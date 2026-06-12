import { Response } from "express";

export const sendResponse = (
    res: Response,
    statusCode: number,
    message: string = 'success',
    data?: any
) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    })
}