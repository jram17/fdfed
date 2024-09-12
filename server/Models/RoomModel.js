const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    apartment_name: String,
    address: String,
    apartment_id: String,
    phone_number: String,
    super_user_id: { type: [String], default: null },
}, { timestamps: true });

const Apartment = mongoose.model('Apartment', ApartmentSchema);

module.exports = Apartment;
