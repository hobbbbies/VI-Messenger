const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, ((err, authData) => {
        if(err) {
            res.status(403).json({ message: 'Error in verifying JWT token' });
        } else {
            req.user = authData;
            next();
        }
    }));
}

module.exports = verifyToken;