const jwt = require('jsonwebtoken');
const User = require('../model/user');



const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' });
    }
    req.user = await User.findById(decodedToken.id);
    if (!req.user) {
        return res.status(401).json({ error: 'User not found' });
    }
    next();
};

module.exports = { userExtractor };