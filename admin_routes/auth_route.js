
const express = require('express');
const router = express.Router();

const multer = require('multer');
const AuthController = require('../admin_controller/auth_controller');
const { authenticationVerifier } = require('../middlewares/verifyToken');
const storage = multer.memoryStorage(); // Store in memory (or you can configure disk storage)
const upload = multer({ storage });


router.post('/register', upload.single('profileImage'), AuthController.create_user);
router.post('/login', AuthController.login_user);
router.get('/profile', authenticationVerifier, AuthController.getProfile);



module.exports = router;
