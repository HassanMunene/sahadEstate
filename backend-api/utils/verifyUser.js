import errorFunction from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    console.log('we are in the verify token')
    const token = req.cookies.access_token
    res.json({msg: 'yoo you are in the verify'})
    // if(!token) {
    //     return next(errorFunction(401, 'Not authorised to do this action'));
    // }
    // jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    //     if (err) {
    //         return next(errorFunction(403, 'Forbidden'));
    //     }
    // })
}