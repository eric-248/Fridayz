<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"; // Confirm this path matches your stylesheet location
import { Link } from "react-router-dom";
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

>>>>>>> NewDrewBranch

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on component mount
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5050/api/users/profile",
        {
          headers: {
            Authorization: token, // Include JWT token in the Authorization header
          },
        }
      );
      const userData = response.data;
      setUsername(userData.username);
      setEmail(userData.email);
      setBio(userData.bio);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5050/api/users/profile",
        { username, email, bio }, // Send updated user information to the backend
        {
          headers: {
            Authorization: token, // Include JWT token in the Authorization header
            "Content-Type": "application/json",
          },
        }
      );
      setEditMode(false);
    } catch (error) {
      console.error("Error saving user profile:", error);
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="profile-picture"
        />
        <h2>{username}</h2>
        <p>{email}</p>
      </div>
      {username && (
        <div className="squareProfile">
          {/* Render editable fields in edit mode */}
          {editMode ? (
            <div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
              <button onClick={handleSaveClick}>Save</button>
            </div>
          ) : (
            <p>{bio}</p>
          )}
        </div>
      )}
      {/* Render "Edit" button outside the squareProfile div */}
      {username && !editMode && <button onClick={handleEditClick}>Edit</button>}
      {!username && (
        <h1>
          Please{" "}
          <Link to="/login" style={{ color: "blue" }}>
            login
          </Link>{" "}
          or{" "}
          <Link to="/register" style={{ color: "blue" }}>
            register
          </Link>
        </h1>
      )}
    </div>
  );
};

export default ProfilePage;
