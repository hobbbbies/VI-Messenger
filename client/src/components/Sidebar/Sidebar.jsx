import { useEffect, useState } from "react";
import Contact from "./Contact/Contact";
import {fetchDataViaAuth} from "../../helpers/fetchData";
import Dropdown from "./Dropdown/Dropdown";

export default function Sidebar() {
    const [contacts, setContacts] = useState([]);
    const [dropdown, setDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClick = () => {
        setDropdown(true);
    }
    
    useEffect(() => {
        setLoading(true);
        
        fetchDataViaAuth('/contacts')
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
        <aside>
            <div>
                <h2>Contacts</h2>
                <button onClick={handleClick}>New Contact</button>
                {dropdown && <Dropdown setDropdown={setDropdown} contacts={contacts} setContacts={setContacts}/>} 
            </div>
            <ul>
                {console.log('contacts: ', contacts)}
                {contacts.map(contact => {
                    return <Contact 
                        key={contact.id} 
                        id={contact.id} 
                        email={contact.email} 
                        username={contact.username}
                        contacts={contacts}
                        setContacts={setContacts}
                        />
                })}
            </ul>
        </aside>
    )
}