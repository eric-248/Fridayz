import React, { useState } from 'react';
import './index.css'; // Confirm this path matches your stylesheet location

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState("I do CS and I am depressed");
  const [tempBio, setTempBio] = useState(bio);

  const handleEditClick = () => {
    setTempBio(bio);
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setBio(tempBio);
    setEditMode(false);
  };

  const handleBioChange = (event) => {
    setTempBio(event.target.value);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-picture" />
        <h2>Name</h2>
      </div>
      <div className="squareProfile">
        {/* Render bio as textarea in edit mode, otherwise render as paragraph */}
        {editMode ? (
          <div>
            <textarea value={tempBio} onChange={handleBioChange} />
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
