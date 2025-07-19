import { useEffect, useState } from "react";
import Contact from "./Contact/Contact";
import fetchDataViaAuth from "../../helpers/fetchData";

export default function Sidebar() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true);
        
        fetchDataViaAuth('/contacts')
            .then(data => {
                setContacts(data.data || data); // Handle different response structures
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
        <sidebar>
            <ul>
                {contacts.map(contact => {
                    return <Contact key={contact.id} id={contact.id} email={contact.email} username={contact.username}/>
                })}
            </ul>
        </sidebar>
    )
}