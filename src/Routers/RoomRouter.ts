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
    this.route.post("/add-resident", this.addResidents.bind(this));
    this.route.post(
      "/resident-confirmation",
      this.addApartmentResidents.bind(this),
    );
    this.route.delete("/remove-apartment-user", this.removeUser.bind(this));
    this.route.patch(
      "/update-apartment-user-role",
      this.updateUserRole.bind(this),
    );
  }
}

const { route } = new RoomRouter();
export { route };
