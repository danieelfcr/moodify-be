const jwt = require('jsonwebtoken');
require('dotenv').config();
const Sentry = require('@sentry/node');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; //Ex: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    
    if(!token) return res.status(403).json({message: 'Token needed, authorization failed'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); //Continue execution of route
    } catch (error) {
        Sentry.captureException(error);
        res.status(401).json({ message: 'Invalid token, authorization failed'})
    }
}