
const Country = require('../models/country');
const ApiResponse = require('../response/ApiResponse');
const ErrorRespnse = require('../response/error_response');

const CountryContrller = {
    async create(req, res, next) {
        try {

            console.log('req.body', req.body);
            const country = await Country.create(req.body);
            return res.status(201).json(new ApiResponse(201, 'country created successfully', country));
        } catch (error) {
            return res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error.message));
        }
    },
    async updatecountry(req, res, next) {
        try {
            const country = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json(new ApiResponse(200, 'country updated successfully', country));
        } catch (error) {
            return res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error.message));
        }
    },
    async deletecountry(req, res, next) {
        try {
            const country = await Country.findByIdAndDelete(req.params.id);
            return res.status(200).json(new ApiResponse(200, 'country deleted successfully', country));
        } catch (error) {
            return res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error.message));
        }
    },
    async getAllCategories(req, res, next) {
        try {
            const categories = await Country.find();
            return res.status(200).json(new ApiResponse(200, 'Categories fetched successfully', categories));
        } catch (error) {
            return res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error.message));
        }
    },

    async getcountryById(req, res, next) {
        try {
            const country = await Country.findById(req.params.id);
            return res.status(200).json(new ApiResponse(200, 'country fetched successfully', country));
        } catch (error) {
            return res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error.message));
        }
    }
}
module.exports = CountryContrller;
