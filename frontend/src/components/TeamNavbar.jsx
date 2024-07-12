// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext.jsx';
import "../style/navbar.css"

const TeamNavbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className='App_Nav'>
        <Link to="created">DashBoard</Link>
        <Link to="created">Your Teams</Link>
        <Link to="joined">Joined Teams</Link>
    </nav>
  );
};

export default TeamNavbar;
