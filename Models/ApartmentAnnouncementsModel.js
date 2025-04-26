const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
    {
        apartmentuser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ApartmentUser",
            required: true,
        },
        apartment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Apartments",
            required: true,
        },
        announcement_msg: { type: String, required: true },
        fileUrl: { type: String },
        filename: { type: String },
        timestamp: { type: Date, default: Date.now },
    },
    { timestamps: true },
);

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

module.exports = Announcement;
