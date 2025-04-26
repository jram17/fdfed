const mongoose = require('mongoose');

// Define the schema
const ApartmentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ownername: String,
    cover_pic_url : String , 
    apartment_name: String,
    address: String,
    apartment_id: String,
    unique_id:String,
    state: String,
    pincode: String,
    registration_num: String,
    emergency_email: String,
    subscription: String,
    subscriptionStatus: String,
    subscriptionId: String,
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    is_archived: { type: Boolean, default: false },

}, { timestamps: true });

// Check if the model already exists before defining it
const Apartment = mongoose.models.Apartments || mongoose.model('Apartments', ApartmentSchema);

module.exports = Apartment;
