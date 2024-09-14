const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ownername: String,
    apartment_name: String,
    address: String,
    apartment_id: String,
    state: String,
    pincode: String,
    registration_num: String,
    emergency_email: String,
    subscription: String,
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    is_archived: { type: Boolean, default: false },

    super_user_id: { type: [String], default: null },
}, { timestamps: true });

const Apartment = mongoose.model('Apartment', ApartmentSchema);

module.exports = Apartment;
