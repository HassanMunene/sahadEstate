import express from 'express';
import { testingListing, createListing, deleteListing } from '../controller/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const listingRouter = express.Router();

listingRouter.route('/testing').get(verifyToken, testingListing);
listingRouter.route('/create_listing').post(verifyToken, createListing);
listingRouter.route('/delete/:id').delete(verifyToken, deleteListing)

export default listingRouter;