import React from 'react';

const ProfilePage = () => {
  // Placeholder data - replace with actual data, e.g., from state or props
  const userProfile = {
    name: "Name",
    bio: "I do CS and I am depresssed",
    profilePictureUrl: "https://via.placeholder.com/150", // Placeholder image URL
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={userProfile.profilePictureUrl} alt="Profile" className="profile-picture" />
        <h2>{userProfile.name}</h2>
      </div>
      <p className="profile-bio">{userProfile.bio}</p>
    </div>
  );
};

export default ProfilePage;

