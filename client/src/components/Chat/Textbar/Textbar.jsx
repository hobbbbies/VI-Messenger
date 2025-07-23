import { useState, useRef } from 'react'
import { postDataViaAuth } from '../../../helpers/fetchData';

export default function Textbar({ conversation, setConversation, contactId, presetText }) {
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
        if (!presetText.length) {
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
        } else { // Editing mode
            
        }
    }

    return (
        <form onSubmit={submitForm}>
            <input type="text" onChange={handleChange} name="content" ref={inputRef} value={presetText}></input>
            <button>Send</button>
        </form>
    )
}