import express from 'express';
import { testUser, updateUserInfo } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const userRouter = express.Router();

userRouter.route('/test').get(testUser)
userRouter.route('/update/:id').patch(updateUserInfo);
export default userRouter;