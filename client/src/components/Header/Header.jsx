import { useState, useEffect, useRef} from "react"
import { sendRequestViaAuth } from "../../helpers/fetchData";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import styles from './Header.module.css';
import Sidebar from "../Sidebar/Sidebar";
import socketConstructor from '../../socket';
import useSocketSetup from '../../useSocketSetup';
import { SocketContext } from '../../context/socketContext';
import NotificationPopup from "../NotificationPopup.jsx/NotificationPopup";
import VE from "../VE/VE";

export default function Header() {
    const [user, setUser] = useState(null)
    const [currentContact, setCurrentContact] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const socket = useRef(null);

    // Incoming messages
    useEffect(() => {
        socket.current = socketConstructor(user?.id)
    }, [user?.id])

    // Adds essential events to socket
    useSocketSetup(socket.current);

    useEffect(() => {
        sendRequestViaAuth('/auth/user')
            .then(data => {
                setUser(data.data);
            }).catch(error => {
                console.error('User may not be logged in: ', error);
                if (location.pathname != '/login') navigate('/login');
            }).finally(() => {
            })
    }, [location, navigate]);

    return (
        <>
        <div className={styles.mainContainer}>
            <Sidebar setCurrentContact={setCurrentContact}/>
            <div className={styles.chatSection}>
                <NotificationPopup />
                <header className={styles.header}>
                    <div className={styles.userSection}>
                        <div className={styles.icon}></div>
                        <strong className={styles.chattingWith}>{currentContact?.username}</strong>
                        <small className={styles.email}>{currentContact?.email}</small>
                    </div>
                    <div className={styles.rightSide}>
                        <VE />
                        <a href="/login">Change Account</a>
                    </div>
                </header>
                <SocketContext.Provider value={socket.current}>
                    <Outlet context={[user, currentContact]}/>
                </SocketContext.Provider>
            </div>
        </div>
        </>
    )
}
