import { useEffect } from 'react'
import socketConstructor from './socket'

export default function useSocketSetup(userId) {
    useEffect(() => {
        if (!userId) return;
        const socket = socketConstructor(userId);
        socket.connect();
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });
        socket.on('connect_error', () => {
            localStorage.removeItem('token');
        })
        socket.on('message_error', (message) => {
            console.error(message);
        })
        socket.on('connect', () => {
            socket.emit('message', 'Testing...');
        });
        return () => {
            socket.off('connect');
            socket.off('connect_error');
        }
    }, []);
}