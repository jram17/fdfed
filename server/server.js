const App = require(".");
const DbConfig = require("./config/db_config");
require("dotenv").config();

class Server {
    constructor() {
        this.appInstance = new App();
        this.dbConfig = new DbConfig(process.env.MONGO_URI);
        this.port = process.env.PORT || 3000;
    }

    async initialize() {
        try {
            await this.dbConfig.DbConnect();
            this.appInstance.start(this.port);
        } catch (error) {
            console.error("Error during server initialization:", error);
        }
    }
}
new Server().initialize();
