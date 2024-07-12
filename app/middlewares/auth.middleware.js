const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) throw new Error('[x] Token not provided'); 

        jwt.verify(token, process.env.JWT_SECRET, (Error, user) => {
            if (Error) throw new Error('[x] Unauthorized token');
            req.user = user;
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
