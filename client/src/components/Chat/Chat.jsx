import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { fetchDataViaAuth } from '../../helpers/fetchData';
import Message from './Message/Message';
import Sidebar from '../Sidebar/Sidebar';
import Textbar from './Textbar/Textbar';

export default function Chat() {
    const user = useOutletContext();
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { username, contactId } = useParams();

    useEffect(() => {
        if (contactId) {
            setLoading(true);
            fetchDataViaAuth(`/contacts/${contactId}/messages`)
                .then(data => {
                    setConversation(data.data);
                    setError(null);
                })
                .catch(error => {
                    setError(error.message);
                    console.error('Failed to fetch messages:', error);
                })
                .finally(() => {
                    setLoading(false);
                });   
        }
    }, [contactId])

    if (loading) return <div>Loading contacts...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!username || !contactId) {
        return (
            <div>            
                <Sidebar />
                <div>
                    <h2>Start a Chat Today!</h2>
                </div>
            </div>
            
        )
    }

    return (
        <div>
            <Sidebar />
            <div>
                <h2>Chat with {username}</h2>
                <div className="messages">
                {conversation.map((message) => (
                    <div key={message.id} className={message.user?.id === user.id ? "right" : "left"}>
                        <Message
                            messageId={message.id}
                            username={message.user?.username}
                            content={message.content}
                            createdAt={message.createdAt}
                            conversation={conversation}
                            setConversation={setConversation}
                        />
                    </div>
                ))}
                </div>
                <Textbar conversation={conversation} setConversation={setConversation} contactId={contactId}/>
            </div>
        </div>
    )
}