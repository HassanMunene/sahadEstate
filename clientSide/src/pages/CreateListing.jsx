const CreateListing = () => {
    return (
        <div className="px-6">
            <main className="max-w-4xl mx-auto">
                <h1 className="capitalize text-3xl font-semibold text-center my-7">create Listing</h1>
                <form className="flex flex-col sm:flex-row gap-4">
                    <div className="left-col flex flex-col gap-4 flex-1">
                        <input type="text" name="name" id="name" placeholder="Name" className="border p-3 rounded-lg" maxLength="62" minLength="10" required/>
                        <textarea type="text" name="description" id="description" placeholder="Description" className="border p-3 rounded-lg" required/>
                        <input type="text" name="address" id="address" placeholder="Address" className="border p-3 rounded-lg"/>
                        <div className="flex gap-6 flex-wrap">
                            <div className="flex gap-2">
                                <input type="checkbox" id="sell" name="sell" className="w-5"/>
                                <span>Sell</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="checkbox" id="rent" name="rent" className="w-5"/>
                                <span>Rent</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="checkbox" id="parking" name="parking" className="w-5"/>
                                <span>Parking spot</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="checkbox" id="furnished" name="furnished" className="w-5"/>
                                <span>Furnished</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="checkbox" id="offer" name="offer" className="w-5"/>
                                <span>Offer</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2">
                                <input type="number" name="bedrooms" id="bedrooms" min="1" max="10" required className="w-16 p-2 border border-gray-300 rounded-lg"/>
                                <p>Beds</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="number" name="bathrooms" id="bathrooms" required className="w-16 p-2 border border-gray-300 rounded-lg"/>
                                <p>Baths</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="number" name="regularPrice" id="regularPrice" required className="w-24 p-2 border border-gray-300 rounded-lg"/>
                                <div className="flex flex-col items-center">
                                    <p>Regular price</p>
                                    <span className="text-xs">(Ksh / month)</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="number" name="discountedPrice" id="discountedPrice" min="1" max="10" required className="w-24 p-2 border border-gray-300 rounded-lg"/>
                                <div className="flex flex-col items-center">
                                    <p>Discounted price</p>
                                    <span className="text-xs">(Ksh / month)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-col flex flex-col flex-1 gap-4">
                        <p className="font-semibold">Images: 
                        <span className="font-normal text-gray-600 ml-2">The first image will be cover (max 6)</span>
                        </p>
                        <div className="flex gap-4">
                            <input type="file" id="images" name="images" accept="image/*" multiple className="p-3 border border-gray-300 rounded w-full"/>
                            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">upload</button>
                        </div>
                        <button className="uppercase p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80">
                            create listing
                        </button>
                    </div>
                </form>
        </main>
        </div>
    )
}

export default CreateListing;