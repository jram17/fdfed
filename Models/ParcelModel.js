const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema({
    apartmentuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ApartmentUser",
        required: true,
    },
    apartment_id: String,
    parcelReachedTime: String,
    parcelType: { type: String, enum: ["Normal", "Fragile"] },
    senderAddress: String,
    status: {
        type: String,
        enum: ["Not Taken", "Acknowledged"],
        default: "Not Taken",
    },
});

const Parcel = mongoose.model("Parcel", parcelSchema);

module.exports = Parcel;
