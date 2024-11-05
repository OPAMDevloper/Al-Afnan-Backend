
const mongoose = require('mongoose');

const AdminSchmea = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    roles: {
        type: [String],

        default: "admin"
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
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Admin', AdminSchmea);