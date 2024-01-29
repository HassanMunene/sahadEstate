import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = Schema({
    username: {
        type: String,
        required: [true, 'Please provide the username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provid a password']
    }
}, {timestamps: true});

const User = model('User', userSchema);

export default User;