import { useEffect } from 'react'
import socket from './socket'

export default function useSocketSetup() {
    useEffect(() => {
        socket.connect();
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });
        socket.on('connect_error', () => {
            localStorage.removeItem('token');
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