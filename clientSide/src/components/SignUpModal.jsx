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
            <div className="modal-content">
                <h2>Sign Up</h2>
                <form>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="username"/>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="password"/>
                    <button type="button">Sign Up</button>
                </form>
            </div>
        </Modal>
    );
};
export default SignUpModal;
