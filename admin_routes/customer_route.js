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

router.post('/create', upload.single('profileImage'), authenticationVerifier, adminController.create);
router.post('/update/:id', upload.single('profileImage'), authenticationVerifier, adminController.update);

// add route for trash and delete and restore
router.post('/trash-many', authenticationVerifier, adminController.trashMany);
router.post('/restore-many', authenticationVerifier, adminController.restoreMany);
router.delete('/delete-many', authenticationVerifier, adminController.deleteMany);
router.post('/update-password/:id', authenticationVerifier, adminController.updatePassword);

router.get('/show/trash/all', authenticationVerifier, adminController.getTrash);
// router.put('/restore/:id', authenticationVerifier, adminController.restore);

// router.post('/create', upload.single('profileImage'), authenticationVerifier, adminController.add);
// router.put('/update/:id', upload.single('profileImage'), authenticationVerifier, adminController.update);


module.exports = router;
