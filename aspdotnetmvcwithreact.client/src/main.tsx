import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvide from './context/AppContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvide>
        <App />    
      </AppContextProvide>
    </BrowserRouter>
  </React.StrictMode>,
)
