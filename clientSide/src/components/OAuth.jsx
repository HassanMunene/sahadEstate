import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { UseDispatch, useDispatch } from 'react-redux';
import { successSignIn } from '../redux/user/userSlice';

export const OAuth = () => {
    const dispatch = useDispatch();
    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            //specify which application is creating the request
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // we now only need to extract the information we need from the response
            // we get from google so that we can store the user in our database
            const {displayName, email, photoURL} = user;
            const userData = {
                name: displayName,
                email: email,
                photo: photoURL
            }
            
            const response = await axios.post('/api/auth/google', JSON.stringify(userData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.data;
            // the use the dispatch to call the method from redux to store the user
            dispatch(successSignIn(data));
        } catch (error) {
            console.log('An error occurred Authenticating with google:', error);
        }
    }

    return (
        <button onClick={handleGoogleAuth} type="button" className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">continue with google</button>
    )
}