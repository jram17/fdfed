const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const Auth = require("./Controllers/User");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
const passport = require('passport');
app.use(bodyParser.json());
app.use(express.json());
app.use(passport.initialize());
require('./config/passport_config');
app.use('/user', Auth);

module.exports = app;
