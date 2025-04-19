import { redis } from "#/config/redis";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "#/types/api-response";
export const setCache = (
  req: Request,
  res: Response,
  next: NextFunction,
  statusCode: number,
  jsonresponse: ApiResponse,
) => {
  const userId = req.id;
  const url = req.url;
  redis.hset(userId, url, JSON.stringify(jsonresponse));
  res.status(statusCode).json(jsonresponse);
};

export const getCache = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const content = await redis.hget(req.id, req.url);
  if (!content) {
    const response = JSON.parse(content!);
    res.status(200).json(response);
  } else {
    next();
  }
};
