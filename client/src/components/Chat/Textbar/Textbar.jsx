import { useState, useRef } from 'react'
import { sendRequestViaAuth } from '../../../helpers/fetchData';
import styles from './Textbar.module.css'
import socketConstructor from '../../../socket';

export default function Textbar({ conversation, setConversation, userId, contactId, text, setText, editId, setEditId }) {
    const [formData, setFormData] = useState({ content: '' });
    const socket = useRef(socketConstructor(userId));

    const handleChange = (e) => {
        //This causes conversation to rerender on every input.
        setText(e.target.value);
    };

    const submitForm = async (e) => {
        // Emit socket event for new message - REVIEW
        e.preventDefault();
        if (!editId) {
            socket.current.emit('send-message', text, contactId);
            sendRequestViaAuth('/contacts/messages', 'POST', { content: text, contactId: contactId})
                .then((data) => {
                    setConversation([...conversation, data.data])
                    setFormData({ content: '' }); // Clear form
                })
                .catch(error => {
                    // setMessage(`Error: ${error.message}`);
                    console.error('Error sending message:', error);
                }).finally(() => {
                    setText('');
                    // inputRef.current.value = "";
                })    
        } else { // Editing mode
            socket.current.emit('edit-message', text, messageId);
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
    <form onSubmit={submitForm} className={styles.textForm}>
      <input
        type="text"
        className={styles.inputField}
        onChange={handleChange}
        name="content"
        // ref={inputRef}
        value={text}
        placeholder="Type your message here..."
      />
      <button type="submit" className={styles.submitButton}>Send</button>
    </form>
  );
}