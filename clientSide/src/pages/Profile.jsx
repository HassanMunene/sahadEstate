import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable }from 'firebase/storage'
import { app } from "../firebase";
import axios from "axios";
import { 
    updateUserStart, 
    updateUserSuccess, 
    updateUserFailure, 
    deleteUseFailure, 
    deleteUseStart, 
    deleteUserSuccess, 
    startSignOut, 
    failureSignOut, 
    successSignOut 
} from "../redux/user/userSlice";
import { Link }from 'react-router-dom';


const Profile = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const loading = useSelector((state) => state.user.loading);
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    // set a variable that will hold the file uploaded using useState
    const [file, setFile] = useState(undefined);
    // track the % of the file upload progress
    const [imagePercentage, setImagePercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const [showListingsError, setShowListingsError] = useState(false);

    // then we will use useEffect hook to upload the file to firebase storage
    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file])

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name //to always get a unique filename
        const storageRef = ref(storage, fileName);
        const uploadFile = uploadBytesResumable(storageRef, file);

        uploadFile.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercentage(Math.round(progress))
            },
            (error) => {
                setFileUploadError(true);
                console.log(error);
            },
            () => {
                getDownloadURL(uploadFile.snapshot.ref).then
                ((downloadURL) => {
                    setFormData({...formData, avatar: downloadURL});
                })
            }
        )
    }
    const handleChange = (event) => {
        //get the input element triggering the change
        const inputElement = event.target
        // set the form data with the new change. key and value
        setFormData ((prevData) => {
            const newData = {...formData};
            newData[inputElement.name] = inputElement.value;
            return newData;
        })
    }
    const handleSubmit = async (event) => {
        // prevent reloading of the page which is a default behaviour
        event.preventDefault();
        
        try {
            dispatch(updateUserStart());
            const response = await axios.patch(`/api/user/update/${currentUser._id}`, JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            if(response.data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(response.data.user));
            setUpdateSuccess(true)
            setTimeout(()=> {
                setUpdateSuccess(false);
            }, 2000)
        } catch (error) {
            console.log(error.message);
            dispatch(updateUserFailure(error.message));
        }
    }
    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUseStart());
            const response = await axios.delete(`/api/user/delete/${currentUser._id}`);
            if (response.data.success === false) {
                dispatch(deleteUseFailure(response.data.message));
                return;
            }
            dispatch(deleteUserSuccess());
        } catch (error) {
            console.log(error.message);
            dispatch(deleteUseFailure(error.message));
        }
    }
    const handleSignOutUser = async () => {
        try {
            dispatch(startSignOut());
            const response = await axios.get('/api/auth/signout');
            if (response.data.success === false) {
                dispatch(failureSignOut(response.data.message));
                return;
            }
            dispatch(successSignOut());
        } catch (error) {
            console.log(error);
            dispatch(failureSignOut(error.message));
        }
    }
    const handleShowListings = async () => {
        try {
            setShowListingsError(false);
            const response = await axios.get(`/api/user/listings/${currentUser._id}`);
            if (response.data.success === false) {
                setShowListingsError(true);
                return
            }
            //console.log(response.data);
            setUserListings(response.data);
        } catch (error) {
            setShowListingsError(true);
        }
    }
    const handleDeleteListing = async (listingId) => {
        try {
            const response = await axios.delete(`/api/listing/delete/${listingId}`);
            if (response.data.success === false) {
                console.log(data.message);
                return;
            }
            setUserListings((prevListings) => {
                return prevListings.filter((listing) => listing._id !== listingId);
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="px-6 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input onChange={(event) => setFile(event.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
                <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"/>
                <p className="self-center">
                    {
                        fileUploadError ?
                            <span className="text-red-700">Error image upload(img must be less than 2mb)</span>
                            :
                            imagePercentage > 0 && imagePercentage < 100 ?
                                <span className="text-green-700">{`uploading ${imagePercentage}`}</span>
                                :
                                imagePercentage === 100 ?
                                    <span className="text-green-900">Successfully uploaded</span>
                                    : ""
                    }
                </p>
                <input type="text" name="username" id="username" defaultValue={currentUser.username} onChange={handleChange} placeholder="username" className="border p-3 rounded-lg" />
                <input type="email" name="email" id="email" defaultValue={currentUser.email} onChange={handleChange} placeholder="email" className="border p-3 rounded-lg" />
                <input type="password" name="password" id="password" onChange={handleChange} placeholder="password" className="border p-3 rounded-lg" />
                <button disabled={loading} type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    {loading ? 'loading...': 'update'}
                </button>
                <Link to={"/create-listing"} className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95">
                    create listing
                </Link>
            </form>
            <div className="flex justify-between mt-5">
                <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
                <span onClick={handleSignOutUser} className="text-red-700 cursor-pointer">Sign out</span>
            </div>
            <div className="uppercase text-green-700">
                {updateSuccess ? 'updated successfully': ''}
            </div>
            <button onClick={handleShowListings} className="text-green-700 w-full">
                show listings
            </button>
            <p>
                {
                    showListingsError ? 'An error occurred showing listings' : ''
                }
            </p>
            {userListings && userListings.length > 0 && 
            userListings.map((listing) => {
                return (
                    <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4 mt-7">
                        <Link to={`/listing/${listing._id}`}>
                            <img src={listing.imageUrls[0]} alt="cover image" className="w-16 h-16 object-contain"/>
                        </Link>
                        <Link to={`/listing/${listing._id}`} className="text-slate-700 font-semibold hover:underline truncate flex-1">
                            <p>{listing.name}</p>
                        </Link>
                        <div className="flex flex-col items-center">
                            <button onClick={() => handleDeleteListing(listing._id)} className="text-red-700 uppercase">Delete</button>
                            <button className="text-green-700 uppercase">Edit</button>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}
export default Profile;