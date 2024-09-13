const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const Auth = require('./Routes/UserAuthRouter');
const Account = require('./Controllers/account');
const GoogleStrategy = require('./Routes/GoogleAuthRouter');
const JwtVerifyRouter = require("./Routes/JwtVerifyRouter");
class App {
    constructor() {
        this.app = express();
        this.setMiddleware();
        this.setRoutes();
    }

    setMiddleware() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(cookieParser());

        this.app.use(passport.initialize());


        const corsOptions = {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
            optionSuccessStatus: 200,
        };
        this.app.use(cors(corsOptions));
        this.app.options('*', cors(corsOptions));

        require('./config/passport_config');
    }

    setRoutes() {
        this.app.use('/user', Auth);
        this.app.use('/account', Account);
        this.app.use('/auth/google', GoogleStrategy);
        this.app.use('/jwtVerify', JwtVerifyRouter);
    }

    start(port) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

module.exports = App;
