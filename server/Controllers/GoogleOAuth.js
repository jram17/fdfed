const passport = require("passport");
const express = require("express");
const route = express.Router();
const CLIENT_URL = "http://localhost:5173/";
const FALLBACK_URL = "http://localhost:5173/sign-in";
const issueJWT = require("../utils/jwtUtils");
route.get('/',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email']
    }));

route.get('/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        if (req.user) {
            const { token } = issueJWT(req.user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24
            });
            res.redirect(CLIENT_URL);
        } else {
            res.redirect(FALLBACK_URL);
        }
    });
module.exports = route;