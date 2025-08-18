# VI-Messenger 💬

VI-Messenger is a real-time, full-stack chat application designed for fast and interactive messaging. It leverages WebSockets to provide a seamless live chat experience, allowing users to communicate instantly without needing to refresh the page.

![Live Demo GIF](https://your-gif-url-here.com/demo.gif) ## 📜 Table of Contents

- [About The Project](#about-the-project)
- [✨ Key Features](#-key-features)
- [🛠️ Built With](#️-built-with)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [⚙️ Usage](#️-usage)
- [📝 License](#-license)
- [📧 Contact](#-contact)

---

## About The Project

VI-Messenger provides a complete chat solution, from user authentication to real-time message synchronization. The application features a **React** frontend for a dynamic user interface and an **Express.js** backend that serves a REST API. **Prisma ORM** is used for robust database management, while **WebSockets** form the core of the live messaging functionality, ensuring instant delivery and updates for messages, edits, and deletions.

---

## ✨ Key Features

* **User Authentication:** Secure sign-up and login for users with their email.
* **Contact Management:** Add other users as contacts via email and manage incoming requests by accepting or denying them.
* **Real-Time Messaging:** Instant message sending and receiving powered by WebSockets.
* **Live Message Editing:** Edit your sent messages on the fly, with changes reflected instantly for all participants.
* **Live Message Deletion:** Delete messages, and they will disappear from the conversation in real-time.
* **Seamless UI:** No page refreshes needed for any action, providing a smooth and modern user experience.
* **Demo Accounts:** Two pre-configured demo accounts are available on the login screen for easy testing and showcasing.

---

## 🛠️ Built With

This project was built using the following technologies:

* **Frontend:**
    * ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* **Backend:**
    * ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
    * ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
* **Database:**
    * ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
* **Real-Time Communication:**
    * ![Socket.io](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=socket.io&logoColor=white)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
* Node.js (v16 or later)
* npm (or yarn/pnpm)
* A database supported by Prisma (e.g., PostgreSQL, MySQL, SQLite)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/vi-messenger.git](https://github.com/your-username/vi-messenger.git)
    cd vi-messenger
    ```

2.  **Install Backend Dependencies:**
    Navigate to the server directory and install the required packages.
    ```sh
    cd server
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the `server` directory and add the following, replacing the placeholder values:
    ```env
    # Example for PostgreSQL
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

    # Secret for signing JWTs
    JWT_SECRET="YOUR_SUPER_SECRET_KEY"

    # Server Port
    PORT=5000
    ```

4.  **Set up the Database:**
    Run the Prisma migrations to set up your database schema.
    ```sh
    npx prisma migrate dev --name init
    ```
    You can also use Prisma Studio to view and manage your data:
    ```sh
    npx prisma studio
    ```

5.  **Install Frontend Dependencies:**
    Navigate to the client directory and install packages.
    ```sh
    cd ../client
    npm install
    ```

---

## ⚙️ Usage

1.  **Start the Backend Server:**
    From the `server` directory:
    ```sh
    npm start
    ```
    Your Express API should now be running on `http://localhost:5000` (or the port you specified).

2.  **Start the Frontend Development Server:**
    From the `client` directory:
    ```sh
    npm start
    ```
    The React application will open and run on `http://localhost:3000`.

3.  **Test the Application:**
    Open your browser to `http://localhost:3000`. You can create your own account or use the two demo accounts provided on the login screen to explore the chat features.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/your-username/vi-messenger](https://github.com/your-username/vi-messenger)