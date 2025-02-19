/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).send({
        message: 'Access Denied, No token provided'
    });

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, validToken) => {
        if (err) {
            return res.status(400).send('Invalid Token')
        } else {
            if (!validToken.isAdmin) return res.status(403).send({
                message: 'Access Denied, You are not an admin'
            });
            req.user = validToken;
            next();
        }
    });
}