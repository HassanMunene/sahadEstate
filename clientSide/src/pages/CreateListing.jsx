import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from "../firebase";

const CreateListing = () => {
    // for now the file state will contain an empty array
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    const [imageUploadError, setImageUploadError] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageSubmit = (e) => {
        e.preventDefault();

        if(files.length > 0 && files.length < 7) {
            // create an array that will contain all promises
            setUploading(true);
            const promises = [];
            for (let i=0; i<files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            //console.log(promises);
            Promise.all(promises)
            .then((urls) => {
                setFormData({...formData, imageUrls: urls});
                setImageUploadError(false);
                setUploading(false);
            })
            .catch((error) => {
                console.log(error);
                setImageUploadError('Image upload failed (2mb max for each image');
                setUploading(false);
            })
        } else {
            setUploading(false);
            setImageUploadError('You can only upload between 1 and 6 images');
        }
    }
    const storeImage = async(file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', 
                (snapshot)=> {
                    const snap = snapshot;
                }, 
                (error)=> {
                    reject(error);
                }, 
                ()=> { 
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => resolve(downloadURL));
                }
            )
        })
    }

    const handleDeleteImage = (index) => {
        console.log('delete button clicked')
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((url, i) => i !== index)
        });
    }

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
                            <input 
                                type="file" 
                                id="images" 
                                name="images" 
                                accept="image/*" 
                                multiple 
                                onChange={(e) => setFiles(e.target.files)}
                                className="p-3 border border-gray-300 rounded w-full"
                            />
                            <button type="button" onClick={handleImageSubmit} className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                                {uploading ? 'uploading...' : 'upload'}
                            </button>
                        </div>
                        <p className="text-red-700">{imageUploadError && imageUploadError}</p>
                        {
                            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => {
                                return (
                                    <div key={url} className="flex justify-between items-center border p-3 rounded">
                                        <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg"/>
                                        <button type="button" onClick={ () => handleDeleteImage(index)} className="text-red-700 uppercase hover:opacity-75">Delete</button>
                                    </div>
                                )
                            })
                        }
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