import { Router } from "express";
import { route as AuthRoute } from "#/Routers/AuthRouter";
import { route as RoomRoute } from "#/Routers/RoomRouter";
import { route as JwtRoute } from "#/Routers/JwtRouter";
import { route as PaymentRoute } from "#/Routers/PaymentRouter";
const router = Router();

router.use("/auth", AuthRoute!);
router.use("/jwt", JwtRoute!);
router.use("/room", RoomRoute!);
router.use("/payment", PaymentRoute!);

export { router };
