

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { saveImages } = require('../helpers/fileUploadHelper');
const ErrorRespnse = require('../response/error_response');
const api = require('../config/api');
const ApiResponse = require('../response/ApiResponse');


const AuthController = {

    async create_user(req, res, next) {


        if (!req.body.password || !req.body.email || !req.body.username) {
            return res.status(400).json(new ErrorRespnse(400, 'All fields are required'))
        }
        let imagePath = null;
        if (req.files) {
            imagePath = await saveImages(req.file);
        }

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            profileImage: imagePath
        })

        try {
            const user = await newUser.save();
            res.status(201).json(new ApiResponse(201, 'User has been created successfuly', user))
        } catch (err) {


            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', err.message))
        }
    },


    async login_user(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json(new ErrorRespnse(400, 'All fields are required'))
        }
        try {

            console.log(process.env.STRIPE_KEY)

            const user = await User.findOne({ email: req.body.email })

            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                res.status(500).json(new ErrorRespnse(500, 'User not exists or invalid credentials'))
            } else {
                const accessToken = jwt.sign({
                    id: user._id,
                    email: user.email
                }, 'secret', { expiresIn: "1d" })
                const { password, ...data } = user._doc
                res.status(200).json(new ApiResponse(200, 'Successfully logged', { ...data, accessToken }))
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', err))
        }
    }




}

module.exports = AuthController