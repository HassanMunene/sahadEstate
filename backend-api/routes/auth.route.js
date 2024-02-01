import express from 'express';
import { signUpUser } from '../controller/auth.controller.js';
import { signInUser } from '../controller/auth.controller.js';
import { googleAuthenticate } from '../controller/auth.controller.js'

const authRouter = express.Router();

authRouter.route('/signup').post(signUpUser);
authRouter.route('/signin').post(signInUser);
authRouter.route('/google').post(googleAuthenticate);

export default authRouter;
