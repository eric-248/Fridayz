import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';


const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("no bio");

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on component mount
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5050/api/users/profile", {
        headers: {
          Authorization: token, // Include JWT token in the Authorization header
        },
      });
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
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-picture" />
        <h2>{username}</h2>
        <p>{email}</p>
      </div>
      <div className="squareProfile">
        {/* Render editable fields in edit mode */}
        {editMode ? (
          <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            <button onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          <p>{bio}</p>
        )}
      </div>
      {/* Render "Edit" button outside the squareProfile div */}
      {!editMode && <button onClick={handleEditClick}>Edit</button>}
    </div>
  );
};

export default ProfilePage;
