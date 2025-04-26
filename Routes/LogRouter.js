const LogController = require("../Controllers/LogController");
const express = require('express');
const { jwt_authenticate } = require("../middlewares/PassportLoginMiddleware");
require("../config/passport_config");

class LogRouter extends LogController {
    constructor() {
        super();
        this.route = express.Router();
        this.route.use(jwt_authenticate);
        this.route.get('/log-details/:apartment_id',this.getLogs.bind(this));
        this.route.get('/log-details/:apartment_id/:apartmentuser', this.getUserLogs.bind(this));
        this.route.post('/send-guest-invite',this.sendOtp.bind(this));
        this.route.patch('/guest-entry',this.regsiterGuestEntry.bind(this));
        this.route.patch('/guest-exit',this.registerGuestExit.bind(this));
        


    }
}

module.exports = new LogRouter().route;
