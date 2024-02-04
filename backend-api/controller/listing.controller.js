import Listing from "../models/listing.model.js";

export const testingListing = (req, res, next) => {
    res.json('testing listings');
}
export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
    } catch (error) {
        console.log(error);
        next(error);
    }
}