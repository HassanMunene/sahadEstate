import express from 'express';
import { testUser, updateUserInfo, deleteUser, showUserListings, getUser } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const userRouter = express.Router();

userRouter.route('/test').get(testUser)
userRouter.route('/update/:id').patch(verifyToken, updateUserInfo);
userRouter.route('/delete/:id').delete(verifyToken, deleteUser);
userRouter.route('/listings/:id').get(verifyToken, showUserListings)
userRouter.route('/:id').get(verifyToken, getUser);
export default userRouter;