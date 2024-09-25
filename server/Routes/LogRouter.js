const LogController = require("../Controllers/SecurityController");
const express = require('express');
const { jwt_authenticate } = require("../middlewares/PassportLogin");
require("../config/passport_config");

class LogRouter extends LogController {
    constructor() {
        super();
        this.route = express.Router();
        this.route.use(jwt_authenticate);

        this.route.get('/:apartment_id', this.getLogDetails.bind(this));
        this.route.post('/add-log', this.addLogDetails.bind(this));


    }
}

module.exports = new LogRouter().route;
