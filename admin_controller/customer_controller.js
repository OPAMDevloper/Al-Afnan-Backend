const { getAll } = require("../fronted_controller/product_controller");
const { configurePagination, paginate } = require("../helpers/pagninateHelper");
const User = require("../models/User");
const ApiResponse = require("../response/ApiResponse");
const ErrorRespnse = require("../response/error_response");

const CustomerController = {
    async getAll(req, res, next) {
        try {
            // get all customers expect trash
            // const customers = await User.find({ deletedAt: null });
            const query = {
                deletedAt: null
            }
            const options = configurePagination(req , query);
            const customers = await paginate(User, options);
            res.status(200).json(new ApiResponse(200, 'Customers fetched successfully', customers));    
        } catch (error) {
            console.log('error', error);
            
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },

    async  getById(req, res, next) { 
        try {
            if(req.params.id === undefined) {
                return res.status(400).json(new ErrorRespnse(400, 'Customer id is required'));
            }
            const customer = await User.findById(req.params.id);
            res.status(200).json(new ApiResponse(200, 'Customer fetched successfully', customer));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },

    async trash(req, res, next) {
        try {
            if(req.params.id === undefined) {
                return res.status(400).json(new ErrorRespnse(400, 'Customer id is required'));
            }

            const customer = await User.findById(req.params.id);
            customer.deletedAt = Date.now();
            await customer.save();
            res.status(200).json(new ApiResponse(200, 'Customer fetched successfully', customer));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },

    async getTrash(req, res, next) {
        try {

            // const customers = await User.find({ deletedAt: { $ne: null } });
            // use pagination
            const query = {
                deletedAt: { $ne: null }
            }
            const options = configurePagination(req , query);
            const customers = await paginate(User, options);
            res.status(200).json(new ApiResponse(200, 'Customers fetched successfully', customers));
        } catch (error) {   
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },  

    async delete(req, res, next) {
        try {
            if(req.params.id === undefined) {
                return res.status(400).json(new ErrorRespnse(400, 'Customer id is required'));
            }
            const customer = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(new ApiResponse(200, 'Customer deleted successfully', customer));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },
    async restore(req, res, next) {
        try {
            if(req.params.id === undefined) {
                return res.status(400).json(new ErrorRespnse(400, 'Customer id is required'));
            }
            const customer = await User.findById(req.params.id);
            customer.deletedAt = null;
            await customer.save();
            res.status(200).json(new ApiResponse(200, 'Customer fetched successfully', customer));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    }
}
module.exports = CustomerController;    