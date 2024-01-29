import express from 'express';
import testUser from '../controller/user.controller.js';

const userRouter = express.Router();

userRouter.route('/test').get(testUser)
export default userRouter;