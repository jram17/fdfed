const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: "user" },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    lastLogin: { type: Date, required: true, default: Date.now },
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
    confirmationToken: { type: String },
    confirmationTokenExpires: { type: Date },
    profile: {
        name: { type: String },
        picture: { type: String },
        bio: { type: String },
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
