import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataViaAuth } from '../../helpers/fetchData';
import Message from './Message/Message';
import Sidebar from '../Sidebar/Sidebar';

export default function Chat() {
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { contactId } = useParams();

    useEffect(() => {
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
    }, [contactId])

    if (loading) return <div>Loading contacts...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div>
            <Sidebar />
            <div>
                <h2>Chat with Contact {contactId}</h2>
                <div className="messages">
                    {conversation.map((message) => {
                        return (
                            <Message
                                key={message.id}
                                username={message.user?.username}
                                content={message.content}
                                createdAt={message.createdAt}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}