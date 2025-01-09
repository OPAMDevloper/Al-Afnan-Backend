

const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { saveImages } = require('../helpers/fileUploadHelper');
const ErrorRespnse = require('../response/error_response');
const api = require('../config/api');
const ApiResponse = require('../response/ApiResponse');

const geoip = require('geoip-lite');
const useragent = require('useragent');



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



                const ip = req.ip || req.body.ip; // Assuming IP is sent in the body if not available in the request object
                const geo = geoip.lookup(ip);
                const country = geo ? geo.country : 'Unknown'; // Default to 'Unknown' if country can't be determined

                // Get browser and device details from user-agent
                const agent = useragent.parse(req.headers['user-agent']);
                const browser = agent.toAgent(); // Browser name/version
                const device = agent.device.family || 'Unknown'; // Device name

 

                user.ip = ip;
                user.country = country;
                user.browser = browser;
                user.device = device;


                console.log('user', user);





                await user.save();
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