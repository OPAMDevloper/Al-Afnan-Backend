// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../admin_controller/orders_controller');
const { authenticationVerifier } = require('../middlewares/verifyToken');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/all', authenticationVerifier, orderController.getAllOrders);
router.get('/show/:id', authenticationVerifier, orderController.getOrderDetails);
router.post('/update/:id', authenticationVerifier, orderController.updateOrder);


router.get('/shipments/:trackingNumber/track', orderController.trackShipment);
router.get('/shipments/:trackingNumber/status', orderController.getShipmentStatus);
module.exports = router;
