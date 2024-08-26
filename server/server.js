const app = require(".");
const connect = require("./config/db_config");
const initialize = async () => {
    try {
        await connect();
        app.listen(5000, () => {
            console.log("Server started on port 5000");
        });
    } catch (error) {
        console.log("Error: ", error);
    }
}

initialize();