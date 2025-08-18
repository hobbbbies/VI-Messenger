# VI-Messenger 💬

A fully operational real-time chat messaging system built with modern web technologies. VI-Messenger combines WebSockets with a REST API to deliver a fast, interactive chat experience with seamless live updates.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-black.svg)

## ✨ Features

- **Real-time Messaging**: Instant message delivery using WebSockets
- **User Authentication**: Secure sign-up and login system
- **Contact Management**: Add contacts by email with accept/deny functionality
- **Live Message Editing**: Edit messages in real-time
- **Message Deletion**: Remove messages with live updates
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Demo Accounts**: Test the app instantly with pre-configured demo users

## 🚀 Tech Stack

### Frontend
- **React** - Modern UI library for building interactive interfaces
- **React Router** - Client-side routing
- **CSS Modules** - Scoped styling
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **Prisma ORM** - Type-safe database access
- **bcrypt** - Password hashing
- **JWT** - Secure authentication tokens

### Database
- **PostgreSQL** - Robust relational database

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v18.x or higher)
- npm or yarn package manager
- PostgreSQL database

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hobbbbies/VI-Messenger.git
   cd VI-Messenger
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   JWT_SECRET_KEY="your_jwt_secret"
   SECRET="your_session_secret"
   CLIENT_URL="http://localhost:5173"
   ```

5. **Set up the database**
   ```bash
   cd server
   npx prisma migrate dev
   npx prisma generate
   ```

## 🚀 Running the Application

1. **Start the server** (from the `server` directory):
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:3000`

2. **Start the client** (from the `client` directory):
   ```bash
   npm run dev
   ```
   Client will run on `http://localhost:5173`

## 🎮 Demo Accounts

Try the app instantly with these demo accounts:

**Account 1:**
- Email: `demo@test.com`
- Password: `demo123`

**Account 2:**
- Email: `demo2@test.com`
- Password: `demo123`

## 📱 Usage

1. **Sign Up**: Create a new account with your email
2. **Add Contacts**: Search and add other users by email
3. **Accept Requests**: Manage incoming contact requests
4. **Start Chatting**: Send real-time messages
5. **Edit Messages**: Hover over your messages to edit or delete
6. **Live Updates**: Watch conversations update in real-time across all connected clients

## 🏗️ Project Structure

```
VI-Messenger/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── helpers/        # Utility functions
│   │   └── styles/         # CSS modules
│   └── package.json
├── server/                 # Express backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── db/                 # Database utilities
│   ├── prisma/             # Prisma schema and migrations
│   ├── routes/             # Express routes
│   └── app.js              # Main server file
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/user` - Get current user

### Contacts
- `GET /contacts` - Get user's contacts
- `POST /contacts` - Add new contact
- `PUT /contacts/:id` - Update contact status

### Messages
- `GET /contacts/:id/messages` - Get conversation history
- `POST /contacts/messages` - Send new message
- `PUT /contacts/messages` - Edit message
- `DELETE /contacts/messages/:id` - Delete message

## 🔌 WebSocket Events

### Client → Server
- `join_room` - Join a conversation room
- `send-message` - Send a new message
- `edit-message` - Edit an existing message
- `delete-message` - Delete a message

### Server → Client
- `received-message` - New message received
- `received-edit` - Message edit received
- `received-delete` - Message deletion received

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Socket.IO for real-time communication
- Prisma for excellent database management
- React team for the amazing frontend library

## 📞 Contact

Stefan Vitanov - [GitHub](https://github.com/hobbbbies)

Project Link: [https://github.com/hobbbbies/VI-Messenger](https://github.com/hobbbbies/VI-Messenger)