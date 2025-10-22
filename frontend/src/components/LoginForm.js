import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
// import '../styles/LoginForm.css';


export default function LoginForm({ onLogin, onClose }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form);
      if (data.token) {
        localStorage.setItem('token', data.token);
        if (onLogin) onLogin(data.token, data.user);
        setMsg('Logged in');
        if (onClose) onClose();
        nav('/dashboard');
      } else {
        setMsg(data.message || 'Login failed');
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ minWidth: 260 }}>
      <div>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: '100%', marginBottom: 6 }} />
      </div>
      <div>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ width: '100%', marginBottom: 6 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="submit">Login</button>
        <button type="button" onClick={() => { if (onClose) onClose(); }}>Close</button>
      </div>
      <div style={{ marginTop: 8 }}>
        <small>Don't have an account? <a href="/register">Register</a></small>
      </div>
      <div style={{ color: 'red', marginTop: 8 }}>{msg}</div>
    </form>
  );
}



// import React, { useState } from 'react';
// import { loginUser } from '../services/api';
// import { useNavigate } from 'react-router-dom';
// import '../styles/LoginForm.css';

// export default function LoginForm({ onLogin, onClose }) {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [msg, setMsg] = useState('');
//   const nav = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await loginUser(form);
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//         if (onLogin) onLogin(data.token, data.user);
//         setMsg('Logged in');
//         if (onClose) onClose();
//         nav('/dashboard');
//       } else {
//         setMsg(data.message || 'Login failed');
//       }
//     } catch (err) {
//       setMsg(err.response?.data?.message || 'Network error');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="login-form">
//       <input
//         name="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={handleChange}
//         required
//       />

//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={handleChange}
//         required
//       />

//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <button type="submit">Login</button>
//         <button type="button" onClick={() => { if (onClose) onClose(); }}>Close</button>
//       </div>

//       <small>
//         Don’t have an account? <a href="/register">Register</a>
//       </small>

//       {msg && <div className="login-msg">{msg}</div>}
//     </form>
//   );
// }
