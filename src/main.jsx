import { ToastContainer }               from 'react-toastify';
import { StrictMode }                   from 'react'
import { createRoot }                   from 'react-dom/client'
import App                              from './App.jsx'

import "bootstrap/dist/css/bootstrap.min.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer 
        position="top-right"
        autoClose={2500}   
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover    
    />
  </StrictMode>,
)
