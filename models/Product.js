// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    images: {
        type: [String],
        required: false,
    },
    category: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
