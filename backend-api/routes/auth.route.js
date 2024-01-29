import express from 'express';
import signUpUser from '../controller/auth.controller.js';

const authRouter = express.Router();

authRouter.route('/signup').post(signUpUser);

export default authRouter;