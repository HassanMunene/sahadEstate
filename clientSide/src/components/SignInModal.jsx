import axios from 'axios';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from 'react-modal';


Modal.setAppElement('#root'); //accessibility purposes

const SignInModal = (props) => {
    const [formData, setFormData] = useState({email: '', password: ''});
    // have a useState to handle errors
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const inputElement = event.target;

        setFormData((prevData) => {
            const newData = {...prevData};
            newData[inputElement.name] = inputElement.value;
            return newData;
        });
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        // handle submition of the details for authorisation
        try {
            const response = await axios.post('/api/auth/signin', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            props.onClose();
        } catch (error) {
            console.error('Error', error.message);
            setError(error.message);
            setTimeout(() =>{
                setError(null);
            }, 2000);
        }
    }

    // here if user does not have an account and they want to register then we refer
    // them to sign Up modal
    const handleSignUpModal = () => {
        console.log('button clicked');
        props.openSignUp();
    }

    return (
        <Modal isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="Sign in modal" className="modal">
            <div className='bg-white w-full max-w-3xl h-screen rounded-md shadow-lg mx-auto p-8'>
                <div className="pt-28 mx-6 sm:mx-10 relative">
                    <button onClick={props.onClose} className='absolute top-0 right-0'>
                        <IoMdClose size={24} />
                    </button>
                    <h2 className='text-3xl text-center font-semibold my-7'>Sign In</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className='border p-3 rounded-lg' 
                            placeholder='Email' 
                            id='email'
                        />

                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className='border p-3 rounded-lg' 
                            placeholder='Password' 
                            id='password'
                        />
                        <button type="submit" className="bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-80">
                            sign in
                        </button>
                    </form>
                    <div className="mt-5">
                        <p>Dont have an account? <button onClick={handleSignUpModal} className="text-green-700 cursor-pointer">Sign up</button></p>
                    </div>
                    {error && <div className='bg-red-600 rounded-md p-3 mt-3'><p className='text-white'>Invalid email or password</p></div>}
                </div>
            </div>
        </Modal>
    )
};

export default SignInModal;