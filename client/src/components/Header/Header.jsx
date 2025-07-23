import { useState, useEffect } from "react"
import { sendRequestViaAuth } from "../../helpers/fetchData";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

export default function Header() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        sendRequestViaAuth('/auth/user')
            .then(data => {
                setUser(data.data);
            }).catch(error => {
                console.error('User may not be logged in: ', error);
                if (location.pathname != '/auth/login') navigate('/auth/login');
            }).finally(() => {
                setLoading(false);
            })

    }, [location, navigate]);

    if (loading) return <div>Loading contacts...</div>;

    return (
        <header>
            <div>Welcome, {user?.username}</div>
            <a href="/login">Login</a>
            <Outlet context={user}/>
        </header>
    )
}