import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './Pictures/Fridayz-Smaller.png'; 
import './index.css';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Fridayz" className="logo-small" />
      </Link>
      <div className="links">
        {/* Dropdown toggle button */}
        <div onClick={toggleDropdown} className="profile-nav-container">
          <img src="https://via.placeholder.com/150" alt="Profile" className="profile-nav"/>
          {isDropdownVisible && (
            <div className="dropdown-menu">
              <Link to="/profile">Profile</Link>
              <Link to="/friends">Friends</Link>
              <Link to="/login">Login</Link>
              {/*The post link is temp.  Will be removed once done
              <Link to="/Post">Post</Link> */}
               
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


