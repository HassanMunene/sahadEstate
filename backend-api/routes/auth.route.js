import express from 'express';
import { signUpUser, signInUser, googleAuthenticate, signOutUser } from '../controller/auth.controller.js';
const authRouter = express.Router();

authRouter.route('/signup').post(signUpUser);
authRouter.route('/signin').post(signInUser);
authRouter.route('/google').post(googleAuthenticate);
authRouter.route('/signout').get(signOutUser);

export default authRouter;
