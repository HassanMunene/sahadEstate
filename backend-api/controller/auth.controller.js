import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import errorFunction from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signUpUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({msg: 'Missing required fields'})
        }
        // generating a salt for the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({msg: 'User created successfully'});
    } catch (error) {
        next(error);
    }
}

export const signInUser = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        // validate that actually the email exists in the backend
        const validUser = await User.findOne({email: email});
        if(!validUser) {
            next(errorFunction(404, 'user not found'));
        }
        // then compare the hashed password against the provided one. it will return a boolean
        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            next(errorFunction(401, 'wrong credentials'));
        }
        // if the user password is valid, create a jwt token that will be stored in a cookie
        // to authenticate the user every time the make a special request.
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET_KEY);

        // then create a cookie
        res.cookie('access_token', token, {httpOnly: true}).status(200).json({validUser});

    } catch (error) {
        next(error);
    }
}