import PropTypes from "prop-types"
import { sendRequestViaAuth } from "../../../helpers/fetchData";
import { useState, useContext } from 'react'
import { ContactsContext } from "../Sidebar"

export default function Contact({contact, pending, setCurrentContact }) {
    const [loading, setLoading] = useState(false);
    const { contacts, setContacts } = useContext(ContactsContext);

    const handleClick =  () => {
        // set currentContact instead
        setCurrentContact(contact);
    }

    const deleteContact = () => {
        setLoading(true);
        sendRequestViaAuth('/contacts', 'DELETE', { contactId: contact.id })
            .then(() => {
                const newMutuals = contacts.mutuals.filter((user) => user.id != contact.id);
                const newPending = contacts.pending.filter((user) => user.id != contact.id);
                
                setContacts({...contacts, mutuals: newMutuals, pending: newPending});
            })
            .catch(error => {
                console.error('Error adding contact:', error);
                setLoading(false);  
            })
            .finally(() => {
                setLoading(false);
            })
    }
    if (loading) return <div>Loading contacts...</div>;

    return (
        <div onClick={handleClick}>
            <div>{contact.username}</div>
            <div>{contact.email}</div>
            {pending && <p>(Pending)</p>}
            <div onClick={deleteContact}>X</div>
        </div>
    )
}

Contact.propTypes = {
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}