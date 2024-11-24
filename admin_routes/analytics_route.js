const express = require('express');
const router = express.Router();
const adminController = require('../admin_controller/analytics_controller'); // Import adminController

// Route to get Monthly Sales Data
router.get('/monthly-sales', adminController.getMonthlySales);

// Route to get New Users Data
router.get('/new-users', adminController.getNewUsers);

// Route to get Monthly Revenue Data
router.get('/monthly-revenue', adminController.getMonthlyRevenue);

module.exports = router;
