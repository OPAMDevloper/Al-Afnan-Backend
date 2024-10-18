const categoryContrller = require('../admin_controller/category_controller');
const { authenticationVerifier } = require('../middlewares/verifyToken');

const router = require('express').Router();



router.post('/create', authenticationVerifier, categoryContrller.create);
router.post('/update/:id', authenticationVerifier, categoryContrller.updateCategory);
router.delete('/delete/:id', authenticationVerifier, categoryContrller.deleteCategory);
router.get('/all', authenticationVerifier, categoryContrller.getAllCategories);
router.get('/show/:id', authenticationVerifier, categoryContrller.getCategoryById);

module.exports = router;