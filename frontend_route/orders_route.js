// routes/orderRoutes.js
const express = require('express');
const {
    createOrder,
    getOrders,
    getOrderById,
    deleteOrder,
    updateOrderStatus
} = require('../fronted_controller/orders_contrller');

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.delete('/:id', deleteOrder);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
