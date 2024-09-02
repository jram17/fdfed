const passport = require('passport');
const issueJWT = require("../utils/jwtUtils");
require("dotenv").config();
const login = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(400).json({ message: info });
        }
        if (!user) {
            return res.status(400).json({ message: info });
        } if (user) {
            const { token } = issueJWT(user);
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24
            });
            next();
        }
    })(req, res, next);
}
const CLIENT_URL = "http://localhost:5173/";
const FALLBACK_URL = "http://localhost:5173/sign-in";
const jwt_authenticate = async (req, res, next) => {
    passport.authenticate('jwt', (error, id, info) => {
        if (error) {
            return res.status(500).json({ message: info.message });
        };
        if (!id) {
            return res.redirect("/user/login")
        };
        req.id = id;
        next();
    })(req, res, next);
}

module.exports = { login, jwt_authenticate };