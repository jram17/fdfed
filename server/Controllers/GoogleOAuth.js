const passport = require("passport");
const express = require("express");
const route = express.Router();
const CLIENT_URL = "http://localhost:5173/";
const FALLBACK_URL = "http://localhost:5173/sign-in";
route.get('/',
    passport.authenticate('google', { scope: ['profile'] }));

route.get('/callback', passport.authenticate("google", {
    session: false,
    successRedirect: CLIENT_URL,
    failureRedirect: FALLBACK_URL,
}),
    function (req, res) {
        res.status(200).json({ message: "successful login" });
    });
module.exports = route;