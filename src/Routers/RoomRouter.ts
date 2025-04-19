import { Router } from "express";
import { jwt_authenticate } from "#/middlewares/loginMiddleware";
import { RoomController } from "#/Controllers/RoomController";
class RoomRouter extends RoomController {
  route: Router | null = null;
  constructor() {
    super();
    this.route = Router();
    this.route.use(jwt_authenticate);
    this.route.post("/create-room", this.createRoom.bind(this));
  }
}

const { route } = new RoomRouter();
export { route };
