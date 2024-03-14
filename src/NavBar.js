import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Pictures/Fridayz-Smaller.png";
import "./index.css";

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    // Delete cookies or perform any logout actions here
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Fridayz" className="logo-small" />
      </Link>
      <div className="links">
        {/* Dropdown toggle button */}
        <div onClick={toggleDropdown} className="profile-nav-container">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-nav"
          />
          {isDropdownVisible && (
            <div className="dropdown-menu">
              <Link to="/profile">Profile</Link>
              <Link to="/friends">Friends</Link>
              <Link to="/login">Login</Link>
              <button onClick={handleLogout}>Logout</button>
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
