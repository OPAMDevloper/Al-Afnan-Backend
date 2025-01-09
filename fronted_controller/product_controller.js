
const { configurePagination, paginate } = require('../helpers/pagninateHelper');
const Model = require('../models/Product');
const ApiResponse = require('../response/ApiResponse');
const ErrorRespnse = require('../response/error_response');


const ProductController = {
    getAll: async (req, res) => {
        try {


            const options = configurePagination(req);
            const products = await paginate(Model, options);
            res.status(200).json(new ApiResponse(200, 'Products fetched successfully', products));
        } catch (error) {
            console.log('error', error);
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },

    showAll: async (req, res) => {
        try {
            if (req.params.id === undefined) {
                return res.status(400).json(new ErrorRespnse(400, 'Product id is required'));
            }
            const products = await Model.findOne({ _id: req.params.id });
            res.status(200).json(new ApiResponse(200, 'Products fetched successfully', products));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },

    //get featured product
    getFeatured: async (req, res) => {
        try {
            const products = await Model.find({ isFeatured: true });
            res.status(200).json(new ApiResponse(200, 'Products fetched successfully', products));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },

    // get by category 
    getByCategroy: async (req, res) => {
        try {

            if (!req.params.id) {
                res.status(400).json(new ErrorRespnse(400, 'Please provide cagtegory Id', error));


            }
            const product = await Model.find({
                category: req.params.id
            });

            res.status(200).json(new ApiResponse(200, 'Products fetched successfully', product));

        } catch (e) {

            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));

        }
    },


}

module.exports = ProductController