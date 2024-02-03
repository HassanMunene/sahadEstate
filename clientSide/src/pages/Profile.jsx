import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable }from 'firebase/storage'
import { app } from "../firebase";

const Profile = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const fileRef = useRef(null);
    // set a variable that will hold the file uploaded using useState
    const [file, setFile] = useState(undefined);
    // track the % of the file upload progress
    const [imagePercentage, setImagePercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    console.log(formData)
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
    return (
        <div className="px-6 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4">
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
                <input type="text" name="username" id="username" placeholder="username" className="border p-3 rounded-lg" />
                <input type="email" name="email" id="email" placeholder="email" className="border p-3 rounded-lg" />
                <input type="text" name="password" id="password" placeholder="password" className="border p-3 rounded-lg" />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">update</button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">Delete account</span>
                <span className="text-red-700 cursor-pointer">Sign out</span>
            </div>
        </div>
    )
}
export default Profile;