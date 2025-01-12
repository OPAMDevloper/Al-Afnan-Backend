// routes/orderRoutes.js
const express = require('express');
// const {

const { authenticationVerifier } = require('../middlewares/verifyToken');
const { getCategory } = require('../fronted_controller/categroyController');

const router = express.Router();

router.get('/', getCategory);

module.exports = router;
