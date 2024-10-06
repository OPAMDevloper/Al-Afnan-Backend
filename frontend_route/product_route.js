

const express = require('express');
const ProductController = require('../fronted_controller/product_controller');
const   router = express.Router();


// router.get('/show/:id', ProductController.());
router.get('/all', ProductController.getAll);
router.get('/show/:id', ProductController.showAll);
module.exports = router;