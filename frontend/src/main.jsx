import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import './styles/login.css';
import { AuthContextProvider } from './hook/AuthContext.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <Router>
      <StrictMode>
        <App />
      </StrictMode>
    </Router>
  </AuthContextProvider>,
)