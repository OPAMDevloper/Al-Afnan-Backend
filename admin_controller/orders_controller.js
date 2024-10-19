// controllers/adminController.js
const { saveImages } = require('../helpers/fileUploadHelper');
const { paginate, configurePagination } = require('../helpers/pagninateHelper');
const Order = require('../models/Order');
const ApiResponse = require('../response/ApiResponse');
const ErrorRespnse = require('../response/error_response');



// Update a product
exports.updateOrder = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json(new ErrorRespnse(400, 'Product id is required'));
        }
        const product = await Order.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });


        const updatedProduct = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(new ApiResponse(200, 'Order updated successfully', updatedProduct));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};

// Get all products
exports.getAllOrders = async (req, res) => {
    try {
        // const products = await Product.find();
        const query = {
            deletedAt: null
        }
        const options = configurePagination(req, query);
        const Orders = await paginate(Order, options);
        res.status(200).json(new ApiResponse(200, 'order fetched successfully', orders));
    } catch (error) {
        // res.status(500).json({ error: error.message });
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};

// Get a single product
exports.getOrderDetails = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json(new ErrorRespnse(400, 'Product id is required'));
        }
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(new ApiResponse(200, 'Product fetched successfully', order));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};
