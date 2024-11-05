

const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { saveImages } = require('../helpers/fileUploadHelper');
const ErrorRespnse = require('../response/error_response');
const api = require('../config/api');
const ApiResponse = require('../response/ApiResponse');


const AuthController = {

    async create_user(req, res, next) {
        if (!req.body.password || !req.body.email || !req.body.name) {
            return res.status(400).json(new ErrorRespnse(400, 'All fields are required'))
        }
        let imagePath = null;
        if (req.files) {
            imagePath = await saveImages(req.file);
        }

        const newUser = new Admin({
            name: req.body.name,
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

            console.log('body', req.body);


            const user = await Admin.findOne({ email: req.body.email })
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
    },


    async getProfile(req, res, next) {
        try {
            if (req.user == null) return res.status(401).json(new ApiResponse(401, 'Please login to continue'))
            const user = await Admin.findById(req.user.id);
            res.status(200).json(new ApiResponse(200, 'User fetched successfully', user));
        } catch (error) {
            res.status(500).json(new ErrorRespnse(500, 'Something went wrong please try again', error));
        }
    }




}

module.exports = AuthController