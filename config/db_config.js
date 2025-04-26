const mongoose = require('mongoose');
const redis = require('redis');
const { default: logger } = require('./logger');


class DbConfig {
    constructor(mongoUri,redisUri) {
        this.redisUri=redisUri;
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
