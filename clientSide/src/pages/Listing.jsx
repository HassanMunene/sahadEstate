import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Listing = () => {
    const params = useParams();
    const [listing, setListing] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=> {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`/api/listing/getListing/${params.listingId}`);
                //console.log(response.data)
                if(response.data.success === false) {
                    console.log(response.data.message);
                    return;
                }
                const listingData = response.data;
                setListing(listingData);
                //console.log(listing);
            } catch (error) {
                console.log(error);
                setError(true);
                setLoading(false);
            }
        }
        fetchListing()
    }, [])
    return (
        <h1>{listing.name}</h1>
    )
}

export default Listing;