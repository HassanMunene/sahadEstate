import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import errorFunction from "../utils/error.js";
import bcrypt from 'bcryptjs';

export const testUser = (req, res) => {
    res.json({msg: 'Hello there mate we are testing'});
}

export const updateUserInfo = async (req, res, next) => {
    //console.log(req.user.id);
    if (req.user.id !== req.params.id) {
        console.log('the id in params does not match the one in token');
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
        res.status(200).json({success: true, user: restInfo})
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorFunction(401, 'you can only delete your own account'));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({status: 'user successfully deleted'});
    } catch (error) {
        next(error);
    }
}

export const showUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({userRef: req.params.id});
            res.status(200).json(listings);
        } catch (error) {
            console.log(error);
            next(error)
        }
    } else {
        next(errorFunction(401, 'you can only view your own listings'))
    }
}