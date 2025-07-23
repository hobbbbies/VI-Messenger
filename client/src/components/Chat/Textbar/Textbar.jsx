import { useState, useRef } from 'react'
import { sendRequestViaAuth } from '../../../helpers/fetchData';

export default function Textbar({ conversation, setConversation, contactId, text, setText, editId, setEditId }) {
    const [formData, setFormData] = useState({ content: '' });
    const inputRef = useRef(null);

    const handleChange = (e) => {
        //This causes conversation to rerender on every input.
        setText(e.target.value);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (!editId) {
            sendRequestViaAuth('/contacts/messages', 'POST', { content: text, contactId: contactId})
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
            sendRequestViaAuth('/contacts/messages', 'PUT', { content: text, messageId: editId})
                .then((data) => {
                    // Creates duplicate instead of replacing old
                    const updatedArray = conversation.map((message) => {
                           if (message.id === editId) {
                                return data.data; // Return the new value for the target element
                            }
                        return message; // Return the original item for all other elements
                    });
                    setConversation(updatedArray);
                    setEditId(null);
                    setText('');
                }).catch(error => {
                    console.error('Error updating message: ', error);
                });
        }
    }

    return (
        <form onSubmit={submitForm}>
            <input type="text" onChange={handleChange} name="content" ref={inputRef} value={text}></input>
            <button>Send</button>
        </form>
    )
}