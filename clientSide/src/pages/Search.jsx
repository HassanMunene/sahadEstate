import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from  'axios';

const Search = () => {
    const navigate = useNavigate();
    const [searchSectionData, setSearchSectionData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    useEffect(() =>{
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl
            || offerFromUrl || sortFromUrl || orderFromUrl
        ) {
            setSearchSectionData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc' 
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const response = await axios.get(`/api/listing/get?${searchQuery}`);
            if (response.data.success === false) {
                console.log(response.data.message)
                return;
            }
            console.log(response.data);
            setListings(response.data);
            console.log(listings)
            setLoading(false)
        }
        fetchListings();
    }, [window.location.search])

    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSearchSectionData({
                ...searchSectionData,
                type: e.target.id
            })
        }
        if (e.target.id === 'searchTerm') {
            setSearchSectionData({
                ...searchSectionData,
                searchTerm: e.target.value
            })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSearchSectionData({
                ...searchSectionData,
                [e.target.id]: e.target.checked || e.target.checked==='true' ? true:false
            })
        }
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';

            setSearchSectionData({
                ...searchSectionData,
                sort: sort,
                order: order
            })
            console.log(searchSectionData);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', searchSectionData.searchTerm);
        urlParams.set('type', searchSectionData.type);
        urlParams.set('parking', searchSectionData.parking);
        urlParams.set('furnished', searchSectionData.furnished);
        urlParams.set('offer', searchSectionData.offer);
        urlParams.set('sort', searchSectionData.sort);
        urlParams.set('order', searchSectionData.order);
        // We convert the urlparams to a string because it is initially an object
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`);
    }


    return (
        <div className="px-6 flex flex-col md:flex-row">
            <div className="searchOptionsSide py-7 border-b-2 md:border-r-2 md:min-h-screen md:pr-7">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="searchTerm flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <input 
                            type="text" 
                            id="searchTerm" 
                            name="searchTerm" 
                            placeholder="Search..." 
                            className="border rounded-md p-3 w-full" 
                            value={searchSectionData.searchTerm} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="typeSection flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Type:</label>
                        <div className="flex gap-2">
                            <input 
                                type="checkbox" 
                                id="all" 
                                name="all" 
                                className="w-5" 
                                checked={searchSectionData.type==='all'} 
                                onChange={handleChange}
                            />
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" name="rent" className="w-5"
                                onChange={handleChange} checked={searchSectionData.type==='rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="sale" name="sale" className="w-5"
                                onChange={handleChange} checked={searchSectionData.type==='sale'}
                            />
                            <span>Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" name="offer" className="w-5"
                                onChange={handleChange} checked={searchSectionData.offer}
                            />
                            <span>Offer</span>
                        </div>

                    </div>
                    <div className="amenitiesSection flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Amenities:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id="parking" name="parking" className="w-5" 
                                onChange={handleChange} checked={searchSectionData.parking}
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="furnished" name="furnished" className="w-5"
                                onChange={handleChange} checked={searchSectionData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className="sortSection flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <select onChange={handleChange} defaultValue={'createdAt_desc'} id="sort_order" className="border rounded-md p-2">
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                    <div className="btnSection">
                        <button className="bg-slate-700 text-white p-3 rounded-md uppercase hover:opacity-95 w-full">Search</button>
                    </div>
                </form>
            </div>
            <div className="listingsSide">
                <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 py-7">Listing results</h1>
            </div>
        </div>
    )
}
export default Search;