import { sendRequestNoAuth } from "../../../helpers/fetchData";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function DemoLogin({ demoEmail, demoPassword, demoUsername }) {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        sendRequestNoAuth('/auth/login', 'POST', { email: demoEmail, password: demoPassword })
            .then(data => {
            localStorage.setItem('token', data.token);
            navigate('/contacts');
            }).catch(error => {
                setError(error.message);
                console.error('Failed to submit data:', error);
            })
    }
    
    return (
        <>
        <a href="#" onClick={handleClick}> {demoUsername}</a>
        {error && <p>Error loading demo: {error}</p>}
        </>
    )
}