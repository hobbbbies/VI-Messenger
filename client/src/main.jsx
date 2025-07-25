import { StrictMode } from 'react'
import './index.css'
import Login from './components/LoginRegister/Login/Login.jsx'
import Chat from './components/Chat/Chat.jsx'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Register from './components/LoginRegister/Register/Register.jsx'

const router = createBrowserRouter([
  {
    path: '/login', 
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/contacts',
    element: <Header />,
    children: [
      {index: true, element: <Chat />},
      {path: ':contactId', element: <Chat />}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>    
  </StrictMode>,
)
