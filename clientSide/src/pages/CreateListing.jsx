const CreateListing = () => {
    return (
        <div className="px-6">
            <main className="max-w-4xl mx-auto">
                <h1 className="capitalize text-3xl font-semibold text-center my-7">create Listing</h1>
                <form className="flex flex-col sm:flex-row">
                    <div className="flex flex-col gap-4 flex-1">
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
                        <div className="">
                            <div className="flex items-center gap-2">
                                <input type="number" name="bedrooms" id="bedrooms" min="1" max="10" required className="p-3 border border-gray-300 rounded-lg w-16"/>
                                <p>Beds</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="number" name="bathrooms" id="bathrooms" min="1" max="10" required className="p-3 border border-gray-300 rounded-lg w-16"/>
                                <p>Baths</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="number" name="regularPrice" id="regularPrice" min="1" max="10" required className="p-3 border border-gray-300 rounded-lg w-16"/>
                                <p>Regular price</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="number" name="discountedPrice" id="discountedPrice" min="1" max="10" required className="p-3 border border-gray-300 rounded-lg w-16"/>
                                <p>Baths</p>
                            </div>
                        </div>
                    </div>
                </form>
        </main>
        </div>
    )
}

export default CreateListing;