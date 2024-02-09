import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { FaShare, FaLocationDot, FaBed, FaBath, FaSquareParking, FaChair } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Contact from '../components/Contact';


const Listing = () => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);

    useEffect(()=> {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/listing/getListing/${params.listingId}`);
                debugger
                //console.log(response.data)s
                if(response.data.success === false) {
                    console.log(response.data.message);
                    setLoading(false);
                    return;
                }
                const listingData = response.data;
                setListing(listingData);
                //console.log(listing);
                setLoading(false);

            } catch (error) {
                console.log(error);
                setError(true);
                setLoading(false);
                setError(false);
            }
        }
        fetchListing()
    }, [params.listingId])
    return (
        <main>
            {loading ? <p className="text-center my-7 text-2xl">Loading...</p> : ''}
            {error ? <p className="text-center my-7 text-2xl">Something went wrong</p>: ''}
            {listing && !loading && ! error && (
                <div>
                    <Swiper slidesPerView={1} spaceBetween={20} modules={[Navigation]} navigation>
                        {
                            listing.imageUrls.map((imageUrl) => {
                                return (
                                    <SwiperSlide key={imageUrl}>
                                        <img src={imageUrl} alt="image cover" style={{width: '100%', height: '500px', backgroundSize: 'contain'}}/>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    <div className="fixed top-[13%] z-10 right-[3%] w-12 h-12 border-rounded rounded-full bg-slate-100 flex justify-center items-center cursor-pointer">
                        <FaShare 
                            className="text-slate-500 w-10 h-10"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 2000);
                            }}
                        />
                    </div>
                    {copied && (
                        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">Link copied!</p>
                    )}
                    <div className="flex flex-col p-3 gap-4 max-w-4xl my-7 mx-auto">
                        <p className="tex-2xl font-semibold">
                            {listing.name} - Kes{' '}
                            {listing.offer 
                                ? listing.discountedPrice.toLocaleString('en-US') 
                                : listing.regularPrice.toLocaleString('en-US')}
                            {listing.type === 'rent' && '/ month'}
                        </p>
                        <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
                            <FaLocationDot className="text-green-700"/>
                            {listing.address}
                        </p>
                        <div className="flex gap-4">
                            <p className="bg-red-900 p-1 w-full max-w-[200px] text-white text-center rounded-md">
                                {listing.type === 'rent' ? 'For rent' : 'For sale'}
                            </p>
                            {
                                listing.offer && (
                                    <p className="bg-green-900 p-1 w-full max-w-[200px] text-white text-center rounded-md">
                                        Kes{+listing.regularPrice - +listing.discountedPrice} OFF
                                    </p>
                                )
                            }
                        </div>
                        <p className="text-slate-800">
                            <span className="font-semibold text-black">Description - </span>
                            {listing.description}
                        </p>
                        <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaBed className="text-lg"/>
                                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaBath className="text-lg"/>
                                {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaSquareParking className="text-lg"/>
                                {listing.parking ? 'parking spot' : 'No parking spot'}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaChair className="text-lg"/>
                                {listing.furnished ? 'Furnished' : 'Unfurnished'}
                            </li>
                        </ul>
                        {currentUser && listing.userRef !== currentUser._id && !contact && (
                            <button 
                            onClick={() => setContact(true)} 
                            className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">
                                Contact landloard
                            </button>
                        )}
                        {contact && <Contact listing={listing}/>}
                    </div>
                </div>
            )}
        </main>
    )
}

export default Listing;