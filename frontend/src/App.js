import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterPage from './components/RegisterPage';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Feed from './components/Feed';
// import CreatePost from './components/CreatePost';
import { getToken, getUserFromToken } from './services/api';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const u = getUserFromToken(token);
      setUser(u);
    }
  }, []);

  const handleLogin = (token, userInfo) => {
    if (token) {
      localStorage.setItem('token', token);
      setUser(getUserFromToken(token) || userInfo);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} onLoginSuccess={handleLogin} />
      <div style={{ maxWidth: 1000, margin: '20px auto', padding: '0 16px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/feed" element={<Feed />} />
          {/* <Route path="/create-post" element={<CreatePost />} /> */}
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}


