import PropTypes from 'prop-types';
import { deleteDataViaAuth } from '../../../helpers/fetchData';

export default function Message({ messageId, username, content, createdAt, conversation, setConversation }) {
    const deleteMessage = () => {
        deleteDataViaAuth('/contacts/messages', { messageId })
            .then(data => {
                const newConversation = conversation.filter((message) => {
                    return message.id !== data.data.id;
                })
                setConversation(newConversation);
            }).catch(error => {
                console.error('Error deleting message: ', error);
            })
    }
    
    return (
        <div className="message">
            <strong>{username}:</strong> {content}
            <small>{new Date(createdAt).toLocaleTimeString()}</small>
            <div>Edit</div>
            <div onClick={deleteMessage}>Delete</div>
        </div>
    );
}

Message.propTypes = {
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
}