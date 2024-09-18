const mongoose = require('mongoose');

const ApartmentUserSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: { type: String, required: true },
    flat_id: { type: String, default: '001' },
    user_designation: { type: String, required: true }


}, { timestamps: true });

const Apartment = mongoose.model('ApartmentUser', ApartmentUserSchema);

module.exports = Apartment;
