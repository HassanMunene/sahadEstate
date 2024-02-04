import express from 'express';
import { testUser, updateUserInfo, deleteUser } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const userRouter = express.Router();

userRouter.route('/test').get(testUser)
userRouter.route('/update/:id').patch(verifyToken, updateUserInfo);
userRouter.route('/delete/:id').delete(verifyToken, deleteUser);
export default userRouter;