import { redis } from "#/config/redis";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "#/types/api-response";

/**
 * Remove a cached entry for a user and specific URL.
 */

export const removeCache = (
  statusCode: number,
  jsonresponse: ApiResponse,
  url: string,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.id;
      if (userId) {
        await redis.hdel(userId, url);
      }
      res.status(statusCode).json(jsonresponse);
    } catch (err) {
      console.error("❌ Redis hset error:", err);
      next(err);
    }
  };
};

/**
 * Middleware to check Redis cache before continuing.
 * If found, sends cached response immediately.
 */
export const getCache = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.id;
    const url = req.originalUrl;

    if (!userId) return next();

    const cachedContent = await redis.hget(userId, url);

    if (cachedContent) {
      const response: ApiResponse = JSON.parse(cachedContent);
      return res.status(200).json(response);
    }

    return next();
  } catch (err) {
    console.error("❌ Redis hget error:", err);
    return next(); // fallback to next if Redis fails
  }
};

export const setCache = (
  statusCode: number,
  jsonresponse: ApiResponse,
  url: string,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.id;
      if (userId) {
        await redis.hset(userId, url, JSON.stringify(jsonresponse));
      }
      res.status(statusCode).json(jsonresponse);
    } catch (err) {
      console.error("❌ Redis hset error:", err);
      next(err);
    }
  };
};
