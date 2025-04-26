const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    apartment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartments",
      index: true,
    },
    apartmentuser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApartmentUsers",
      index: true,
    },
    entrytime: {
      type: Date,
    },
    exittime: {
      type: Date,
    },
    masterguestemail: String,
    otp: {
      type: String,
      maxlength: 6,
    },
    expiresOn: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
); // Automatically adds createdAt and updatedAt timestamps

LogSchema.index({ apartment_id: 1, apartmentuser: 1 });
const Log = mongoose.model("ResidentLog", LogSchema);

module.exports = Log;
