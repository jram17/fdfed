const mongoose = require('mongoose');

const CalendarEventSchema = new mongoose.Schema({
    apartment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment',
        required: true
    },
    events: [{
        event: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }],
}, { timestamps: true });

const CalendarEvent = mongoose.model('CalendarEvent', CalendarEventSchema);

module.exports = CalendarEvent;
