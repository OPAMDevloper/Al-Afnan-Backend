// controllers/orderController.js
const { configurePagination, paginate } = require('../helpers/pagninateHelper');
const Category = require('../models/Category');
const ApiResponse = require('../response/ApiResponse');



// Get all orders
const getCategory = async (req, res) => {
    try {


        const data = await Category.find({});
        res.status(200).json(new ApiResponse(200, 'Categroy fetched successfully', data));
    } catch (error) {
        console.log('error in', error);
        res.status(500).json({ message: 'Error fetching Category', error });
    }
};


module.exports = {
    getCategory
};
