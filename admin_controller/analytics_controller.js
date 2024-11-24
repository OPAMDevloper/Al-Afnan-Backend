const { saveImages } = require('../helpers/fileUploadHelper');
const { paginate, configurePagination } = require('../helpers/pagninateHelper');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User'); // Imported User model for new user count
const ApiResponse = require('../response/ApiResponse');
const ErrorRespnse = require('../response/error_response');
const moment = require('moment');

// Get Monthly Sales

// Get Monthly Sales// Get Monthly Sales
exports.getMonthlySales = async (req, res, next) => {
    try {
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalSales: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        const categories = [];
        const salesData = [];
        let totalSales = 0;  // Variable to store total sales

        // Ensure every month has data, even if the sales are 0 for that month
        for (let month = 1; month <= 12; month++) {
            const salesForMonth = monthlySales.find(item => item._id.month === month);
            categories.push(moment().month(month - 1).format('MMM'));  // Month name (Jan, Feb, etc.)

            // If sales data exists for the month, use it, otherwise set it to 0
            const monthlySale = salesForMonth ? salesForMonth.totalSales : 0;
            salesData.push(monthlySale);
            totalSales += monthlySale;  // Add to the total sales
        }

        const result = {
            categories,        // Months of the year (Jan, Feb, etc.)
            series: salesData, // Monthly sales data
            total: totalSales  // Total sales
        };

        res.status(200).json(new ApiResponse(200, 'Monthly Sales Data', result));
    } catch (error) {
        console.error("Error fetching monthly sales:", error);
        res.status(500).json(new ErrorRespnse(500, 'Error fetching monthly sales data', error.message));
    }
};


// Get New Users


// Get New Users
exports.getNewUsers = async (req, res, next) => {
    try {
        const newUserStats = await User.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    newUsers: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        const categories = [];
        const userData = [];
        let totalUsers = 0;  // Variable to store total new users

        // Ensure every month has data, even if the user count is 0 for that month
        for (let month = 1; month <= 12; month++) {
            const userForMonth = newUserStats.find(item => item._id.month === month);
            categories.push(moment().month(month - 1).format('MMM'));  // Month name (Jan, Feb, etc.)

            // If user data exists for the month, use it, otherwise set it to 0
            const monthlyUsers = userForMonth ? userForMonth.newUsers : 0;
            userData.push(monthlyUsers);
            totalUsers += monthlyUsers;  // Add to the total new users
        }

        const result = {
            categories,        // Months of the year (Jan, Feb, etc.)
            series: userData,  // New users data
            total: totalUsers  // Total new users
        };

        res.status(200).json(new ApiResponse(200, 'New Users Data', result));
    } catch (error) {
        console.error("Error fetching new users:", error);
        res.status(500).json(new ErrorRespnse(500, 'Error fetching new users data', error.message));
    }
};

// Get Monthly Revenue
exports.getMonthlyRevenue = async (req, res, next) => {
    try {
        const monthlyRevenue = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalRevenue: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        const categories = [];
        const revenueData = [];
        let totalRevenue = 0;  // Variable to store total revenue

        // Ensure every month has data, even if the revenue is 0 for that month
        for (let month = 1; month <= 12; month++) {
            const revenueForMonth = monthlyRevenue.find(item => item._id.month === month);
            categories.push(moment().month(month - 1).format('MMM'));  // Month name (Jan, Feb, etc.)

            // If revenue data exists for the month, use it, otherwise set it to 0
            const monthlyRevenueAmount = revenueForMonth ? revenueForMonth.totalRevenue : 0;
            revenueData.push(monthlyRevenueAmount);
            totalRevenue += monthlyRevenueAmount;  // Add to the total revenue
        }

        const result = {
            categories,        // Months of the year (Jan, Feb, etc.)
            series: revenueData, // Monthly revenue data
            total: totalRevenue  // Total revenue
        };

        res.status(200).json(new ApiResponse(200, 'Monthly Revenue Data', result));
    } catch (error) {
        console.error("Error fetching monthly revenue:", error);
        res.status(500).json(new ErrorRespnse(500, 'Error fetching monthly revenue data', error.message));
    }
};
