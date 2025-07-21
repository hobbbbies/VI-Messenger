import { deleteDataViaAuth, postDataViaAuth } from "../../../helpers/fetchData"
import PropTypes from "prop-types";
import { useContext } from "react";
import { ContactsContext } from "../Sidebar"

export default function PendingContact({ contactId, username, email, pendingContacts, setPendingContacts }) {
    const { contacts, setContacts } = useContext(ContactsContext);
    const addContact = () => {
        postDataViaAuth('/contacts', { contactId })
            .then((data) => {
                setContacts([...contacts, data.data]);
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
        deleteDataViaAuth('/contacts/pending', {contactId})
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
            <div>{username}</div>
            <div>{email}</div>
            <div onClick={addContact}>+</div>
            <div onClick={denyContact}>X</div>
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