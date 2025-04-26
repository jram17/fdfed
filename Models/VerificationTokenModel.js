const mongoose = require("mongoose");

// Define the schema
const VerificationSchema = new mongoose.Schema(
  {
    userermail: {
      type: String,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
      trim: true,
      index: true, // Index the email field
    },
    apartment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartments",
      required: true,
      index: true,
    },
    token: String,
    expiresOn: Date,
  },
  { timestamps: true },
);
VerificationSchema.index({ useremail: 1, apartment_id: 1 });
const Verification =
  mongoose.models.Verification ||
  mongoose.model("Verifications", VerificationSchema);

module.exports = Verification;
