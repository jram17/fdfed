import { db } from "#/config/db";
import { NextFunction, Request, Response } from "express";
import { RoomCreateDto } from "#/dto/roomDto";
import { StatusCodes } from "http-status-codes";
import { removeCache } from "#/middlewares/redisMiddleware";
import { ApiResponse } from "#/types/api-response";
class RoomController {
  async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const isvalid = RoomCreateDto.safeParse({ ...req.body, ownerId: req.id });
      if (!isvalid.success) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: "error",
          message: "Error in data validation",
        });
      }
      const { data } = isvalid;
      const addedRoom = await db.room.create({
        data: data!,
      });
      if (!addedRoom) {
        res.status(StatusCodes.NOT_IMPLEMENTED).json({
          status: "error",
          message: "Error in creating the room",
        });
      }
      const response: ApiResponse = {
        status: "success",
        message: "room created successfully",
        content: {
          roomId: addedRoom.id,
        },
      };
      removeCache(201, response, "/api/room/get-rooms")(req, res, next);
      next();
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

}

export { RoomController };
