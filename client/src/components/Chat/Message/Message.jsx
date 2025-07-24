import PropTypes from 'prop-types';
import { sendRequestViaAuth } from '../../../helpers/fetchData';
import { useRef } from 'react';

export default function Message({ message, conversation, setConversation, setText, editId, setEditId }) {
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
        <div className={editId ? (message.id === editId ? "message editing" : "message background") : "message" }>
            <strong>{message.user.username}:</strong> {message.content}
            <small> </small>
            <small>{dateRef.current.getMonth()}/{dateRef.current.getDate()} {dateRef.current.toLocaleTimeString()}</small>
            <small>{message.edited && <>(<i>edited</i>)</>}</small>
            {(message.id === editId) && <div onClick={stopEditing}>Stop Editing</div>}
            <div onClick={editMessage}>Edit</div>
            <div onClick={deleteMessage}>Delete</div>
        </div>
    );
}

Message.propTypes = {
    message: PropTypes.object.isRequired
}