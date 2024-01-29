import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';

const signUpUser = async (req, res, next) => {
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
export default signUpUser;