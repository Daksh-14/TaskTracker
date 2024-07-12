import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Website</h1>
      <Link to="/task-tracker">
        <button className="home-button">Go to Task Tracker App</button>
      </Link>
    </div>
  );
};

export default Home;
