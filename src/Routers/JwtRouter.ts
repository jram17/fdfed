import AuthController from "#/Controllers/AuthController";
import { Router } from "express";
import { jwt_authenticate } from "#/middlewares/loginMiddleware";
import { Request, Response } from "express";
class JwtRouter extends AuthController {
  route: Router | null = null;
  constructor() {
    super();
    this.route = Router();
    this.route.use(jwt_authenticate);
    this.route.post("/jwt", (req: Request, res: Response) => {
      res.status(200).json({
        status: "success",
        message: "jwt verified",
        content: { id: req.id, ...req.userDetails },
      });
    });
  }
}

const { route } = new JwtRouter();
export { route };
