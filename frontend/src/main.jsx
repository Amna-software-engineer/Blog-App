import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './App/store.js'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        autoClose={1000}
        theme={
         localStorage.getItem('theme') && localStorage.getItem('theme') 
        }
      />
    </Provider>
  </StrictMode>
)
