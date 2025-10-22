import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
// import '../styles/Navbar.css';


export default function Navbar({ user, onLogout, onLoginSuccess }) {
  const [showLogin, setShowLogin] = useState(false);
  const nav = useNavigate();

  const handleLogout = () => {
    onLogout();
    nav('/login');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottom: '1px solid #ddd' }}>
      <div>
        <Link to="/feed" style={{ marginRight: 12 }}>Feed</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!user ? (
          <>
            <button onClick={() => setShowLogin(s => !s)} style={{ marginRight: 8 }}>
              Login
            </button>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <div style={{ marginRight: 12 }}>{user.email}</div>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>

      {/* Inline small dropdown login form */}
      {showLogin && !user && (
        <div style={{
          position: 'absolute', right: 16, top: 56, background: 'white', border: '1px solid #ccc', padding: 12, zIndex: 40
        }}>
          <LoginForm onLogin={onLoginSuccess} onClose={() => setShowLogin(false)} />
        </div>
      )}
    </div>
  );
}


// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Navbar.css';

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <h1 className="navbar-logo">Social Media</h1>
//       <div className="navbar-links">
//         <Link to="/feed">Feed</Link>
//         <Link to="/login">Login</Link>
//         <Link to="/register">Register</Link>
//       </div>
//     </nav>
//   );
// }



// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Navbar.css';

// export default function Navbar({ token, onLogout }) {
//   return (
//     <nav className="navbar">
//       <h2 className="logo">Social Media</h2>
//       <div className="nav-links">
//         {token ? (
//           <>
//             <Link to="/feed">Feed</Link>
//             <Link to="/create">Create Post</Link>
//             <button onClick={onLogout} className="logout-btn">Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/feed">Feed</Link>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }
