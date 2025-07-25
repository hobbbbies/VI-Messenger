import { useEffect, useState } from "react"
import PendingDropdown from './PendingDropdown'
import { sendRequestViaAuth } from "../../../helpers/fetchData";
import styles from './Pending.module.css'

export default function Pending({ contacts }) {
    const [pendingContacts, setPendingContacts] = useState([]);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => {
        setDropdown(!dropdown);    
    };

    useEffect(() => {
        sendRequestViaAuth('/contacts/pending')
            .then(data => {
                setPendingContacts(data.data);
            })
            .catch(error => {
                console.error('Failed to fetch pending contacts:', error);
            });
    }, [contacts]);

    return (
        <div className={styles.pendingContainer}>
            <button className={styles.pendingButton} onClick={handleClick}>
                <span className={styles.pendingCount}>{pendingContacts.length}</span>
                Show Pending
            </button>
            {dropdown && <PendingDropdown pendingContacts={pendingContacts} setPendingContacts={setPendingContacts}/>}
        </div>
    );
}