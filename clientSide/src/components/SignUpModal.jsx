import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Modal from 'react-modal';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearLoading, failureSignUp, startSignUp, successSignUp } from "../redux/user/userSlice";
import { OAuth } from "./OAuth";
import { useNavigate } from 'react-router-dom'

Modal.setAppElement('#root') //this is for accessibiltiy purposes for screen readers

const SignUpModal = (props) => {
    const [formData, setFormData] = useState({ username:'', email:'', password:'',});
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // handle change of input elements as user enters details
    const handleChange = (event) => {
        const inputElement = event.target;
        //console.log(inputElement.name);

        setFormData((prevData) => {
            const newData = {...prevData};
            //console.log(typeof(newData));
            newData[inputElement.name] = inputElement.value;
            //console.log(newData)
            return newData;
        });
    }

    // handle the submission of user details when user clicks submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(loading)
        dispatch(startSignUp());
        //console.log('after sign up', loading)

        try {
            const response = await axios.post('/api/auth/signup', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            // then close the modal
            props.onClose({success: true, msg: response.data.msg});
        } catch (error) {
            console.error(error.message);
            dispatch(failureSignUp(error.message));
            // this timeout will enable error message to be displayed for a period of time
             setTimeout(() => {
                dispatch(clearError());
             }, 2500)
        }
        dispatch(clearLoading());
    }

    // here when the user clicks the sign in btn because they alraedy have an account
    // this should handle it. it will call the openSignIn() props function back to parent
    const handleSignInModal = () => {
        console.log('button clicked to open signin modal');
        props.openSignIn();
    }

    // handle google authentication success
    const handleGoogleAuthSuccess = () => {
        console.log('navigating to home page');
        navigate('/');
        props.onClose()
    }

    return (
        <Modal isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="Sign Up Modal" className="modal">
            <div className="modal-content p-8 max-w-3xl w-full h-screen bg-white rounded-md shadow-lg mx-auto">
                <div className="pt-28 mx-6 sm:mx-10 relative">
                    <button onClick={props.onClose} className="absolute top-0 right-0">
                        <IoMdClose size={24}/>
                    </button>
                    <h2 className="text-3xl text-center font-semibold my-7">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <input 
                            type="text" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            placeholder="username"
                            className="border p-3 rounded-lg"
                            id="username"
                        />
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="Email"
                            className="border p-3 rounded-lg"
                            id="email"
                        />
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder="password"
                            className="border p-3 rounded-lg"
                        />
                        <button disabled={loading} type="submit" className="bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-80">
                            {loading ? 'Loading...': 'Sign up'}
                        </button>
                        <OAuth onGoogleAuthSuccess={handleGoogleAuthSuccess}/>
                    </form>
                    <div className="mt-5">
                        <p>Have an account? <button onClick={handleSignInModal} className="text-green-700 cursor-pointer">Sign in</button></p>
                    </div>
                    {error && <div className='bg-red-600 rounded-md p-3 mt-3'><p className='text-white'>Error registering user</p></div>}
                </div>
            </div>
        </Modal>
    );
};
export default SignUpModal;
