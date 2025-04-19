import { NextFunction, Request, Response } from "express";
import { env } from "#/utils/envutils";
import { StatusCodes } from "http-status-codes";
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.userDetails.email === env.ADMIN_EMAIL) {
    next();
  } else {
         res.status(StatusCodes.UNAUTHORIZED).json({
      status: "success",
      message: "This is a private route",
    });
  }
};
