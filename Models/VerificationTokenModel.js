const mongoose = require('mongoose');

// Define the schema
const VerificationSchema = new mongoose.Schema({
    userermail: String,
    apartment_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Apartments',
        required:true
    },
    token :String,
    expiresOn : Date 
    
}, { timestamps: true });

// Check if the model already exists before defining it
const Verification = mongoose.models.Verification || mongoose.model('Verifications', VerificationSchema);


module.exports = Verification;
