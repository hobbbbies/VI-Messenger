import PropTypes from "prop-types"
import { sendRequestViaAuth } from "../../../helpers/fetchData";
import { useState, useContext } from 'react'
import { ContactsContext } from "../Sidebar"
import styles from './Contact.module.css'
import { useSearchParams } from "react-router-dom";

export default function Contact({contact, pending, setCurrentContact }) {
    const [loading, setLoading] = useState(false);
    const { contacts, setContacts } = useContext(ContactsContext);
    const [, setSearchParams] = useSearchParams();

    const handleClick =  () => {
        // set currentContact instead
        setSearchParams({ pending: pending });
        setCurrentContact(contact);
    }

    const deleteContact = (e) => {
        e.stopPropagation();
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
        <div onClick={handleClick} className={styles.contact}>
            <div>{contact.username}</div>
            <div>{contact.email}</div>
            {pending && <p>(Pending)</p>}
            <a href='#' className={styles.deleteBtn} onClick={deleteContact}>X</a>
        </div>
    )
}

Contact.propTypes = {
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}