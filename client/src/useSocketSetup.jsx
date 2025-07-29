import { useEffect } from 'react'

export default function useSocketSetup(socket) {
    useEffect(() => {
        if (!socket) return;
        socket.connect();
        
        socket.on('connect', () => {
            console.log('socket: ', socket);
            console.log("Socket ID:", socket.id);
        });
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });
        socket.on('connect_error', (error) => {
            console.error("Socket connect error due to ", error);
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