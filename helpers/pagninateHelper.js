// paginationHelper.js

const paginate = async (model, options) => {
    const { page = 1, count = 10, filter = {}, sort = {} } = options;

    // Calculate total documents
    const totalDocuments = await model.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / count); // Use count instead of limit
    
    // Find the documents for the current page
    const documents = await model.find(filter)
        .sort(sort)
        .skip((page - 1) * count)
        .limit(count);

    const isNextPage = page < totalPages;
    const isPrevPage = page > 1;

    return {
        data: documents,
        totalItems: totalDocuments,
        count, // Return count directly
        page, // Return current page directly
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
