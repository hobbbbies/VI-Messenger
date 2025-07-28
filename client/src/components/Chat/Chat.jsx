import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import { sendRequestViaAuth } from '../../helpers/fetchData';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import Message from './Message/Message';
import Textbar from './Textbar/Textbar';
import styles from './Chat.module.css';
import { SocketContext } from '../../context/socketContext';

export default function Chat() {
    const [user, currentContact] = useOutletContext();
    const socket = useContext(SocketContext); // Not using outletContext to avoid prop drilling
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const pendingParam = searchParams.get('pending');
    const [editId, setEditId] = useState(false);
    const [text, setText] = useState("");

    // Incoming messages
    useEffect(() => {
        // Room for one-to-one private messaging
        if (socket) {
            socket.on('received-message', (message) => {
                console.log('Adding: ', message.message);
                setConversation(prev => [...prev, message.message]);
            });

            socket.on('received-edit', (message, editId) => {
                setConversation(prev => prev.map(currentMessage => {if (currentMessage.id === editId) {return message.message} return currentMessage}))
            });
            socket.on('received-delete', (message) => {
                setConversation(prev => prev.filter(currentMessage => (currentMessage.id !== message.message.id)))
            });

            return () => {
                socket.off('received-message');
                socket.off('received-edit');
                socket.off('received-delete');
            }
        } else {
            console.log('socket not initalized');
        }
    }, [socket, user?.id, currentContact?.id]);

    useEffect(() => {
        console.log('currentContact: ', currentContact?.id);
        // Only if convo is uninitialized, otherwise use websockets
        if (currentContact?.id) {
            setLoading(true);
            sendRequestViaAuth(`/contacts/${currentContact.id}/messages`)
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
    }, [currentContact?.id]);

    if (loading) return <div>Loading contacts...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!currentContact) {
        return (
            <div className={styles.chatContainer}>
                <h2>Start a Chat Today!</h2>
            </div>
        );
    }

    return (
        <div>
            <div className={editId ? `${styles.chatContainer} ${styles.editingContainer}` : styles.chatContainer}>
                <h3 className={styles.pendingNoti}>
                  {(pendingParam === true || pendingParam === "true") && 
                    <>This user hasn't added you back yet</>
                  }
                </h3>
                <div className={styles.messages}>
                    {conversation.map((message) => (
                        <div key={message.id} className={message.user?.id === user.id ? styles.right : styles.left}>
                            <Message
                                message={message}
                                conversation={conversation}
                                setConversation={setConversation}
                                setText={setText}
                                editId={editId}
                                setEditId={setEditId}
                                userId={user?.id}
                                contactId={currentContact?.id}
                            />
                        </div>
                    ))}
                </div>
                <Textbar 
                    conversation={conversation} 
                    setConversation={setConversation} 
                    contactId={currentContact?.id} 
                    text={text} 
                    setText={setText}
                    editId={editId}
                    setEditId={setEditId}
                />
            </div>
        </div>
    );
}