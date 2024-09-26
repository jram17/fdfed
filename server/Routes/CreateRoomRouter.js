const express = require('express');
const { jwt_authenticate } = require("../middlewares/PassportLogin");
const CreateRoom = require("../Controllers/CreateRoom");
require("../config/passport_config");

class CreateRoomRouter extends CreateRoom {
    constructor() {
        super();
        this.route = express.Router();
        this.route.use(jwt_authenticate);

        this.route.post('/', this.createRoomReq.bind(this));
        this.route.put('/edit-email', this.editemail.bind(this));

    }
}

module.exports = new CreateRoomRouter().route;
