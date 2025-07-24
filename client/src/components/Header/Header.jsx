import { useState, useEffect } from "react"
import { sendRequestViaAuth, sendRequestNoAuth } from "../../helpers/fetchData";
import { useNavigate, useLocation, Outlet, useParams } from "react-router-dom";
import styles from './Header.module.css';

export default function Header() {
    const [user, setUser] = useState(null)
    const [currentContact, setCurrentContact] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { contactId } = useParams();

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
            // Get other user too
        sendRequestNoAuth(`/contacts/${contactId}`)
            .then(data => {
                setCurrentContact(data.data);
            }).catch(error => {
                console.error('error fetching current contact: ', error);
            }) 
    }, [location, navigate, contactId]);

    if (loading) return <div>Loading contacts...</div>;

    return (
        <>
            <header className={styles.header}>
                <div className={styles.userSection}>
                    <p className={styles.chattingWith}></p>
                </div>
                <a className={styles.rightSide} href="/login">Login</a>
            </header>
            <Outlet context={[user, currentContact]}/>
        </>
    )
}