import { io } from 'socket.io-client';

export default function socketConstructor(userId) {
    const socket = io("http://localhost:3000", {
        autoConnect: false,
        auth: { userId }
    });
    return socket;
}

