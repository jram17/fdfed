const express = require('express');
const { jwt_authenticate } = require("../middlewares/PassportLogin");
const DashBoardController = require("../Controllers/Dashboard");
require("../config/passport_config");

class DashBoardControllerRouter extends DashBoardController {
    constructor() {
        super();
        this.route = express.Router();
        this.route.use(jwt_authenticate);

        // Bind the method to ensure 'this' context is correctly used
        this.route.get('/apartment_details', this.UserApartmentDetails.bind(this));
    }
}

module.exports = new DashBoardControllerRouter().route;
