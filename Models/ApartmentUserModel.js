const mongoose = require("mongoose");

const ApartmentUserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    flat_id: { type: String, default: "001" },
    role: {
      type: String,
      enum: ["Owner", "Security", "Authority", "Resident"], // allowed values
      required: true,
    },
    apartment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);
ApartmentUserSchema.index({ user: 1, apartment_id: 1 });
const Apartment = mongoose.model("ApartmentUser", ApartmentUserSchema);

module.exports = Apartment;
