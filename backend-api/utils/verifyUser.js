import errorFunction from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) {
        return next(errorFunction(401, 'Not authorised to do this action'));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return next(errorFunction(403, 'Forbidden'));
        }
        req.user = user;
        next();
    })
}