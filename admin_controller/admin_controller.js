const { toast } = require("react-toastify");
const { getAll } = require("../fronted_controller/product_controller");
const { configurePagination, paginate } = require("../helpers/pagninateHelper");
const Admin = require("../models/Admin");
const ApiResponse = require("../response/ApiResponse");
const ErrorRespnse = require("../response/error_response");
const { saveImages } = require("../helpers/fileUploadHelper");

const CustomerController = {
    async getAll(req, res, next) {
        try {
            const query = {
                deletedAt: null
            }
            const options = configurePagination(req, query);
            console.log('optionsssss', options);

            const Admins = await paginate(Admin, options);

            return res.status(200).json(new ApiResponse(200, 'Admins fetched successfully', Admins));
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

            // Check if Admin already exists
            const existingAdmin = await Admin.findOne({ email: req.body.email });

            if (existingAdmin) {
                return res.status(400).json(new ErrorRespnse(400, 'Admin already exists'));
            }

            if (req.file) {
                const savedPaths = saveImages(req.file);
                req.body.profileImage = savedPaths[0];
            }

            const customer = await Admin.create(req.body);
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
            const customer = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
            const customer = await Admin.findById(req.params.id);
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
            const Admins = await Admin.updateMany({ _id: { $in: req.body.ids } }, { deletedAt: Date.now() });
            res.status(200).json(new ApiResponse(200, 'Admins deleted successfully', Admins));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    },

    async getTrash(req, res, next) {
        try {

            // const Admins = await Admin.find({ deletedAt: { $ne: null } });
            // use pagination
            const query = {
                deletedAt: { $ne: null }
            }
            const options = configurePagination(req, query);
            const Admins = await paginate(Admin, options);
            res.status(200).json(new ApiResponse(200, 'Admins fetched successfully', Admins));
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


            const customer = await Admin.findByIdAndDelete(req.body.ids);

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
            const Admins = await Admin.updateMany({ _id: { $in: req.body.ids } }, { deletedAt: null });
            res.status(200).json(new ApiResponse(200, 'Admins restored successfully', Admins));
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
            const customer = await Admin.findByIdAndUpdate(req.params.id, { password: hashPassword }, { new: true });
            res.status(200).json(new ApiResponse(200, 'Customer updated successfully', customer));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    }
}
module.exports = CustomerController;    