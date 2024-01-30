import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Modal from 'react-modal';
import axios from "axios";

Modal.setAppElement('#root') //this is for accessibiltiy purposes for screen readers

const SignUpModal = (props) => {
    const [formData, setFormData] = useState({ username:'', email:'', password:'',});

    const handleChange = (event) => {
        const inputElement = event.target;
        //console.log(inputElement.name);

        setFormData((prevData) => {
            const newData = {...prevData};
            newData[inputElement.name] = inputElement.value;
            return newData;
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/auth/signup', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //const data = await response.json();
            console.log(response.data);
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
        // then close the modal
        props.onClose();
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
                        <button type="submit" className="bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-80">Sign Up</button>
                    </form>
                    <div className="mt-5">
                        <p>Have an account? <span className="text-green-700 cursor-pointer">Sign in</span></p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default SignUpModal;
