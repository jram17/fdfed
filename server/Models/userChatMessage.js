const mongoose = require('mongoose');

const messageSchema=new mongoose.Schema({
    userId:String,
    msg:String,
    to:String,
    aptId:String,
    timestamp:{type:Date,default:Date.now}
});

const Message=mongoose.model('Message',messageSchema);
module.exports=Message;