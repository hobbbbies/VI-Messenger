import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { sendRequestViaAuth } from '../../helpers/fetchData';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import Message from './Message/Message';
import Textbar from './Textbar/Textbar';
import styles from './Chat.module.css';
import socketConstructor from '../../socket';
import useSocketSetup from '../../useSocketSetup';

export default function Chat() {
    const [user, currentContact] = useOutletContext();
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const pendingParam = searchParams.get('pending');
    const [editId, setEditId] = useState(false);
    const [text, setText] = useState("");
    const socket = useRef(null);
    // Adds essential events to socket
    useSocketSetup(socket.current);

    // Incoming messages
    useEffect(() => {
        socket.current = socketConstructor(user?.id)
            .then(() => {
                if (socket.current) {
                    console.log('socket: ', socket.current);
                    console.log("Socket ID:", socket.current.id);
                    socket.current.on('received-message', (message) => {
                        console.log('Adding: ', message.content);
                        setConversation(prev => [...prev, message.content]);
                    });
                }
            }).catch(err => {
                console.error("Error initalizing socket, ", err);
            });
    }, [user?.id])

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
                                userId={user.id}
                            />
                        </div>
                    ))}
                </div>
                <Textbar 
                    conversation={conversation} 
                    setConversation={setConversation} 
                    userId={user?.id}
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