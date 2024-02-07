import Listing from "../models/listing.model.js";
import errorFunction from "../utils/error.js";

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

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    console.log(listing.name);
    if (!listing) {
        return next(errorFunction(404, 'listing not found'));
    }
    if (req.user.id !== listing.userRef) {
        console.log(req.user.id, listing.userRef)
        return next(errorFunction(401, 'not authorized to delete the listing'));
    }
    
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('successfully deleted')
    } catch (error) {
        next(error);
    }
}

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorFunction(404, 'Listing not found'));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorFunction(401, 'Not authorized to update this listing'));
    }
    try {
        const updatedOne = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true});
        console.log(updatedOne)
        res.status(200).json(updatedOne)
    } catch (error) {
        next(error)
    }
}