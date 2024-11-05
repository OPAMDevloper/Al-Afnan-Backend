
const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const api_config = require('../config/api');
const ApiResponse = require('../response/ApiResponse');
const ErrorRespnse = require('../response/error_response');
const { sendOtp } = require('../helpers/mailhelper');
const AuthController = {

    async create_user(req, res, next) {
        console.log('body', req.body);

        // Validate required fields
        if (!req.body.password || !req.body.email || !req.body.name) {
            return res.status(400).json(new ErrorRespnse(400, 'All fields are required'));
        }



        try {
            // Check if user already exists
            const existingUser = await User.findOne({
                $or: [
                    { email: req.body.email },
                    { name: req.body.name }
                ]
            });

            if (existingUser) {
                return res.status(400).json(new ErrorRespnse(400, 'User already exists with this email or name'));
            }

            // Create new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
            });



            const user = await newUser.save();

            const otp = Math.floor(100000 + Math.random() * 900000);

            await sendOtp('email@gmail.com', otp, 'register');

            res.status(201).json(new ApiResponse(201, 'User has been created successfully', user));
        } catch (err) {
            console.log('error on register', err);
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong, please try again', err.message));
        }
    },


    async login_user(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json(new ErrorRespnse(400, 'All fields are required'))
        }
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(400).json(new ErrorRespnse(400, 'user not exists'))
            }

            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {

                return res.status(400).json(new ErrorRespnse(400, 'Invalid credentials'))
            } else {
                const accessToken = jwt.sign({
                    id: user._id,
                    email: user.email
                }, 'secret', { expiresIn: "1d" })
                const { password, ...data } = user._doc
                return res.status(200).json(new ApiResponse(200, 'Successfully logged', { ...data, accessToken }))
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', err))
        }
    }
}

module.exports = AuthController