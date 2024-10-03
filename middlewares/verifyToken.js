const jwt = require('jsonwebtoken');
const ErrorRespnse = require('../response/error_response.js');

/* jwt token verify */
const authenticationVerifier = (req, res, next) => {
    // Access the Authorization header
    const authHeader = req.headers.authorization; // Change this to 'authorization'
    console.log('authjheader', authHeader);
    if (authHeader) {
        // Split the header to get the token
        const token = authHeader.split(' ')[1]; // This assumes the format is "Bearer <token>"

        if (!token) {
            return res.status(401).json(new ErrorRespnse(401, 'Token not found'));
        }

        // Verify the token using the secret from environment variables
        jwt.verify(token, 'secret', (err, user) => {
            if (err) return res.status(401).json(new ErrorRespnse(401, 'Invalid token'));
            req.user = user; // Attach the user to the request object
            next(); // Call the next middleware or route handler
        });
    } else {
        return res.status(401).json(new ErrorRespnse(401, 'You are not authenticated'));
    }
}

module.exports = { authenticationVerifier };
