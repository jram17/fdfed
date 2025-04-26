const express = require("express");
const { jwt_authenticate } = require("../middlewares/PassportLoginMiddleware");
const JoinRoom = require("../Controllers/JoinRoom");
require("../config/passport_config");

class JoinRoomRouter extends JoinRoom {
  constructor() {
    super();
    this.route = express.Router();
    this.route.use(jwt_authenticate);

    this.route.post("/", this.joinroom.bind(this));
    this.route.post("/invite", this.sentinvitation.bind(this));
    this.route.get(
      "/apartment-pending-invites/:apartment_id",
      this.pendinginvites.bind(this),
    );
    this.route.get(
      "/user-pending-invites/:email",
      this.pendinguserinvites.bind(this),
    );
  }
}

module.exports = new JoinRoomRouter().route;
