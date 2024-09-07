const express = require('express');
const { login } = require("../middlewares/PassportLogin");
const UserAuth = require("../Controllers/UserAuth");
require("../config/passport_config");

class UserAuthRouter extends UserAuth {
    constructor() {
        super();
        this.route = express.Router();

        this.route.post('/register', this.register.bind(this));

        this.route.post('/login', login, (req, res) => {
            res.status(200).send({ message: "Successful login" });
        });
    }
}

module.exports = new UserAuthRouter().route;
