import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams, useOutletContext, useSearchParams } from 'react-router-dom';
import { sendRequestViaAuth } from '../../helpers/fetchData';
import Message from './Message/Message';
import Textbar from './Textbar/Textbar';
import Sidebar from '../Sidebar/Sidebar';

export default function Chat() {
    const user = useOutletContext();
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { username, contactId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams(); // React router dom way to access search queries
    const pendingParam = searchParams.get('pending');
    const [editing, setEditing] = useState(false);
    const [presetText, setPresetText] = useState("");
    // Might have to put user inside context

    useEffect(() => {
        if (contactId) {
            setLoading(true);
            sendRequestViaAuth(`/contacts/${contactId}/messages`)
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
            <div className={editing ? "chatContainer editingContainer" : "chatContainer"}>
                <h2>Chat with {username}</h2>
                <h3>{(pendingParam === true || pendingParam === "true") && <span>This user hasn't added you back yet</span>}</h3>
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
                            setPresetText={setPresetText}
                            editing={editing}
                            setEditing={setEditing}
                        />
                    </div>
                ))}
                </div>
                <Textbar conversation={conversation} setConversation={setConversation} contactId={contactId} presetText={presetText}/>
            </div>
        </div>
    )
}