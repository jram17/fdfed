import { Router } from "express";
import { PaymentController } from "#/Controllers/PaymentController";
import { jwt_authenticate } from "#/middlewares/loginMiddleware";
import { isAdmin } from "#/middlewares/adminMiddleware";

class PaymentRouter extends PaymentController {
  route: Router | null = null;

  constructor() {
    super();
    this.route = Router();

    // Apply auth middleware to all routes
    this.route.use(jwt_authenticate);

    this.route.post("/create-subscription", this.createPayment.bind(this));

    this.route.get(
      "/get-subscription-details/:roomId/:subscriptionId",
      this.getSubscription.bind(this)
    );

    this.route.get(
      "/get-all-subscription-details",
      isAdmin,
      this.getAllSubscripions.bind(this)
    );
  }
}

const { route } = new PaymentRouter();
export { route };

