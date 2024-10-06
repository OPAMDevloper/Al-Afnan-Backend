// controllers/orderController.js
const Order = require('../models/Order');

// Create an order
const createOrder = async (req, res) => {
    const { userId, products, amount, address } = req.body; // Expecting userId, products, amount, address

    // Validate request
    if (!userId || !Array.isArray(products) || products.length === 0 || !amount || !address) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newOrder = new Order({ userId, products, amount, address });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    deleteOrder,
    updateOrderStatus
};
