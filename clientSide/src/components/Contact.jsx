import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = (props) => {
    const [landlord, setLandloard] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchLandloard = async () => {
            try {
                const response = await axios.get(`/api/user/${props.listing.userRef}`);
                if(response.data.success === false) {
                    console.log(response.data.messag);
                    return;
                }
                const responseData = response.data;
                setLandloard(responseData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLandloard();
    }, [props.listing.userRef])

    const handleChange = (e) => {
        setMessage(e.target.value);
    };
    
    return (
        <>
        {landlord && (
            <div className="flex flex-col gap-2">
                <p>
                    Contact <span className="font-semibold">{landlord.username}</span>{' '} 
                    for{' '}<span className="font-semibold">{props.listing.name.toLowerCase()}</span>
                </p>
                <textarea 
                    name="message" 
                    id="message" 
                    cols="30" 
                    rows="2"
                    value={message}
                    onChange={handleChange}
                    placeholder="Enter your message here..."
                    className="w-full border p-3 rounded-lg"
                ></textarea>
                <Link 
                to={`mailto:${landlord.email}?subject=Regarding ${props.listing.name}&body${message}`} 
                className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95">
                    Send Message
                </Link>
            </div>
        )}
        </>
    )
}
export default Contact