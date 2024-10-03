const mongoose = require('mongoose')

const dbname = require('../db/index.js')

const connectDB = async () => {
    try {
        const connectoinInstance = await mongoose.connect('mongodb+srv://swapnilkag143214:143214@cluster0.1lyzqxu.mongodb.net/' + 'tictactoe');
        console.log('mongoose connected successfully');

    } catch (e) {
        console.log('error to connect mongo db  database' + e);
        process.exit(1);
    }
}
module.exports = connectDB;