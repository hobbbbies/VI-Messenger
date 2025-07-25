import { useState, useEffect } from "react"
import { sendRequestViaAuth, sendRequestNoAuth } from "../../helpers/fetchData";
import { useNavigate, useLocation, Outlet, useParams } from "react-router-dom";
import styles from './Header.module.css';
import Sidebar from "../Sidebar/Sidebar";

export default function Header() {
    const [user, setUser] = useState(null)
    const [currentContact, setCurrentContact] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // const { contactId } = useParams();

    useEffect(() => {
        setLoading(true);
        sendRequestViaAuth('/auth/user')
            .then(data => {
                setUser(data.data);
            }).catch(error => {
                console.error('User may not be logged in: ', error);
                if (location.pathname != '/login') navigate('/login');
            }).finally(() => {
                setLoading(false);
            })
        // Get other user too NOT NEEDED
        // if (currentContact) {
        //     sendRequestNoAuth(`/contacts/${currentContact.id}`)
        //         .then(data => {
        //             setCurrentContact(data.data);
        //         }).catch(error => {
        //             console.error('error fetching current contact: ', error);
        //         }) 
        // }
    }, [location, navigate]);

    if (loading) return <div>Loading contacts...</div>;

    return (
        <div className={styles.mainContainer}>
            <Sidebar setCurrentContact={setCurrentContact}/>
            <div className={styles.chatSection}>
                <header className={styles.header}>
                    <div className={styles.userSection}>
                        <div className={styles.icon}></div>
                        <strong className={styles.chattingWith}>{currentContact?.username}</strong>
                        <small className={styles.email}>{currentContact?.email}</small>
                    </div>
                    <a className={styles.rightSide} href="/login">Login</a>
                </header>
                <Outlet context={[user, currentContact]}/>
            </div>
        </div>
    )
}