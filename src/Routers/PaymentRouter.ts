import { Router } from "express";
import { PaymentController } from "#/Controllers/PaymentController";
import { jwt_authenticate } from "#/middlewares/loginMiddleware";
class PaymentRouter extends PaymentController {
  route: Router | null = null;
  constructor() {
    super();
    this.route = Router();
    this.route.use(jwt_authenticate);
    this.route.post("/create-subscription", this.createPayment.bind(this));
    this.route.get(
      "/get-subscription-details/:roomId/:subscriptionId",
      this.getSubscription.bind(this),
    );
    this.route.get(
      "/get-all-subscription-details",
      this.getAllSubscripions.bind(this),
    );
  }
}

const { route } = new PaymentRouter();
export { route };
