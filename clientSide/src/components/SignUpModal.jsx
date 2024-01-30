import { useState } from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root') //this is for accessibiltiy purposes for screen readers

const SignUpModal = (props) => {
    const [formData, setFormData] = useState({ username:'', email:'', password:'',});

    const handleChange = (event) => {
        const inputElement = event.target;

        setFormData((prevData) => {
            const newData = {...prevData};
            newData[inputElement.name] = inputElement.value;
            return newData;
        });
    }

    const handleSubmit = (event) => {
        event.prevDefault();
        // the logic to contact the api will be here

        // then close the modal
        props.onClose();
    }

    return (
        <Modal isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="Sign Up Modal" className="modal">
            <div className="modal-content p-8 max-w-3xl w-full h-80vh bg-white rounded-md shadow-lg mx-auto">
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
                    <button type="button" className="bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-80">Sign Up</button>
                </form>
                <div className="mt-5">
                    <p>Have an account? <span className="text-green-700 cursor-pointer">Sign in</span></p>
                </div>
            </div>
        </Modal>
    );
};
export default SignUpModal;
