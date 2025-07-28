// app.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('./generated/prisma')
const prisma = new PrismaClient()
const contactRouter = require("./routes/contactRouter");
const authRouter = require('./routes/authRouter');
const cors = require('cors');

require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/contacts", contactRouter); 
app.use('/api/auth', authRouter);

// --socket.io section--
// IO websockets for live chat
const http = require('http');
const { Server } = require("socket.io"); 
const server = http.createServer(app);
const userSocketMap = new Map(); // Might want to verify passed userId's with JWT tokens 

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

const createRoom = (userId) => {
  const room = userSocketMap.get(userId);
  console.log("All connections: ", userSocketMap);
  if (!room) {
    socket.emit('message_error', 'Room not included in message');
    return null;
  }
  return room
}

io.on('connection', (socket) => {
  userSocketMap.set(socket.handshake.auth.userId, socket.id);
  console.log('A user connected on userId: ', socket.handshake.auth.userId); 
  socket.on('send-message', (message, userId) => {
    console.log("User sent a message: ", message);
    const room = createRoom(userId);
    if (!room) return;
    socket.to(room).emit('received-message', message);
  })
  socket.on("edit-message", (message, userId, editId) => { 
    const room = createRoom(userId);
    console.log("EDITING: ", message.message);
    console.log("editId: ", editId);
    if (!room) return;
    socket.to(room).emit('received-edit', message, editId);
  });
  socket.on("delete-message", (message, userId) => {
    const room = createRoom(userId);
    if(!room) return;
    socket.to(room).emit('received-delete', message);
  });
});

async function main() {
    try {
        server.listen(PORT, () => {
            console.log("Listening on 3000");
        });
    } catch(err) {
        console.error("Failed to start server");
        await prisma.$disconnect();
        process.exit(1);
    }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

 

