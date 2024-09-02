const passport = require("passport");
const express = require("express");
const route = express.Router();
const { google } = require("../middlewares/PassportLogin");
route.get('/',
    passport.authenticate('google', { scope: ['profile'] }));

route.get('/callback', google
    ,
    function (req, res) {
        res.status(200).json({ message: "successful login" });
    });
module.exports = route;