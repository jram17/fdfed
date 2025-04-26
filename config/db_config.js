const mongoose = require('mongoose');
const logger = require('./logger')


class DbConfig {
    constructor(mongoUri) {
        this.mongoUri = mongoUri;
    }
    async DbConnect() {
        try {
            await mongoose.connect(this.mongoUri);
            logger.info(`Connected to Mongodb Database`);


        } catch (error) {
            logger.error(`Failed to connect to Mongodb`);
        }
    }
}
module.exports = DbConfig;
