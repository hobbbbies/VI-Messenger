import { useEffect } from 'react'

export default function useSocketSetup(socket) {
    useEffect(() => {
        if (!socket) return;
        socket.connect();
        
        socket.on('connect', () => {
            socket.emit('message', 'Testing...');
        });
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });
        socket.on('connect_error', () => {
            localStorage.removeItem('token');
        })
        socket.on('message_error', (message) => {
            console.error(message);
        })

        return () => {
            socket.disconnect();
        }
    }, [socket]);
}