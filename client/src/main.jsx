import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Chat from './components/Chat/Chat.jsx'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header.jsx';

const router = createBrowserRouter([
  {
    path: '/login', 
    element: <Login />
  },
  {
    path: '/contacts',
    element: <Header />,
    children: [
      {path: ':username/:contactId', element: <Chat />}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>    
  </StrictMode>,
)
