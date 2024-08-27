const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const Auth = require("./Controllers/User");
const Account = require("./Controllers/account");//+
const GoogleStrategy = require("./Controllers/GoogleOAuth");
const cookieParser = require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
const passport = require('passport');
app.use(bodyParser.json());
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

require('./config/passport_config');
app.use('/user', Auth);
app.use('/account', Account);
app.use('/auth/google', GoogleStrategy);
module.exports = app;
