const jwt = require('jsonwebtoken');
const User = require('../model/user');



const userExtractor = async (req, res, next) => {
    if (!req.token) {
        return res.status(401).json({ error: 'token missing' });
    }

    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'token invalid' });
        }
        req.user = await User.findById(decodedToken.id);
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'token invalid or signature mismatch' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'token expired' });
        }
        return res.status(401).json({ error: 'token verification failed' });
    }
};

module.exports = userExtractor;