import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import { deleteDataViaAuth } from "../../../helpers/fetchData";
import { useState } from 'react'

export default function Contact({id, email, username, contacts, setContacts}) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick =  () => {
        navigate(`/contacts/${id}`)
    }

    const deleteContact = () => {
        setLoading(true);
        deleteDataViaAuth('/contacts', { contactId: id })
            .then(() => {
                const newContacts = contacts.filter((user) => user.id != id);
                setContacts(newContacts);
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
            <div onClick={deleteContact}>X</div>
        </div>
    )
}

Contact.propTypes = {
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}