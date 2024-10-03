const express = require('express');
const AuthController = require('../fronted_controller/auth_controller');
const router = express.Router();


router.post('/register', AuthController.create_user);
router.post('/login', AuthController.login_user);
// router.post('forgot-password', AuthController.forgot_password);

module.exports = router;
