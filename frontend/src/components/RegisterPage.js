import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', mobile: '', password: '', dob: '' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      if (res.message === 'User registered') {
        setMsg('Registered. Please login.');
        setTimeout(() => nav('/login'), 900);
      } else {
        setMsg(res.message || 'Error');
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Network error');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="username" placeholder="Username" value={form.username} onChange={handleChange} required /></div>
        <div><input name="email" placeholder="Email" value={form.email} onChange={handleChange} required /></div>
        <div><input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} /></div>
        <div><input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required /></div>
        <div><input name="dob" type="date" value={form.dob} onChange={handleChange} /></div>
        <div style={{ marginTop: 8 }}><button type="submit">Register</button></div>
      </form>
      <div style={{ marginTop: 8 }}>
        <small>Already registered? <a href="/login">Login</a></small>
      </div>
      <div style={{ color: 'red', marginTop: 8 }}>{msg}</div>
    </div>
  );
}

