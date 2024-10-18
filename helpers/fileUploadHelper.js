
// const path = require('path');
// const fs = require('fs');

// // Directory to save images
// const uploadDir = path.join(__dirname, '../public'); // Directory to save images

// const createFolderStructure = (year, month) => {
//     const dir = path.join(uploadDir, year.toString(), month.toString());
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//     }
//     return dir;
// };

// const saveImages = (files) => {
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//     const folderPath = createFolderStructure(year, month);

//     const savedFilePaths = [];

//     files.forEach(file => {
//         const filename = `${Date.now()}-${file.originalname}`;
//         const filePath = path.join(folderPath, filename);

//         fs.writeFileSync(filePath, file.buffer); // Save the file

//         // Construct path using forward slashes
//         const publicPath = path.join('public', year.toString(), month.toString(), filename).replace(/\\/g, '/');
//         savedFilePaths.push(publicPath);
//     });

//     return savedFilePaths; // Return an array of saved file paths
// };

// module.exports = { saveImages };


// const path = require('path');
// const fs = require('fs');

// // Directory to save images
// const uploadDir = path.join(__dirname, '../public');

// const createFolderStructure = (year, month) => {
//     const dir = path.join(uploadDir, year.toString(), month.toString());
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//     }
//     return dir;
// };

// const saveImages = (files) => {
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//     const folderPath = createFolderStructure(year, month);

//     const savedFilePaths = [];

//     // Check if the input is an array or a single file object
//     const fileArray = Array.isArray(files) ? files : [files]; // Ensure we always work with an array

//     fileArray.forEach(file => {
//         const filename = `${Date.now()}-${file.originalname}`;
//         const filePath = path.join(folderPath, filename);

//         fs.writeFileSync(filePath, file.buffer); // Save the file

//         // Construct path using forward slashes
//         const publicPath = path.join('public', year.toString(), month.toString(), filename).replace(/\\/g, '/');
//         savedFilePaths.push(publicPath);
//     });

//     return savedFilePaths; 
// };

// module.exports = { saveImages };

const path = require('path');
const fs = require('fs');

// Directory to save images
const uploadDir = path.join(__dirname, '../public');

const createFolderStructure = (year, month) => {
    const dir = path.join(uploadDir, year.toString(), month.toString());
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
};

const saveImages = (files) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const folderPath = createFolderStructure(year, month);

    const savedFilePaths = [];

    // Handle single file or multiple files
    const fileArray = Array.isArray(files) ? files : [files];
    console.log('fileArray', fileArray);

    fileArray.forEach(file => {
        const filename = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(folderPath, filename);

        fs.writeFileSync(filePath, file.buffer); // Save the file

        // Construct public path using forward slashes
        const publicPath = path.join('public', year.toString(), month.toString(), filename).replace(/\\/g, '/');
        savedFilePaths.push(publicPath);
    });

    return savedFilePaths;
};

module.exports = { saveImages };
