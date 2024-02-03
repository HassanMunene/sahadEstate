import User from "../models/user.model.js";
import errorFunction from "../utils/error.js";
import bcrypt from 'bcryptjs';

export const testUser = (req, res) => {
    res.json({msg: 'Hello there mate we are testing'});
}

export const updateUserInfo = async (req, res, next) => {
    //console.log(req.user.id);
    if (req.user.id != req.params.id) {
        return next(errorFunction(401, 'You can only update your own account'));
    }
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true})

        const {password, ...restInfo} = updatedUser.toObject();
        res.status(200).json({msg: 'Successfully updated the user', restInfo})
    } catch (error) {
        next(error);
    }
}