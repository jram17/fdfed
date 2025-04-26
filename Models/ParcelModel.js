const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema({
  apartmentuser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ApartmentUsers",
    required: true,
  },
  apartment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartments",
    index: true,
  },
  parcelReachedTime: String,
  parcelType: { type: String, enum: ["Normal", "Fragile"] },
  senderAddress: String,
  status: {
    type: String,
    enum: ["Not Taken", "Acknowledged"],
    default: "Not Taken",
  },
});
parcelSchema.index({ apartmentuser: 1, apartment_id: 1,parcelType:1 });
parcelSchema.index({  apartment_id: 1,parcelType:1 });
const Parcel = mongoose.model("Parcel", parcelSchema);

module.exports = Parcel;
