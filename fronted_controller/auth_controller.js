
const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const api_config = require('../config/api');
const ApiResponse = require('../response/ApiResponse');
const ErrorRespnse = require('../response/error_response');
const AuthController = {

    async create_user(req, res, next) {
        console.log('body', req.body);
    
        // Validate required fields
        if (!req.body.password || !req.body.email || !req.body.username) {
            return res.status(400).json(new ErrorRespnse(400, 'All fields are required'));
        }
    
        let imagePath = null;
        if (req.files) {
            imagePath = await saveImages(req.file);
        }
    
        try {
            // Check if user already exists
            const existingUser = await User.findOne({
                $or: [
                    { email: req.body.email }, 
                    { username: req.body.username }
                ]
            });
    
            if (existingUser) {
                return res.status(400).json(new ErrorRespnse(400, 'User already exists with this email or username'));
            }
    
            // Create new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                profileImage: imagePath
            });
    
            const user = await newUser.save();
            res.status(201).json(new ApiResponse(201, 'User has been created successfully', user));
        } catch (err) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong, please try again', err.message));
        }
    },
    

    async   login_user(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json(new ErrorRespnse(400, 'All fields are required'))
        }
        try {
          const user = await Admin.findOne({ email: req.body.email })
            if(!user) {
                return res.status(400).json(new ErrorRespnse(400, 'user not exists'))
            }

            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                
                return  res.status(400).json(new ErrorRespnse(400, 'Invalid credentials'))
            } else {
                const accessToken = jwt.sign({
                    id: user._id,
                    email: user.email
                }, 'secret', { expiresIn: "1d" })
                const { password, ...data } = user._doc
               return  res.status(200).json(new ApiResponse(200, 'Successfully logged', { ...data, accessToken }))
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', err))
        }
    }
}

module.exports = AuthController