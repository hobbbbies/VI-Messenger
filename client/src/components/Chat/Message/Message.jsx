import PropTypes from 'prop-types';

export default function Message({ username, content, createdAt }) {
    return (
        <div className="message">
            <strong>{username}:</strong> {content}
            <small>{new Date(createdAt).toLocaleTimeString()}</small>
        </div>
    );
}

Message.propTypes = {
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
}