import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import CreatePost from './components/CreatePost';
import Login from './components/LoginForm';
import Register from './components/RegisterPage';
import MessagesPage from './components/MessagesPage';
import ProfilePage from './components/ProfilePage';
import { getUserFromToken } from './services/api';

function AppContent() {
  const [user, setUser] = useState(() => getUserFromToken(localStorage.getItem('token')));
  const location = useLocation();

  useEffect(() => {
    const t = localStorage.getItem('token');
    setUser(getUserFromToken(t));
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setUser(getUserFromToken(token));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const hideAllLayout = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!hideAllLayout && <Navbar user={user} onLogout={handleLogout} />}

      <div className="app-layout">

        {!hideAllLayout && user && <Sidebar user={user} />}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/feed" replace />} />
            <Route path="/feed" element={<Feed />} />

            <Route path="/create" element={user ? <CreatePost user={user} /> : <Navigate to="/login" />} />

            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />

            <Route path="/messages" element={user ? <MessagesPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/profile/:email" element={<ProfilePage />} />

            <Route path="*" element={<Navigate to="/feed" />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
