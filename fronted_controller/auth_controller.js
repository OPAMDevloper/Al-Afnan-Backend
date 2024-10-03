
const User = require('../models/User');

const AuthController = {

    create_user: async (req, res) => {

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
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

    login_user: async (req, res) => {

        const user = await User.findOne({ username: req.body.username });

        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            res.status(500).json({
                type: "error",
                message: "User not exists or invalid credentials",
            })
        } else {

            const accessToken = jwt.sign({
                id: user._id,
                email: user.email
            }, api_config.api.jwt_secret, { expiresIn: "1d" })

            const { password, ...data } = user._doc;

            res.status(200).json({
                type: "success",
                message: "Successfully logged",
                ...data,
                accessToken
            })
        }
    }
}

module.exports = AuthController