// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../admin_controller/customer_controller');
const { authenticationVerifier } = require('../middlewares/verifyToken');
const multer = require('multer');
// const storage = multer.memoryStorage(); 
const upload = multer({ storage: multer.memoryStorage() });
 
router.get('/all', authenticationVerifier, adminController.getAll);
router.get('/show/:id', authenticationVerifier, adminController.getById);


// add route for trash and delete and restore
router.post('/trash/:id', authenticationVerifier, adminController.trash);
router.get('/show/trash/all', authenticationVerifier, adminController.getTrash);
router.delete('/delete/:id', authenticationVerifier, adminController.delete);
// router.put('/restore/:id', authenticationVerifier, adminController.restore);

// router.post('/create', upload.single('profileImage'), authenticationVerifier, adminController.add);
// router.put('/update/:id', upload.single('profileImage'), authenticationVerifier, adminController.update);


module.exports = router;
