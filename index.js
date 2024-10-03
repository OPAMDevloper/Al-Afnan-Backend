const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');
const connectDB = require('./db');
const app = express();

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

const fronted_route = require('./frontend_route/auth_route');
app.use('/', fronted_route);

const admin_route = require('./admin_routes/auth_route');
app.use('/admin', admin_route);





connectDB('E-commerce').then(() => {
    console.log('mongoose connected successfully');
}).catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});