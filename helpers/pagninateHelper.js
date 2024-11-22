// paginationHelper.js

// const { create } = require("../models/Product");

// const paginate = async (model, options) => {
//     const { page = 1, count = 10, filter = {}, sort = { createdAt: -1 }, populate } = options;

//     // Calculate total documents
//     const totalDocuments = await model.countDocuments(filter);
//     const totalPages = Math.ceil(totalDocuments / count); // Use count instead of limit

//     if (populate) {
//         query.populate(populate);
//     }

//     // Find the documents for the current page
//     const documents = await model.find(filter)
//         .sort({ createdAt: -1 })
//         .skip((page - 1) * count)
//         .limit(count);


//     const isNextPage = page < totalPages;
//     const isPrevPage = page > 1;

//     return {
//         data: documents,
//         totalItems: totalDocuments,
//         count, // Return count directly
//         page, // Return current page directly
//         totalPages,
//         isNextPage,
//         isPrevPage,
//     };
// };
const paginate = async (model, options) => {
    const { page = 1, count = 10, filter = {}, sort = { createdAt: -1 }, populate } = options;

    // Calculate total documents
    const totalDocuments = await model.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / count);

    // Find the documents for the current page
    const query = model.find(filter).sort({ createdAt: -1 }).skip((page - 1) * count).limit(count);

    if (populate) {
        query.populate(populate);
    }
    const documents = await query;

    const isNextPage = page < totalPages;
    const isPrevPage = page > 1;

    return {
        data: documents,
        totalItems: totalDocuments,
        count,
        page,
        totalPages,
        isNextPage,
        isPrevPage,
    };
};


// const configurePagination = (req) => {
//     const page = parseInt(req.query.page) || 1;
//     const count = parseInt(req.query.count) || 10;

//     return {
//         page,
//         count,
//         filter: req.query.filter ? JSON.parse(req.query.filter) : {}, 
//         sort: req.query.sort ? JSON.parse(req.query.sort) : {}, 
//     };
// };

const configurePagination = (req, defaultQuery = {}) => {
    const page = parseInt(req.query.page) || 1;
    const count = parseInt(req.query.count) || 10;

    // Merge the defaultQuery with filters from request
    const filter = {
        ...defaultQuery,
        ...req.query.filter ? JSON.parse(req.query.filter) : {}
    };
    if (req.query.category) {
        filter.category = req.query.category;
    }

    if (req.query.search) {
        filter.name = { $regex: req.query.search, $options: 'i' };
    }



    console.log('filter query', filter);
    return {
        page,
        count,
        filter,
        sort: req.query.sort ? JSON.parse(req.query.sort) : {},
    };
};

module.exports = {
    paginate,
    configurePagination,
};
