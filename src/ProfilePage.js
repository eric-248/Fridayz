import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import "./index.css"; // Confirm this path matches your stylesheet location
import axios from "axios";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [currBio, setBio] = useState("");
  const [tempBio, setTempBio] = useState(currBio);

  function getUser() {
    if (user) {
      axios
        .get("http://localhost:5050/record/user", {
          params: {
            username: user.username,
          },
        })
        .then((response) => {
          // Assuming the bio is returned in the response data
          console.log(response.data);
          setBio(response.data.bio);
          setTempBio(currBio);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching bio:", error);
        });
    }
  }

  async function bioData() {
    try {
      const response = await axios.put(
        "http://localhost:5050/record/user/bio",
        {
          _id: user._id,
          bio: currBio,
        }
      );
      console.log("Updated user bio:", response.data);
    } catch (error) {
      console.error("Error updating user bio:", error);
    }
  }

  useEffect(() => {
    getUser();
  }, [user]);

  const handleEditClick = () => {
    setTempBio(currBio);
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setBio(tempBio);
    setEditMode(false);
    bioData();
  };

  const handleBioChange = (event) => {
    setTempBio(event.target.value);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="profile-picture"
        />
        <h2>{user ? user.username : "Loading..."}</h2>
      </div>
      <div className="squareProfile">
        {/* Render bio as textarea in edit mode, otherwise render as paragraph */}
        {editMode ? (
          <div>
            <textarea value={tempBio} onChange={handleBioChange} />
            <button onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          <p>{currBio}</p>
        )}
      </div>
      {/* Render "Edit" button outside the squareProfile div */}
      {!editMode && <button onClick={handleEditClick}>Edit</button>}
    </div>
  );
};

export default ProfilePage;
