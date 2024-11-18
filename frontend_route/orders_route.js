// routes/orderRoutes.js
const express = require('express');
const {
    createOrder,
    getOrders,
    getOrderById,
    deleteOrder,
    updateOrderStatus
} = require('../fronted_controller/orders_contrller');
const { authenticationVerifier } = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/create', authenticationVerifier, createOrder);
router.get('/', authenticationVerifier, getOrders);
router.get('/:id', authenticationVerifier, getOrderById);
router.delete('/:id', deleteOrder);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
