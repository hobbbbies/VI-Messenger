import { useState, useEffect, useRef} from "react"
import { sendRequestViaAuth } from "../../helpers/fetchData";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import styles from './Header.module.css';
import Sidebar from "../Sidebar/Sidebar";
import socketConstructor from '../../socket';
import useSocketSetup from '../../useSocketSetup';
import { SocketContext } from '../../context/socketContext';

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
        <div className={styles.mainContainer}>
            <Sidebar setCurrentContact={setCurrentContact}/>
            <div className={styles.chatSection}>
                <header className={styles.header}>
                    <div className={styles.userSection}>
                        <div className={styles.icon}></div>
                        <strong className={styles.chattingWith}>{currentContact?.username}</strong>
                        <small className={styles.email}>{currentContact?.email}</small>
                    </div>
                    <a className={styles.rightSide} href="/login">Change Account</a>
                </header>
                <SocketContext.Provider value={socket.current}>
                    <Outlet context={[user, currentContact]}/>
                </SocketContext.Provider>
            </div>
        </div>
    )
}
