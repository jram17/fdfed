const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Models/UserModel");
const { verifyPassword } = require("../utils/passwordUtils.js");

const customFields = {
    usernameField: 'identifier',
    passwordField: 'password',
};

const VerifyUser = (username, password, done) => {
    console.log(username);
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
    }).catch(err => done(err));
}

const strategy = new LocalStrategy(customFields, VerifyUser);

passport.use(strategy);
