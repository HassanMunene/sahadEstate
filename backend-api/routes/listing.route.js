import express from 'express';
import { testingListing, createListing } from '../controller/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const listingRouter = express.Router();

listingRouter.route('/testing').get(verifyToken, testingListing);
listingRouter.route('/create_listing').post(verifyToken, createListing);

export default listingRouter;