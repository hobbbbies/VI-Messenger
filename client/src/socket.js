import { io } from 'socket.io-client';

export default function socketConstructor(userId) {
    if (!userId) return;
    const socket = io("http://localhost:3000", {
        autoConnect: false,
        auth: { userId }
    });
    return socket;
}

