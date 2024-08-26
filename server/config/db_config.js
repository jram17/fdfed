const mongoose = require('mongoose');
require('dotenv').config();


module.exports = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to Mongodb database`);


    } catch (error) {
        console.log(`Failed to connect to Mongodb`);
    }
}