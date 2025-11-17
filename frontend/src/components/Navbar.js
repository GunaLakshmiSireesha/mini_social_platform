import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">Funny Hub</h2>
      </div>

      <div className="navbar-right">
        {/* Only show Feed and Messages if user is logged in */}
        {token && (
          <>
            <Link to="/feed">Feed</Link>
            <Link to="/messages">Messages</Link>
          </>
        )}

        {/* Always show Login/Register if user is NOT logged in */}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* When logged in, show Logout button */}
        {token && (
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
