// app.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('./generated/prisma')
const prisma = new PrismaClient()
const contactRouter = require("./routes/contactRouter");
const authRouter = require('./routes/authRouter');
const cors = require('cors');

// IO websockets for live chat
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io"); 

require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/contacts", contactRouter); 
app.use('/api/auth', authRouter);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('send-message', (message) => {
    console.log("User sent a message: ", message);
    socket.broadcast.emit('received-message', message);
  })
});

// io.on('message', (socket, message) => {
//   console.log("User sent a message: ", message);  
// })

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

 

