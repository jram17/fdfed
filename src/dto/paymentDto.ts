import * as z from "zod";
import { SubscriptionEnum } from "./roomDto";
export const createPaymentDto = z.object({
  registrationNum: z.string().length(6, {
    message: "Not a proper reg num",
  }),
  id: z.string().uuid({
    message: "Not a proper uuid",
  }),
  subType: SubscriptionEnum,
});

export const getSubscriptionDTO = z.object({
  roomId: z.string().uuid(),
  subscriptionId: z.string(),
});
