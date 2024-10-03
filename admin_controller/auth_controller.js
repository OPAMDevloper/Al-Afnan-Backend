

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { saveImage } = require('../helpers/fileUploadHelper');


const AuthController = {

    async create_user(req, res, next) {

        console.log(req.body);
        console.log(req.file);


        if (!req.body.password || !req.body.email || !req.body.username) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        let imagePath = null;
        if (req.file) {
            imagePath = await saveImage(req.file);
        }


        console.log('imagePath', imagePath);



        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            profileImage: imagePath
        })


        try {
            const user = await newUser.save();
            res.status(201).json({
                type: 'success',
                message: "User has been created successfuly",
                user
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },


    async login_user(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        try {

            const user = await User.findOne({ email: req.body.email })

            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                res.status(500).json({
                    type: "error",
                    message: "User not exists or invalid credentials",
                })
            } else {
                const accessToken = jwt.sign({
                    id: user._id,
                    email: user.email
                }, process.env.JWT_SECRET, { expiresIn: "1d" })
                const { password, ...data } = user._doc
                res.status(200).json({
                    type: "success",
                    message: "Successfully logged",
                    ...data,
                    accessToken
                })
            }
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    }




}

module.exports = AuthController