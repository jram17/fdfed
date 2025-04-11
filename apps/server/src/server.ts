import { app } from ".";


class Server {
    constructor(){
    }

    start(){
        app.server();
    }
    
}

const server = new Server();
server.start();
