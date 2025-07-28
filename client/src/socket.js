import { io } from 'socket.io-client';

export default function socketConstructor(userId) {
    if (!userId) return;
    const socket = io(import.meta.env.VITE_SERVER_URL_RAW, {
        autoConnect: false,
        auth: { userId }
    });
    return socket;
}

