import { sendRequestViaAuth } from "../../../helpers/fetchData"
import { useState, useContext } from "react";
import { ContactsContext } from "../Sidebar"


export default function Dropdown({ setDropdown }) {
    const [formData, setFormData] = useState({ search: '' });
    const [loading, setLoading] = useState(false);
    const { setContacts } = useContext(ContactsContext);

    const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleChange = (e) => {
        // Can and probabally should be using a state instead - like in Textbar.jsx
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        let body = {};
        validateEmail(formData.search) ? body.email = formData.search : body.username = formData.search; 
        sendRequestViaAuth('/contacts', 'POST', body)
            .then((data) => {
                setContacts(data.data);
                setDropdown(false);
                setFormData({ search: '' }); // Clear form
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
    
    return (
        <div>
            <form onSubmit={submitForm}>
                <input
                    name="search"
                    type="text"
                    placeholder="Email address or username"
                    onChange={handleChange}
                    required
                    aria-required>
                </input>
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Contact'}
                </button>
            </form>
        </div>
    )
}
