import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OtherProfile = () => {
  const { username } = useParams();
  const [friendData, setFriendData] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUserId();
  }, [username]);

  useEffect(() => {
    if (userId) {
      fetchFriendData();
    }
  }, [userId]);

  const fetchFriendData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/users/profile/${userId}`
      );
      setFriendData(response.data);
    } catch (error) {
      console.error("Error fetching friend info:", error);
      throw error;
    }
  };

  const fetchUserId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/users/profile/byUser/${username}`
      );
      setUserId(response.data.userId);
    } catch (error) {
      console.error("Error fetching user ID:", error);
      // Handle error
    }
  };

  return (
    <div className="profile">
      {friendData ? (
        <div>
          <div className="profile-header">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="profile-picture"
            />
            <h2>{friendData.username}</h2>
          </div>
          <div className="squareProfile">
            <p>{friendData.bio}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OtherProfile;
