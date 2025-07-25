import { sendRequestViaAuth } from "../../../helpers/fetchData"
import PropTypes from "prop-types";
import { useContext } from "react";
import { ContactsContext } from "../Sidebar";
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import styles from './PendingContact.module.css';

export default function PendingContact({ contactId, username, email, pendingContacts, setPendingContacts }) {
    const { setContacts } = useContext(ContactsContext);
    const addContact = () => {
        sendRequestViaAuth('/contacts', 'POST', { contactId })
            .then((data) => {
                setContacts(data.data);
                const newPending = pendingContacts.filter((contact) => {
                    return contact.id !== contactId;
                });
                setPendingContacts(newPending);
            })
            .catch((error) => {
                console.error("Error with adding contact from pending: ", error);
            })
    }

    const denyContact = () => {
        sendRequestViaAuth('/contacts/pending', 'DELETE', {contactId})
            .then(() => {
                const newPending = pendingContacts.filter((contact) => {
                    return contact.id !== contactId;
                })
                setPendingContacts(newPending);
            }).catch(error => {
                console.error("Error with removing contact from pending: ", error);
            });
    }

    return (
        <div>
            <div className={styles.userInfo}>
                <div className={styles.username}>{username}</div>
                <small className={styles.email}>{email}</small>
            </div>
            <Check onClick={addContact} className={styles.add}/>
            <X onClick={denyContact} className={styles.remove}/>
        </div>
    )
}

PendingContact.propTypes = {
    contactId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    pendingContacts: PropTypes.array.isRequired,
    setPendingContacts: PropTypes.func.isRequired
};