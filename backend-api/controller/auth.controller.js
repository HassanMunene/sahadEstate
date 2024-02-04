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
        
        // destructure the validUser to omit the password so that we dont send it back to client
        const {password: pass, ...restInfo} = validUser.toObject();

        // then create a cookie and send response
        res.cookie('access_token', token, {httpOnly: true}).status(200).json({restInfo});

    } catch (error) {
        next(error);
    }
}

export const googleAuthenticate = async (req, res, next) => {
    const {name, email, photo} = req.body
    try {
        const user = await User.findOne({ email: email })
        // if user already exists sign the user in and give the a jwt token
        // we just need to sign him in.
        if (user) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
            //extract user info excludng the password for user
            const {password: pass, ...restInfo} = user.toObject()

            // save the token to the cookie and send back the user info to client
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(restInfo);
        } else {
            // if the user doesn't already exist the we sign them up and we have to
            // generate a password for them because it is required already in model
            const generatedPassword = Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(generatedPassword, salt);
            
            //generate the name for username in db
            const generateName = name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);
            const newUser = new User({username: generateName, email: email, password: hashedPassword, avatar: photo});
            await newUser.save();

            // the automatically sign in the user and provide a token for them
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY);
            const {password: pass, ...restInfo} = newUser.toObject();
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(restInfo);
        }
    } catch (error) {
        next(error);
    }
}

export const signOutUser = (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json({status: 'user successfully logged out'});
    } catch (error) {
        next(error);
    }
}