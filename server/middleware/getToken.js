const getToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== undefined) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.status(403).json({ message: 'Error in getting JWT token' });
        }
    } catch(error) {
        res.status(400).json({ message: 'header missing' });
    }
}

module.exports = getToken;