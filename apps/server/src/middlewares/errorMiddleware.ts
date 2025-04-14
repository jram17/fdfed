import { Request, Response, NextFunction } from "express";
import { ApiError } from "#/utils/errorutils";

export function errorHandler(
    err: ApiError | Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const statusCode = err instanceof ApiError ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";
    const url = err instanceof ApiError ? err.url : "Url Not Found";
    res.status(statusCode).json({
        success: false,
        message,
        url
    });
}
