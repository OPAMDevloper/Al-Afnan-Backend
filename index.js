// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const connectDB = require('./db');
// const app = express();
// const corsOptions = {
//     origin: 'http://localhost:3039', 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, 
// };

// app.use(cors(corsOptions));
// app.use(express.json()); // For parsing application/json
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// /* configure body-parser */// Middleware
// app.use(bodyParser.json());
// app.use('/public', express.static(path.join(__dirname, 'public')));


// //log requested url
// app.use((req, res, next) => {
//     console.log(req.path, req.method);
//     next();
// });

// const frontendProductRoute = require('./frontend_route/product_route');
// const fronted_route = require('./frontend_route/auth_route');
// app.use('/auth', fronted_route);
// app.use('/product', frontendProductRoute);
// app.use('/order', require('./frontend_route/orders_route'));


// const product_route = require('./admin_routes/product_route');
// const admin_route = require('./admin_routes/auth_route');
// const customer_route = require('./admin_routes/customer_route');
// app.use('/admin/auth', admin_route);
// app.use('/admin/product', product_route);
// app.use('/admin/customer', customer_route);
// app.use('/admin/category', require('./admin_routes/category_route'))






// connectDB('E-commerce').then(() => {
//     console.log('mongoose connected successfully');
// }).catch((err) => {
//     console.log('Error connecting to MongoDB:', err);
// });
// app.listen(3000, () => {
//     console.log("Server is listening on port 3000");
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
const app = express();
require('dotenv').config();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

const frontendProductRoute = require('./frontend_route/product_route');
const fronted_route = require('./frontend_route/auth_route');
app.use('/auth', fronted_route);
app.use('/product', frontendProductRoute);
app.use('/order', require('./frontend_route/orders_route'));

const product_route = require('./admin_routes/product_route');
const admin_route = require('./admin_routes/auth_route');
const customer_route = require('./admin_routes/customer_route');
app.use('/admin/auth', admin_route);
app.use('/admin/product', product_route);
app.use('/admin/customer', customer_route);
app.use('/admin/category', require('./admin_routes/category_route'));

connectDB(process.env.MONGODB_URI).then(() => {
    console.log('mongoose connected successfully');
}).catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
