import AuthController from "#/Controllers/AuthController";
import { Router } from "express";
import { login } from "#/middlewares/loginMiddleware";
class AuthRouter extends AuthController {
  route: Router | null = null;
  constructor() {
    super();
    this.route = Router();
    this.route.post("/register", this.register.bind(this));
    this.route.post("/login", login);
    this.route.get("/logout", this.logout.bind(this));
  }
}

const {route } = new AuthRouter();
export { route  };
