const { toast } = require("react-toastify");
const { getAll } = require("../fronted_controller/product_controller");
const { configurePagination, paginate } = require("../helpers/pagninateHelper");
const User = require("../models/User");
const ApiResponse = require("../response/ApiResponse");
const ErrorRespnse = require("../response/error_response");
const { saveImages } = require("../helpers/fileUploadHelper");

const CustomerController = {
    async getAll(req, res, next) {
        try {
            // get all customers expect trash
            // const customers = await User.find({ deletedAt: null });
            const query = {
                deletedAt: null
            }
            const options = configurePagination(req, query);
            console.log('optionsssss', options);

            const customers = await paginate(User, options);
            console.log('customers ', customers);

            return res.status(200).json(new ApiResponse(200, 'Customers fetched successfully', customers));
        } catch (error) {
            console.log('error', error);

            return res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },


    async create(req, res, next) {
        try {


            if (!req.body.email || !req.body.name) {
                return res.status(400).json(new ErrorRespnse(400, 'All fields are required'));
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email: req.body.email });

            if (existingUser) {
                return res.status(400).json(new ErrorRespnse(400, 'User already exists'));
            }

            if (req.file) {
                const savedPaths = saveImages(req.file);
                req.body.profileImage = savedPaths[0];
            }

            const customer = await User.create(req.body);
            return res.status(201).json(new ApiResponse(201, 'Customer created successfully', customer));
        } catch (error) {
            return res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error.message));
        }
    },



    async update(req, res, next) {
        try {


            if (req.params.id === undefined) {
                return res.status(400).json(new ErrorRespnse(400, 'Customer id is required'));
            }

            if (req.file) {
                const savedPaths = saveImages(req.file);
                req.body.profileImage = savedPaths[0];
            }
            const customer = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(new ApiResponse(200, 'Customer updated successfully', customer));
        } catch (error) {
            console.log('error', error);

            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },



    async getById(req, res, next) {
        try {
            if (req.params.id === undefined) {
                return res.status(400).json(new ErrorRespnse(400, 'Customer id is required'));
            }
            const customer = await User.findById(req.params.id);
            res.status(200).json(new ApiResponse(200, 'Customer fetched successfully', customer));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },

    async trashMany(req, res, next) {
        try {
            if (req.body.ids === undefined && req.body.ids.length === 0) {
                return res.status(400).json(new ErrorRespnse(400, 'Customer id is required'));
            }
            const customers = await User.updateMany({ _id: { $in: req.body.ids } }, { deletedAt: Date.now() });
            res.status(200).json(new ApiResponse(200, 'Customers deleted successfully', customers));
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
            const options = configurePagination(req, query);
            const customers = await paginate(User, options);
            res.status(200).json(new ApiResponse(200, 'Customers fetched successfully', customers));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },

    async deleteMany(req, res, next) {
        try {
            if (req.body.ids === undefined && req.body.ids.length === 0) {
                return res.status(400).json(new ErrorRespnse(400, 'Customer id is required'));
            }

            console.log('req.body.ids', req.body.ids);


            const customer = await User.findByIdAndDelete(req.body.ids);

            res.status(200).json(new ApiResponse(200, 'Customer deleted successfully', customer));
        } catch (error) {
            console.log('error', error);

            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },
    async restoreMany(req, res, next) {
        try {
            if (req.body.ids === undefined && req.body.ids.length === 0) {
                return res.status(400).json(new ErrorRespnse(400, 'Customer id is required'));
            }
            const customers = await User.updateMany({ _id: { $in: req.body.ids } }, { deletedAt: null });
            res.status(200).json(new ApiResponse(200, 'Customers restored successfully', customers));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },


    async updatePassword(req, res, next) {
        try {
            if (req.params.id === undefined) {
                return res.status(400).json(new ErrorRespnse(400, 'Customer id is required'));
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const customer = await User.findByIdAndUpdate(req.params.id, { password: hashPassword }, { new: true });
            res.status(200).json(new ApiResponse(200, 'Customer updated successfully', customer));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    }
}
module.exports = CustomerController;    