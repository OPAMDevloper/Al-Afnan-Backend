const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3039', // Replace with your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
/* configure body-parser */// Middleware
app.use(express.json()); // For parsing application/json
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: false
}));


// app.use('/public', express.static(path.join(__dirname, 'public'))); // Serve static files


app.use('/public', express.static(path.join(__dirname, 'public')));
// const { auth_route, user_route, product_route, cart_route, order_route } = require('./routes');

// app.use('/api/v1/auth', auth_route);
// app.use('/api/v1/users', user_route);
// app.use('/api/v1/products', product_route);
// app.use('/api/v1/carts', cart_route);
// app.use('/api/v1/orders', order_route);


//log requested url
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






connectDB('E-commerce').then(() => {
    console.log('mongoose connected successfully');
}).catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});