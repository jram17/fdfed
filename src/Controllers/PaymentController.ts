import {
  getAllSubscriptionDetails,
  getSubscriptionDetails,
  createSubscription,
} from "#/utils/paymentutils";
import { db } from "#/config/db";
import { createPaymentDto, getSubscriptionDTO } from "#/dto/paymentDto";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
class PaymentController {
  async createPayment(req: Request, res: Response) {
    try {
      const parsed = createPaymentDto.safeParse({ ...req.body, id: req.id });

      if (!parsed.success) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: "error",
          message: "Invalid request payload",
        });
      }

      const { registrationNum, subType, id } = parsed.data!;
      const room = await db.room.findFirst({
        where: {
          registration_num: registrationNum,
        },
      });
      if (room) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: "error",
          message: "already a room was present with same reg no",
        });
      }
      const subscription = await createSubscription({
        sub_type: subType,
      });

      res.status(StatusCodes.CREATED).json({
        success: "success",
        message: "Subscription created successfully",
        subscription,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Payment Error:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: "error",
          message: "Failed to create subscription: " + error.message,
        });
      }

      console.error("Unknown Payment Error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: "error",
        message: "Failed to create subscription due to an unknown error",
      });
    }
  }
  async getSubscription(req: Request, res: Response) {
    try {
      const isparsed = getSubscriptionDTO.safeParse(req.params);
      if (!isparsed.success) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: "error",
          message: "Invalid request payload",
        });
      }
      const { data } = isparsed;
      const room = await db.room.findFirst({
        where: {
          id: data?.roomId,
          ownerId: req.id,
        },
      });
      if (!room) {
        res.status(StatusCodes.CONFLICT).json({
          success: "error",
          message: "Invalid request for the subscription",
        });
      }
      const details = await getSubscriptionDetails(data?.subscriptionId!);
      res.status(StatusCodes.OK).json({
        success: "success",
        message: "Subscription created successfully",
        details,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Payment Error:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: "error",
          message: "Failed to fetch subscription: " + error.message,
        });
      }

      console.error("Unknown Payment Error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: "error",
        message: "Failed to fetch subscription due to an unknown error",
      });
    }
  }
  async getAllSubscripions(req: Request, res: Response) {
    try {
      if (!req.isAdmin) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: "error",
          message: "Can only be called by the admin",
        });
      }
      const subscriptiondetails = await getAllSubscriptionDetails();
      res.status(StatusCodes.OK).json({
        status: "success",
        message: "Admin panel details",
        subscriptiondetails,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Payment Error:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: "error",
          message: "Failed to fetch subscription details: " + error.message,
        });
      }

      console.error("Unknown Payment Error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: "error",
        message: "Failed to fetch subscription due to an unknown error",
      });
    }
  }
}
export { PaymentController };
