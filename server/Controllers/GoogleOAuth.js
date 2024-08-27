const passport = require("passport");
const express = require("express");
const route = express.Router();
route.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

route.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });
module.exports = route;