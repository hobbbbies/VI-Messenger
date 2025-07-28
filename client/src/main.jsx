import { StrictMode } from 'react'
import './index.css'
import Login from './components/LoginRegister/Login/Login.jsx'
import Chat from './components/Chat/Chat.jsx'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Register from './components/LoginRegister/Register/Register.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { index: true, element: <Navigate to="/contacts" replace /> },
      { path: 'contacts', element: <Chat /> },
      { path: 'contacts/:contactId', element: <Chat /> }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>    
  </StrictMode>,
)
