// controllers/adminController.js
const { saveImages } = require('../helpers/fileUploadHelper');
const { paginate, configurePagination } = require('../helpers/pagninateHelper');
const Blogs = require('../models/Blogs');
const Product = require('../models/Product');
const ApiResponse = require('../response/ApiResponse');
const ErrorRespnse = require('../response/error_response');

// Add a new product
exports.addBlogs = async (req, res) => {
    try {
        if (req.files) {
            const savedPaths = saveImages(req.files.gallery);

            req.body.gallery = savedPaths;
        }

        if (req.files.image) {
            const image = saveImages(req.files.image);
            req.body.image = image[0];
        }


        const blog = new Blogs(req.body);
        const data = await blog.save();
        res.status(201).json(new ApiResponse(201, 'Blog has been created successfuly', data));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};

// Update a product
exports.updateBlog = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json(new ErrorRespnse(400, 'Blog id is required'));
        }
        const blog = await Blogs.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });


        if (req.files.image) {
            const image = saveImages(req.files.image);
            req.body.image = image[0];
        }
        if (req.files.gallery) {
            const gallery = saveImages(req.files.gallery);
            req.body.gallery = gallery;
        }

        const updatedBlogs = await Blogs.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(new ApiResponse(200, 'Blog updated successfully', updatedBlogs));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};

// Delete a product
exports.deleteBlog = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json(new ErrorRespnse(400, 'Blog id is required'));
        }
        const blog = await Product.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        // res.json({ message: 'Product deleted successfully' });
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        // res.status(400).json({ error: error.message });
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));

    }
};

// Get all products
exports.getAllBlogs = async (req, res) => {
    try {
        // const products = await Product.find();
        const query = {
            deletedAt: null
        }
        const options = configurePagination(req, query);
        const blogs = await paginate(Blogs, options);
        res.status(200).json(new ApiResponse(200, 'Blogs fetched successfully', blogs));
    } catch (error) {
        // res.status(500).json({ error: error.message });
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};

// Get a single product
exports.getBlogs = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json(new ErrorRespnse(400, 'Product id is required'));
        }
        const blog = await Blogs.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(new ApiResponse(200, 'Blogs fetched successfully', blog));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};



exports.trashMany = async (req, res, next) => {
    try {
        if (req.body.ids === undefined && req.body.ids.length === 0) {
            return res.status(400).json(new ErrorRespnse(400, 'Blog id is required'));
        }
        const blogs = await Blogs.updateMany({ _id: { $in: req.body.ids } }, { deletedAt: Date.now() });
        res.status(200).json(new ApiResponse(200, 'Blogs deleted successfully', blogs));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
}

exports.getTrash = async (req, res, next) => {
    try {

        // const customers = await User.find({ deletedAt: { $ne: null } });
        // use pagination
        const query = {
            deletedAt: { $ne: null }
        }
        const options = configurePagination(req, query);
        const blog = await paginate(Blogs, options);
        res.status(200).json(new ApiResponse(200, 'Blogs fetched successfully', blog));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
}

exports.deleteMany = async (req, res, next) => {
    try {
        if (req.body.ids === undefined && req.body.ids.length === 0) {
            return res.status(400).json(new ErrorRespnse(400, 'Blog id is required'));
        }

        const blog = await Blogs.findByIdAndDelete(req.body.ids);

        res.status(200).json(new ApiResponse(200, 'Blog deleted successfully', blog));
    } catch (error) {
        console.log('error', error);

        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
}


exports.restoreMany = async (req, res, next) => {
    try {
        if (req.body.ids === undefined && req.body.ids.length === 0) {
            return res.status(400).json(new ErrorRespnse(400, 'Product id is required'));
        }
        const blogs = await Blogs.updateMany({ _id: { $in: req.body.ids } }, { deletedAt: null });
        res.status(200).json(new ApiResponse(200, 'Product restored successfully', blogs));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
}


