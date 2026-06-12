import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { env } from "../../config/env.js";

const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof ZodError) {
        const issue = err.issues[0];
        const field =
            issue.path.length > 0
                ? issue.path.join(".")
                : issue.code === "unrecognized_keys"
                    ? issue.keys?.join(", ")
                    : "unknown";
        return res.status(400).json({
            success: false,
            message: `Invalid field: ${field}`
        });
    }

    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        ...(env.NODE_ENV === "development" && {
            stack: err.stack
        })
    });
};

export default errorMiddleware;