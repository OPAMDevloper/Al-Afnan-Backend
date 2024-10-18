
const mongoose = require('mongoose');

const AdminSchmea = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Admin', AdminSchmea);