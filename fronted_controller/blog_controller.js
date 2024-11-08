// controllers/orderController.js
const { configurePagination, paginate } = require('../helpers/pagninateHelper');
const Blogs = require('../models/Blogs');
const ApiResponse = require('../response/ApiResponse');



// Get all orders
const getBlogs = async (req, res) => {
    try {

        const query = {
            deletedAt: null
        }
        const options = configurePagination(req, query);
        const blog = await paginate(Blogs, options);
        res.status(200).json(new ApiResponse(200, 'Blogs fetched successfully', blog));
    } catch (error) {
        console.log('error in', error);
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

// Get a specific order by ID
const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blogs.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(new ApiResponse(200, 'Blog fetched successfully', blog));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};

module.exports = {
    getBlogs,
    getBlogById,
};
