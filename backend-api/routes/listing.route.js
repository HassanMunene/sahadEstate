import express from 'express';
import { testingListing, createListing, deleteListing, updateListing, getListing } from '../controller/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const listingRouter = express.Router();

listingRouter.route('/testing').get(verifyToken, testingListing);
listingRouter.route('/create_listing').post(verifyToken, createListing);
listingRouter.route('/delete/:id').delete(verifyToken, deleteListing);
listingRouter.route('/update/:id').post(verifyToken, updateListing);
listingRouter.route('/getListing/:id').get(getListing);

export default listingRouter;