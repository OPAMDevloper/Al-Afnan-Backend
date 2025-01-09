const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    deletedAt: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["active", "inactive", 'blocked'],
        default: "active"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: Number,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },

    ip: {
        type: String,
    },
    country: {
        type: String,
    },
    browser: {
        type: String,
    },
    device: {
        type: String,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);