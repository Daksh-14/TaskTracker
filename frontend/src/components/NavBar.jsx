// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext.jsx';
import "../style/navbar.css"

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav>
        <Link to="/">Home</Link>
        <ul>
        {isLoggedIn ? (
          <>
            <li><Link to="teams">Teams</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
