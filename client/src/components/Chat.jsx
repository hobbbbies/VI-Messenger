import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataViaAuth } from '../helpers/fetchData';

export default function Chat() {
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { contactId } = useParams();
    

    useEffect(() => {
        setLoading(true);
        
        fetchDataViaAuth(`/contacts/messages/${contactId}`)
            .then(data => {
                setConversation(data.data || data); // Handle different response structures
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
            {conversation.map((message) => {
                return <div>{message}</div>
            })}
        </div>
    )
}