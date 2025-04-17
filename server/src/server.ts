import { app } from ".";
class Server {
    start(){
        app.server();
    }
}

const server = new Server();
server.start();
