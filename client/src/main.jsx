import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ScoketProvider from './context/SocketProvider.jsx'


createRoot(document.getElementById('root')).render(

   <ScoketProvider>
    <StrictMode>
    <App />
  </StrictMode>
  </ScoketProvider>
)
