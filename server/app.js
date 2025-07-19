// app.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('./generated/prisma')
const prisma = new PrismaClient()
const cors = require('cors');

const contactRouter = require("./routes/contactRouter");
const authRouter = require('./routes/authRouter');

require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/contacts", contactRouter); 
app.use('/api/auth', authRouter);

async function main() {
    try {
        app.listen(PORT, () => {
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

 

