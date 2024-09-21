const express = require('express');
const { jwt_authenticate } = require("../middlewares/PassportLogin");
require("../config/passport_config");
const RoomDetails = require("../Controllers/RoomDetailsController");
class RoomDetailsRouter extends RoomDetails {
    constructor() {
        super();
        this.route = express.Router();
        this.route.use(jwt_authenticate);

        this.route.get('/:apartment_id', this.fetchDetails.bind(this));


    }
}

module.exports = new RoomDetailsRouter().route;
