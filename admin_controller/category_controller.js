
const Category = require('../models/Category');
const ApiResponse = require('../response/ApiResponse');
const ErrorRespnse = require('../response/error_response');

const categoryContrller = {
    async create(req, res, next) {
        try {

            console.log('req.body', req.body);
            const category = await Category.create(req.body);
            return res.status(201).json(new ApiResponse(201, 'Category created successfully', category));
        } catch (error) {
            return res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error.message));
        }
    },
    async updateCategory(req, res, next) {
        try {
            const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json(new ApiResponse(200, 'Category updated successfully', category));
        } catch (error) {
            return res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error.message));
        }
    },
    async deleteCategory(req, res, next) {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);
            return res.status(200).json(new ApiResponse(200, 'Category deleted successfully', category));
        } catch (error) {
            return res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error.message));
        }
    },
    async getAllCategories(req, res, next) {
        try {
            const categories = await Category.find();
            return res.status(200).json(new ApiResponse(200, 'Categories fetched successfully', categories));
        } catch (error) {
            return res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error.message));
        }
    },

    async getCategoryById(req, res, next) {
        try {
            const category = await Category.findById(req.params.id);
            return res.status(200).json(new ApiResponse(200, 'Category fetched successfully', category));
        } catch (error) {
            return res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error.message));
        }
    }
}
module.exports = categoryContrller;
