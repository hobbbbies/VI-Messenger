import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import { deleteDataViaAuth } from "../../../helpers/fetchData";
import { useState, useContext } from 'react'
import { ContactsContext } from "../Sidebar"

export default function Contact({id, email, username, pending }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { contacts, setContacts } = useContext(ContactsContext);

    const handleClick =  () => {
        navigate(`/contacts/${id}`)
    }

    const deleteContact = () => {
        setLoading(true);
        deleteDataViaAuth('/contacts', { contactId: id })
            .then(() => {
                const newContacts = contacts.filter((user) => user.id != id);
                setContacts([newContacts]);
            })
            .catch(error => {
                // setMessage(`Error: ${error.message}`);
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
            <div>{username}</div>
            <div>{email}</div>
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