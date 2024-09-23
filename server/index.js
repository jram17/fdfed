const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const Iointialize = require('./Controllers/socket');
const Auth = require('./Routes/UserAuthRouter');
const Account = require('./Controllers/account');
const GoogleStrategy = require('./Routes/GoogleAuthRouter');
const JwtVerifyRouter = require("./Routes/JwtVerifyRouter");
const CreateRoom = require("./Routes/CreateRoomRouter");
const Rooms = require("./Routes/RoomRouter");
const JoinRoom = require("./Routes/JoinRoomRouter");
const RoomDetails = require("./Routes/RoomDetailsRouter");
const CreateRoomComplaint=require("./Routes/UserComplaintRouter");
class App extends Iointialize {
    constructor() {
        super();
        this.cors = {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
            optionSuccessStatus: 200,
        };
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: 'http://localhost:5173',
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                credentials: true
            }
            ,
            connectionStateRecovery: {}
        })
        this.setMiddleware(this.cors);
        this.setRoutes();
        this.initializeSocket();
    }

    setMiddleware(corsOptions) {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(cookieParser());

        this.app.use(passport.initialize());



        this.app.use(cors(corsOptions));
        this.app.options('*', cors(corsOptions));

        require('./config/passport_config');
    }

    setRoutes() {

        this.app.use('/user', Auth);
        this.app.use('/account', Account);
        this.app.use('/auth/google', GoogleStrategy);
        this.app.use('/jwtVerify', JwtVerifyRouter);
        this.app.use('/createRoom', CreateRoom);
        this.app.use('/my-rooms', Rooms);
        this.app.use('/join-room', JoinRoom);
        this.app.use('/room-details', RoomDetails);
        this.app.use('/complaints',CreateRoomComplaint);
    }
    initializeSocket() {
        this.initSocket(this.io);
    }

    start(port) {
        this.server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

module.exports = App;
