import errorFunction from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) {
        console.log('there was no token from the request');
        return next(errorFunction(401, 'Not authorised to do this action'));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log('token was there but was not authentic to user');
            return next(errorFunction(403, 'Forbidden'));
        }
        req.user = user;
        next();
    })
}