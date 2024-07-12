const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; 
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

        if (token == null) throw new Error('[x] Token not provided'); 

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) throw new Error('[x] Unauthorized token');
            next();
        });
    }

    catch(Error) {
        return res.status(401).json({
            success: false,
            message: Error.message,
        })
    }
};

module.exports = authenticateToken;
