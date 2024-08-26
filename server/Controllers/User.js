const express = require('express');
const route = express.Router();
const passport = require('passport');
const User = require("../Models/UserModel");
const { generateHash } = require("../utils/passwordUtils");
route.use(passport.initialize());
require("../config/passport_config");
route.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ username: username }, { email: email }]
        });

        if (user) {
            return res.status(400).send({ message: "Username or email already in use" });
        }

        const { hash } = generateHash(password);

        const newUser = new User({
            username,
            email,
            password_hash: hash
        });
        await newUser.save();
        res.status(201).redirect('/');
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Server error. Please try again later." });
    }
});
route.post('/login', passport.authenticate('local', { failureRedirect: "/login" }), (req, res) => {
    res.redirect('/');
});

module.exports = route;
