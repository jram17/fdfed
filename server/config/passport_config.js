const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Models/UserModel");
const { verifyPassword } = require("../utils/passwordUtils.js");
const cookieParser = require("cookie-parser");
passport.use(cookieParser());
var JwtStrategy = require('passport-jwt').Strategy;
require("dotenv").config();
var cookieExtractor = function (req) {
    var token = null;

    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};
var opts = { secretOrKey: process.env.JWT_SECRET_KEY };
opts.jwtFromRequest = cookieExtractor;
const customFields = {
    usernameField: 'identifier',
    passwordField: 'password',
};

const VerifyUser = (username, password, done) => {
    User.findOne({
        $or: [{ username: username }, { email: username }]
    }).then((user) => {
        if (!user) {
            return done(null, false, { message: 'Incorrect username or email.' });
        }

        const isValid = verifyPassword(password, user.password_hash);
        if (!isValid) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }).catch(err => {
        done(err, false, { message: err.message })
    });
}
passport.use(new JwtStrategy(opts, async (token, done) => {
    if (!token) {
        return done(null, false, { message: "Token is not present" });
    }
    return done(null, token.sub);
}));
const strategy = new LocalStrategy(customFields, VerifyUser);

passport.use(strategy);
