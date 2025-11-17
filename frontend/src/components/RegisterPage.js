import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/RegisterPage.css'; 

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    dob: '',
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      if (res.message === 'User registered') {
        setMsg('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1200);
      } else {
        setMsg(res.message || 'Something went wrong');
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Network error');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
          />
          <button type="submit" className="register-btn">Register</button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        {msg && <div className="register-message">{msg}</div>}
      </div>
    </div>
  );
}
