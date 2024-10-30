// models/Product.js
const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    image: {
        type: String,
        required: false,
    },
    gallery: {
        type: [String],
        required: false,
    },
    deletedAt: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'

    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Blogs = mongoose.model('Blogs', blogsSchema);

module.exports = Blogs;
