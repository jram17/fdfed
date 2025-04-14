import { Router } from "express";
class ApiRouter {
    route: Router | null = null;
    constructor() {
        this.route = Router();
    }
}

export { ApiRouter };
