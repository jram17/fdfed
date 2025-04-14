import { Router } from "express";
import { route as AuthRoute } from "#/Routers/AuthRouter";
const router = Router();

router.use('/auth', AuthRoute!);


export { router }






