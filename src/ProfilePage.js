import React from 'react';
import './index.css'; // Confirm this path matches your stylesheet location

const ProfilePage = () => {
  const userProfile = {
    name: "Name",
    bio: "I do CS and I am depressed",
    profilePictureUrl: "https://via.placeholder.com/150", // Placeholder image URL
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={userProfile.profilePictureUrl} alt="Profile" className="profile-picture" />
        <h2>{userProfile.name}</h2>
      </div>
      <div className="squareProfile">
        <p>{userProfile.bio}</p>
      </div>
    </div>
  );
};

export default ProfilePage;





