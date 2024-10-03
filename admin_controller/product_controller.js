// controllers/adminController.js
const { saveImages } = require('../helpers/fileUploadHelper');
const Product = require('../models/Product');
const ApiResponse = require('../response/ApiResponse');
const ErrorRespnse = require('../response/error_response');

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const savedPaths = saveImages(req.files);
        req.body.images = savedPaths;
        const product = new Product(req.body);
        const data = await product.save();
        // const product = new Product(req.body);
        // await product.save();
        res.status(201).json(new ApiResponse(201, 'Product has been created successfuly', data));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json(new ErrorRespnse(400, 'Product id is required'));
        }
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        Object.assign(product, req.body); // Update product fields
        await product.save();
        // res.json();
        res.status(200).json(new ApiResponse(200, 'Product updated successfully', product));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json(new ErrorRespnse(400, 'Product id is required'));
        }
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // res.json({ message: 'Product deleted successfully' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        // res.status(400).json({ error: error.message });
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));

    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        // res.json(products);
        res.status(200).json(new ApiResponse(200, 'Products fetched successfully', products));
    } catch (error) {
        // res.status(500).json({ error: error.message });
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};

// Get a single product
exports.getProduct = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json(new ErrorRespnse(400, 'Product id is required'));
        }
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(new ApiResponse(200, 'Product fetched successfully', product));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};
