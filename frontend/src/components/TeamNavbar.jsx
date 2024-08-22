import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext.jsx';
import "../style/TeamNavbar.css";
import { FaBars } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import logo from '../assets/tasktracker-logo.png'

const TeamNavbar = () => {
  const { logout } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    if (isMobile) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <nav className="App_Nav">
      <div className="logo">
        <Link to='../../'><img style={{width:'30vw',maxWidth:'200px', height:'auto'}} src={logo} /></Link></div>
      <ul className={`nav-links ${isMobile && isMenuOpen ? 'mobile' : ''}`}>
        <li><Link to="created">Your Teams</Link></li>
        <li><Link to="joined">Joined Teams</Link></li>
        <li><Link to="">DashBoard</Link></li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <MdCancel /> : <FaBars />}
      </div>
    </nav>
  );
};

export default TeamNavbar;
