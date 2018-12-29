const jwt = require('jsonwebtoken');
const salt = 'WRbzwlS5Zrfu44Hca77z';

let verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];
    if (!token)
        return res.status(403).send({auth: false, message: 'No token provided.'});
    jwt.verify(token, salt, (err, decoded) => {
        if (err)
            return res.status(401).send({auth: false, message: 'Failed to authenticate token.'});
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
