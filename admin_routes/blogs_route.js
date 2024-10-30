// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../admin_controller/blogs_controller');
const { authenticationVerifier } = require('../middlewares/verifyToken');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
]), authenticationVerifier, adminController.addBlogs);
router.post('/update/:id', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
]), authenticationVerifier, adminController.updateBlog);
router.delete('/delete/:id', authenticationVerifier, adminController.deleteBlog);
router.get('/all', authenticationVerifier, adminController.getAllBlogs);
router.get('/show/:id', authenticationVerifier, adminController.getBlogs);





router.post('/trash-many', authenticationVerifier, adminController.trashMany);
router.post('/restore-many', authenticationVerifier, adminController.restoreMany);
router.delete('/delete-many', authenticationVerifier, adminController.deleteMany);
router.get('/show/trash/all', authenticationVerifier, adminController.getTrash);

module.exports = router;
