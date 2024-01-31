import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Modal from 'react-modal';
import axios from "axios";

Modal.setAppElement('#root') //this is for accessibiltiy purposes for screen readers

const SignUpModal = (props) => {
    const [formData, setFormData] = useState({ username:'', email:'', password:'',});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
        setLoading(true);
        try {
            const response = await axios.post('/api/auth/signup', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //const data = await response.json();
            console.log(response.data);
            // then close the modal
            props.onClose({success: true, msg: response.data.msg});
        } catch (error) {
            console.error('Error sending data to backend:', error.message);
            setError(error.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
        setError(null);
    }

    // here when the user clicks the sign in btn because they alraedy have an account
    // this should handle it. it will call the openSignIn() props function back to parent
    const handleSignInModal = () => {
        console.log('button clicked');
        props.openSignIn();
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
                    </form>
                    <div className="mt-5">
                        <p>Have an account? <button onClick={handleSignInModal} className="text-green-700 cursor-pointer">Sign in</button></p>
                    </div>
                    {error && <p className="text-red-500 mt-5">{error}</p>}
                </div>
            </div>
        </Modal>
    );
};
export default SignUpModal;
