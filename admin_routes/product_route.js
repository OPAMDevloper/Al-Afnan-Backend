// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../admin_controller/product_controller');
const { authenticationVerifier } = require('../middlewares/verifyToken');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
]), authenticationVerifier, adminController.addProduct);
router.post('/update/:id', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
]), authenticationVerifier, adminController.updateProduct);
router.delete('/delete/:id', authenticationVerifier, adminController.deleteProduct);
router.get('/all', authenticationVerifier, adminController.getAllProducts);
router.get('/show/:id', authenticationVerifier, adminController.getProduct);

module.exports = router;
