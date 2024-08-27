const express = require("express");
const route = express.Router();
const { jwt_authenticate } = require("../middlewares/PassportLogin");
route.use(jwt_authenticate);
route.get('/', (req, res) => {
    res.send("Welcome to the API");
});

module.exports = route;