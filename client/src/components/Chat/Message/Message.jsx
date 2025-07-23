import PropTypes from 'prop-types';
import { sendRequestViaAuth } from '../../../helpers/fetchData';
import { useRef } from 'react';

export default function Message({ messageId, username, content, createdAt, conversation, setConversation, setPresetText, editing, setEditing }) {
    const dateRef = useRef(new Date(createdAt));

    const deleteMessage = () => {
        sendRequestViaAuth('/contacts/messages', 'DELETE', { messageId })
            .then(data => {
                const newConversation = conversation.filter((message) => {
                    return message.id !== data.data.id;
                })
                setConversation(newConversation);
            }).catch(error => {
                console.error('Error deleting message: ', error);
            })
    }

    const editMessage = () => {
        setEditing(messageId);
        setPresetText(content);
    }

    const stopEditing = () => {
        setEditing(false);
        setPresetText('');
    }

    return (
        // Nested if: If editing ---> if messageId === editing id ---> set className
        <div className={editing ? (messageId === editing ? "message editing" : "message background") : "message" }>
            <strong>{username}:</strong> {content}
            <small> </small>
            <small>{dateRef.current.getMonth()}/{dateRef.current.getDate()} {dateRef.current.toLocaleTimeString()}</small>
            {(messageId === editing) && <div onClick={stopEditing}>Stop Editing</div>}
            <div onClick={editMessage}>Edit</div>
            <div onClick={deleteMessage}>Delete</div>
        </div>
    );
}

Message.propTypes = {
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
}