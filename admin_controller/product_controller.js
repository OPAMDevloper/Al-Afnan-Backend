// controllers/adminController.js
const { saveImages } = require('../helpers/fileUploadHelper');
const { paginate, configurePagination } = require('../helpers/pagninateHelper');
const Product = require('../models/Product');
const ApiResponse = require('../response/ApiResponse');
const ErrorRespnse = require('../response/error_response');

// Add a new product
exports.addProduct = async (req, res) => {
    try {

        console.log(req.body);
        console.log(req.files);
        if (req.files) {

            const savedPaths = saveImages(req.files.gallery);

            req.body.gallery = savedPaths;
        }

        if (req.files.image) {
            const image = saveImages(req.files.image);
            req.body.image = image[0];
        }


        const product = new Product(req.body);
        const data = await product.save();
        // const product = new Product(req.body);
        // await product.save();
        res.status(201).json(new ApiResponse(201, 'Product has been created successfuly', data));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json(new ErrorRespnse(400, 'Product id is required'));
        }
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });


        if (req.files.image) {
            const image = saveImages(req.files.image);
            req.body.image = image[0];
        }
        if (req.files.gallery) {
            const gallery = saveImages(req.files.gallery);
            req.body.gallery = gallery;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(new ApiResponse(200, 'Product updated successfully', updatedProduct));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json(new ErrorRespnse(400, 'Product id is required'));
        }
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // res.json({ message: 'Product deleted successfully' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        // res.status(400).json({ error: error.message });
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));

    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        // const products = await Product.find();
        const query = {
            deletedAt: null
        }
        const options = configurePagination(req, query);
        options.populate = { path: 'category' };
        const products = await paginate(Product, options);
        res.status(200).json(new ApiResponse(200, 'Products fetched successfully', products));
    } catch (error) {
        // res.status(500).json({ error: error.message });
        console.log('fjfjaaaaaaaa', error);
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
};

// Get a single product
exports.getProduct = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json(new ErrorRespnse(400, 'Product id is required'));
        }
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(new ApiResponse(200, 'Product fetched successfully', product));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }

}


exports.trashMany = async (req, res, next) => {
    try {
        if (req.body.ids === undefined && req.body.ids.length === 0) {
            return res.status(400).json(new ErrorRespnse(400, 'product id is required'));
        }
        const product = await Product.updateMany({ _id: { $in: req.body.ids } }, { deletedAt: Date.now() });
        res.status(200).json(new ApiResponse(200, 'Products deleted successfully', product));
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
        const products = await paginate(Product, options);
        res.status(200).json(new ApiResponse(200, 'Products fetched successfully', products));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
}

exports.deleteMany = async (req, res, next) => {
    try {
        if (req.body.ids === undefined && req.body.ids.length === 0) {
            return res.status(400).json(new ErrorRespnse(400, 'product id is required'));
        }



        const product = await Product.findByIdAndDelete(req.body.ids);

        res.status(200).json(new ApiResponse(200, 'Product deleted successfully', product));
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
        const products = await Product.updateMany({ _id: { $in: req.body.ids } }, { deletedAt: null });
        res.status(200).json(new ApiResponse(200, 'Product restored successfully', products));
    } catch (error) {
        res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
    }
}




