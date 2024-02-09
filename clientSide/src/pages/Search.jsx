const Search = () => {
    return (
        <div className="px-6 flex flex-col md:flex-row">
            <div className="searchOptionsSide py-7 border-b-2 md:border-r-2 md:min-h-screen md:pr-7">
                <form className="flex flex-col gap-8">
                    <div className="searchTerm flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <input 
                            type="text" 
                            id="searchTerm" 
                            name="searchTerm" 
                            placeholder="Search..." 
                            className="border rounded-md p-3 w-full"
                        />
                    </div>
                    <div className="typeSection flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Type:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id="all" name="all" className="w-5"/>
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" name="rent" className="w-5"/>
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="sale" name="sale" className="w-5"/>
                            <span>Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" name="offer" className="w-5"/>
                            <span>Offer</span>
                        </div>

                    </div>
                    <div className="amenitiesSection flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Amenities:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id="parking" name="parking" className="w-5"/>
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="furnished" name="furnished" className="w-5"/>
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className="sortSection flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <select id="sort_order" className="border rounded-md p-2">
                            <option value="">Price high to low</option>
                            <option value="">Price low to high</option>
                            <option value="">Latest</option>
                            <option value="">Oldest</option>
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