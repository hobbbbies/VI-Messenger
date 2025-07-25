import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { sendRequestViaAuth } from '../../helpers/fetchData';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import Message from './Message/Message';
import Textbar from './Textbar/Textbar';
import styles from './Chat.module.css';

export default function Chat() {
    const [user, currentUser] = useOutletContext();
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const pendingParam = searchParams.get('pending');
    const [editId, setEditId] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        if (currentUser?.id) {
            setLoading(true);
            sendRequestViaAuth(`/contacts/${currentUser.id}/messages`)
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
    }, [currentUser]);

    if (loading) return <div>Loading contacts...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!currentUser) {
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
                            />
                        </div>
                    ))}
                </div>
                <Textbar 
                    conversation={conversation} 
                    setConversation={setConversation} 
                    contactId={currentUser.id} 
                    text={text} 
                    setText={setText}
                    editId={editId}
                    setEditId={setEditId}
                />
            </div>
        </div>
    );
}