const LogController = require("../Controllers/SecurityController");
const express = require('express');
const { jwt_authenticate } = require("../middlewares/PassportLoginMiddleware");
require("../config/passport_config");

class LogRouter extends LogController {
    constructor() {
        super();
        this.route = express.Router();
        this.route.use(jwt_authenticate);

        this.route.get('/:apartment_id', this.getLogDetails.bind(this));
        this.route.post('/add-log', this.addLogDetails.bind(this));
        this.route.post('/add-parcel', this.createParcel.bind(this));
        this.route.get('/get-parcels/:apartment_id', this.getParcels.bind(this));

    }
}

module.exports = new LogRouter().route;
