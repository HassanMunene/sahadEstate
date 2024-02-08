import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

const Listing = () => {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=> {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/listing/getListing/${params.listingId}`);
                //console.log(response.data)
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
                                        <img src={imageUrl} alt="image cover" style={{width: '100%', height: '550px', backgroundSize: 'cover'}}/>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            )}
        </main>
    )
}

export default Listing;