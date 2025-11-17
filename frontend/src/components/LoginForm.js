import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginForm.css'; 

export default function LoginForm({ onLogin, onClose }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form);
      if (data.token) {
        localStorage.setItem('token', data.token);
        if (onLogin) onLogin(data.token, data.user);
        setMsg(' Login successful! Redirecting...');
        setTimeout(() => navigate('/feed'), 1200); 
      } else {
        setMsg(data.message || 'Login failed');
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Network error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login </h2>
        <p className="login-subtitle">Log in to continue to your account</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="login-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

        {msg && <div className="login-message">{msg}</div>}
      </div>
    </div>
  );
}
