import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
const ListingCard = (props) => {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
            <Link to={`/listing/${props.listing._id}`}>
                <img 
                    src={props.listing.imageUrls[0]} 
                    alt="listingImage"
                    className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
                />
                <div className="p-3 flex flex-col gap-2 w-full">
                    <p className="truncate text-xl font-semibold text-slate-700">{props.listing.name}</p>
                    <div className="flex items-center gap-1">
                        <FaLocationDot className="h-4 w-4 text-green-700"/>
                        <p className="truncate text-sm text-gray-600 w-full">{props.listing.address}</p>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{props.listing.description}</p>
                    <p className="text-slate-500 mt-2 font-semibold">
                        Kes{' '}
                        {props.listing.offer 
                            ? props.listing.discountedPrice.toLocaleString('en-US')
                            : props.listing.regularPrice.toLocaleString('en-US')
                        }
                        {props.listing.type === 'rent' && ' / month'}
                    </p>
                    <div className="text-slate-700 flex gap-4">
                        <div className="font-bold text-xs">
                            {props.listing.bedrooms > 1 
                                ? `${props.listing.bedrooms} beds` 
                                : `${props.listing.bedrooms} bed`
                            }
                        </div>
                        <div className="font-bold text-xs">
                            {props.listing.bathrooms > 1 
                                ? `${props.listing.bathrooms} baths` 
                                : `${props.listing.bathrooms} bath`
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ListingCard;