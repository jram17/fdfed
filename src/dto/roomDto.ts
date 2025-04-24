import * as z from "zod";
export const SubscriptionEnum = z.enum(["BASIC", "PREMIUM"]); 

export const RoomCreateDto = z.object({
  ownerId: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  state: z.string(),
  coverpicurl: z.string().url(),
  pincode: z.string().length(6), 
  registration_num: z.string(),
  subscription: SubscriptionEnum.optional().default("BASIC"),
  subscriptionStatus: z.boolean().optional().default(false),
  flatNo:z.number()
});


export const joinResidentDto = z.object({
    roomId : z.string().uuid(),
    emails: z.array(z.string().email())
})


export const addResidentDto = z.object({
    roomId :z.string().uuid(),
    flatNo :z.number(),
    token :z.string()
})
