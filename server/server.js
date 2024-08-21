const app = require(".");
const connect = require("./config/db_config");

async function initialize() {
    try {
        await connect();
        app.listen(5000, () => {
            console.log(" Server started on port 5000");
        });

    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1);
    }
}

initialize();
