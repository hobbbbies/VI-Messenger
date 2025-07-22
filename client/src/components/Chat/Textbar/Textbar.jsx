import { useState, useRef } from 'react'
import { postDataViaAuth } from '../../../helpers/fetchData';

export default function Textbar({ conversation, setConversation, contactId }) {
    const [formData, setFormData] = useState({ content: '' });
    const inputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        console.log("sending ", formData.content);
        postDataViaAuth('/contacts/messages', { content: formData.content, contactId: contactId})
            .then((data) => {
                setConversation([...conversation, data.data])
                setFormData({ content: '' }); // Clear form
            })
            .catch(error => {
                // setMessage(`Error: ${error.message}`);
                console.error('Error sending message:', error);
            }).finally(() => {
                inputRef.current.value = "";
            })
    }

    return (
        <form onSubmit={submitForm}>
            <input type="text" onChange={handleChange} name="content" ref={inputRef}></input>
            <button>Send</button>
        </form>
    )
}