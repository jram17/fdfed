const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Models/UserModel");
const { verifyPassword } = require("../utils/passwordUtils.js");
const cookieParser = require("cookie-parser");
passport.use(cookieParser());
var JwtStrategy = require('passport-jwt').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require('uuid');

const { generateHash } = require("../utils/passwordUtils");
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
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true

},
    async function (request, accessToken, refreshToken, profile, cb) {
        const email = profile._json.email;
        const user = await User.findOne({ email: email });
        const username = profile.displayName;
        if (user) {
            if (user.isGoogleId) {
                return cb(null, user);
            } else {
                return cb("Already manually logged in", false);
            }
        } else {
            const { hash } = generateHash(profile.id);
            const uuid = uuidv4();

            const newUser = new User({
                username: username,
                email: email,
                uuid: uuid,
                password_hash: hash,
                isGoogleId: true,
                googleId: profile.id
            });
            await newUser.save();
            return cb(null, newUser);
        }
    }
));
passport.use(strategy);
