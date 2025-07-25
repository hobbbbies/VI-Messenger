import { useEffect, useState, createContext } from "react";
import Contact from "./Contact/Contact";
import {sendRequestViaAuth} from "../../helpers/fetchData";
import Dropdown from "./Dropdown/Dropdown";
import Pending from "./Pending/Pending";
import styles from './Sidebar.module.css'

export const ContactsContext = createContext();

export default function Sidebar({ setCurrentContact }) {
    const [contacts, setContacts] = useState({});
    const [dropdown, setDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const value = {
        contacts,
        setContacts,
        loading,
        error
    };

    const handleClick = () => {
        setDropdown(!dropdown);    
    }
    
    useEffect(() => {
        setLoading(true);
        
        sendRequestViaAuth('/contacts')
            .then(data => {
                setContacts(data.data); 
                setError(null);
            })
            .catch(error => {
                setError(error.message);
                console.error('Failed to fetch contacts:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])

    if (loading) return <div>Loading contacts...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ContactsContext.Provider value={value} >
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>Contacts</h2>
                    <div className={styles.addContactContainer}>
                        <button className={styles.newContact} onClick={handleClick}>New Contact</button>
                        {dropdown && <Dropdown setDropdown={setDropdown}/>}
                    </div>
                </div>
                <ul className={styles.contactList}>
                    {contacts.mutuals.map(contact => {
                        return <Contact 
                            key={contact.id} 
                            contact={contact}
                            pending={false}
                            setCurrentContact={setCurrentContact}
                            />
                    })}
                    {contacts.pending.map(contact => {
                        return <Contact 
                            key={contact.id} 
                            contact={contact}
                            pending={true}
                            setCurrentContact={setCurrentContact}
                            />
                    })}
                </ul>
                <Pending contacts={contacts}/>
            </aside>
        </ContactsContext.Provider>
    )
}