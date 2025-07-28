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
const userSocketMap = new Map();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on('connection', (socket) => {
  userSocketMap.set(socket.handshake.auth.userId, socket.id);
  console.log('A user connected on userId: ', socket.handshake.auth.userId);
  socket.on('send-message', (message, userId) => {
    console.log("User sent a message: ", message);
    const room = userSocketMap.get(userId);
    console.log("All connections: ", userSocketMap);
    console.log('passedId: ', userId);
    console.log("speaking to room ", room);
    if (!room) {
      socket.emit('message_error', 'Room not included in message');
      return;
    }
    socket.to(room).emit('received-message', message);
  })
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

 

