import { db } from "#/config/db";
import { NextFunction, Request, Response } from "express";
import { RoomCreateDto } from "#/dto/roomDto";
import { StatusCodes } from "http-status-codes";
import { removeCache } from "#/middlewares/redisMiddleware";
import { ApiResponse } from "#/types/api-response";
import { joinResidentDto, addResidentDto } from "#/dto/roomDto";
import { env } from "#/utils/envutils";
import { Resend } from "resend";
import { v4 as uuid } from "uuid";
import { Param } from "@prisma/client/runtime/library";
class RoomController {
  private resend: Resend;
  constructor() {
    this.resend = new Resend(env.RESEND_API);
  }
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
      const addOwner = await db.apartmentUser.create({
        data: {
          userId: req.id,
          roomId: addedRoom.id,
          flatNo: data?.flatNo!,
        },
      });
      let response: ApiResponse;
      if (addOwner) {
        response = {
          status: "success",
          message: "room created successfully",
          content: {
            roomId: addedRoom.id,
          },
        };
        removeCache(201, response, "/api/room/get-rooms")(req, res, next);
        next();
      } else {
        res.status(StatusCodes.CONFLICT).json({
          status: "error",
          message: "Error in creating the room ",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
  getExpiryTimeSixHoursFromNow(): Date {
    const now = new Date();
    const expiry = new Date(now.getTime() + 6 * 60 * 60 * 1000); // 6 hours in ms
    return expiry;
  }
  async addResidents(req: Request, res: Response, next: NextFunction) {
    try {
      const isvalid = joinResidentDto.safeParse(req.body);
      if (!isvalid.success) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: "error",
          message: "Error in data validation",
        });
      }
      const { data } = isvalid;
      data?.emails.map(async (email, _index) => {
        const userToken = uuid();
        const { data: _resp, error } = await this.resend?.emails.send({
          from: req.userDetails.email,
          to: [email],
          subject: "hello world",
          html: "<strong>it works!</strong>",
        });
        if (error) {
          res.status(StatusCodes.FAILED_DEPENDENCY).json({
            status: "error",
            message: `Error in sending email to user ${email}`,
          });
        }

        const issueToken = await db.joinRoom.create({
          data: {
            token: userToken,
            roomId: data.roomId,
            useremail: email,
            expiresOn: this.getExpiryTimeSixHoursFromNow(),
          },
        });
        if (!issueToken) {
          res.status(StatusCodes.FAILED_DEPENDENCY).json({
            status: "error",
            message: `Error in sending email to user ${email}`,
          });
        }

        res.status(StatusCodes.OK).json({
          status: "success",
          message: ` sent email to user ${email}`,
          content: {
            token: issueToken.token,
          },
        });
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
  async addApartmentResidents(req: Request, res: Response) {
    try {
      const isvalid = addResidentDto.safeParse(req.body);
      if (!isvalid.success) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: "error",
          message: "Error in data validation",
        });
      }
      const { data } = isvalid;
      const tokenData = await db.joinRoom.findFirst({
        where: {
          roomId: data?.roomId,
          token: data?.token,
          useremail: req.userDetails.email,
        },
      });
      if (!tokenData) {
        res.status(StatusCodes.CONFLICT).json({
          status: "error",
          message: "No invitation has been sent",
        });
      }
      if (tokenData?.expiresOn && new Date() > new Date(tokenData.expiresOn)) {
        res.status(StatusCodes.CONFLICT).json({
          status: "error",
          message: "Joining should be done within 6 hrs",
        });
      } else {
        const addUser = await db.apartmentUser.create({
          data: {
            roomId: data?.roomId!,
            userId: req.id,
            flatNo: data?.flatNo!,
          },
        });
        if (!addUser) {
          res.status(StatusCodes.CONFLICT).json({
            status: "error",
            message: "Error in adding the user",
          });
        } else {
          res.status(StatusCodes.OK).json({
            status: "success",
            message: "Add User to the apartment",
            content: {
              id: addUser.id,
              role: addUser.role,
            },
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
}

export { RoomController };
