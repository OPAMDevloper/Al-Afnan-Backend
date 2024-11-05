// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    price: {
        type: Number,
        min: 0,
    },
    discountPrice: {
        type: Number,
        min: 0,
        default: 0,
    },
    quantity: {
        type: Number,
        min: 0,
    },
    image: {
        type: String,
        required: false,
    },
    gallery: {
        type: [String],
        required: false,
    },
    category:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'

    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
productSchema.pre(['find', 'findOne'], function () {
    this.populate('category');
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
