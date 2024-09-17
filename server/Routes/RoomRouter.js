const express = require('express');
const { jwt_authenticate } = require("../middlewares/PassportLogin");
require("../config/passport_config");
const Room = require("../Controllers/Room");
class RoomRouter extends Room {
    constructor() {
        super();
        this.route = express.Router();
        this.route.use(jwt_authenticate);

        this.route.post('/', this.userRooms.bind(this));


    }
}

module.exports = new RoomRouter().route;