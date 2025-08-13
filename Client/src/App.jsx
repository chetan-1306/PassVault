import { useState, useEffect } from 'react' 
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [sessionToken, setSessionToken] = useState('');

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setSessionToken('');
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('username');
  };

  // Check for existing session on app load
  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    const storedUsername = localStorage.getItem('username');
    
    console.log('App: Checking existing session - token:', token, 'username:', storedUsername);
    
    if (token && storedUsername) {
      setSessionToken(token);
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (token, user) => {
    console.log('App: Login success - token:', token, 'user:', user);
    setSessionToken(token);
    setUsername(user);
    setIsAuthenticated(true);
    localStorage.setItem('sessionToken', token);
    localStorage.setItem('username', user);
  };

  return (
    <>
      <Navbar 
        username={username} 
        onLogout={handleLogout} 
        isAuthenticated={isAuthenticated} 
      />
      <Manager 
        onLoginSuccess={handleLoginSuccess}
        isAuthenticated={isAuthenticated}
        username={username}
        sessionToken={sessionToken}
        onLogout={handleLogout}
      />      
      <Footer/>
    </>
    
  )
}

export default App
