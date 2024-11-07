// routes/orderRoutes.js
const express = require('express');
const {
    getBlogs,
    getBlogById
} = require('../fronted_controller/blog_controller');

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);


module.exports = router;
