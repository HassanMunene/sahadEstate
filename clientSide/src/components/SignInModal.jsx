import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from 'react-modal';


Modal.setAppElement('#root'); //accessibility purposes

const SignInModal = (props) => {
    const [formData, setFormData] = useState({email: '', password: ''});

    const handleChange = (event) => {
        const inputElement = event.target;

        setFormData((prevData) => {
            const newData = {...prevData};
            newData[inputElement.name] = inputElement.value;
            return newData;
        });
    }

    return (
        <Modal isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="Sign in modal" className="modal">
            <div className='bg-white w-full max-w-3xl h-screen rounded-md shadow-lg mx-auto p-8'>
                <div className="pt-28 mx-6 sm:mx-10 relative">
                    <button onClick={props.onClose} className='absolute top-0 right-0'>
                        <IoMdClose size={24} />
                    </button>
                    <h2 className='text-3xl text-center font-semibold my-7'>Sign In</h2>
                </div>
            </div>
        </Modal>
    )
};

export default SignInModal;