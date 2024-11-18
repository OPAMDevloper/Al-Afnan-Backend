// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../admin_controller/orders_controller');
const { authenticationVerifier } = require('../middlewares/verifyToken');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/all', authenticationVerifier, adminController.getAllOrders);
router.get('/show/:id', authenticationVerifier, adminController.getOrderDetails);
router.post('/update/:id', authenticationVerifier, adminController.updateOrder);


module.exports = router;
