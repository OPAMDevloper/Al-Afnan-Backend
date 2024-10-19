// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../admin_controller/product_controller');
const { authenticationVerifier } = require('../middlewares/verifyToken');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/all', authenticationVerifier, adminController.getAllProducts);
router.get('/show/:id', authenticationVerifier, adminController.getProduct);
router.post('/update/:id', authenticationVerifier, adminController.updateProduct);

module.exports = router;
