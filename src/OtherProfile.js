import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OtherProfile = () => {
  const { username } = useParams();
  const [friendData, setFriendData] = useState(null);

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        console.log(username);
        const response = await axios.get("http://localhost:5050/record/user", {
          params: {
            username: username,
          },
        });
        // Assuming the bio is returned in the response data
        //console.log(response.data.friends);
        setFriendData(response.data);
      } catch (error) {
        console.error("Error fetching friend info:", error);
        throw error;
      }
    };

    fetchFriendData();
  }, [username]);

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
