import PropTypes from 'prop-types';
import { sendRequestViaAuth } from '../../../helpers/fetchData';
import { useRef } from 'react';
import styles from './Message.module.css'

export default function Message({ message, conversation, setConversation, setText, editId, setEditId, userId }) {
    const dateRef = useRef(new Date(message.createdAt));

    const deleteMessage = () => {
        sendRequestViaAuth('/contacts/messages', 'DELETE', { messageId: message.id })
            .then(data => {
                const newConversation = conversation.filter((convoMessage) => {
                    return convoMessage.id !== data.data.id;
                })
                setConversation(newConversation);
            }).catch(error => {
                console.error('Error deleting message: ', error);
            })
    }

    const editMessage = () => {
        setEditId(message.id);
        setText(message.content);
    }

    const stopEditing = () => {
        setEditId(null);
        setText('');
    }

    return (
        // Nested if: If editing ---> if messageId === editing id ---> set className
        <>
        <small className={styles.date}>{dateRef.current.getMonth()}/{dateRef.current.getDate()} {dateRef.current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
        <div className={
            editId 
            ? (message.id === editId 
                    ? `${styles.message} ${styles.editing}` 
                    : `${styles.message} ${styles.background}`)
            : styles.message 
            }
        >
            <div className={styles.mainSection}>
                <strong className={styles.username}>{message.user.username}:</strong>
                <small>{message.edited && <> (<i>edited</i>)</>}</small>
                <p>{message.content}</p>
            </div>
            {/* {(message.id === editId) && <div onClick={stopEditing}>Stop Editing</div>} */}
            {message.user.id === userId && <div className={styles.editOptions}>
                {message.id === editId ? <div onClick={stopEditing}>Stop Editing</div> : <div onClick={editMessage}>Edit</div> }
                <div onClick={deleteMessage}>Delete</div>
            </div>}
        </div>
        </>

    );
}

Message.propTypes = {
    message: PropTypes.object.isRequired
}