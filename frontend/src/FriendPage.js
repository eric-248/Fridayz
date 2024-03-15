import React, { useState, useEffect } from "react";
import Friend from "./Friend";
import "./index.css";
import axios from "axios";
import SearchBar from "./searchBar";

const FriendPage = () => {
  const [friends, setFriends] = useState([]);

  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

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
      setUser(response.data); // Update user state with profile data
      setFriends(response.data.friends);
      console.log(friends);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    //console.log(user);
    console.log(friends);
    fetchUserProfile();
    console.log(friends);
    //console.log(friends);
  }, []);

  const removeFriend = (id) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  const addFriend = async (friendId) => {
    console.log(friendId);
    if (friendId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://localhost:5050/api/users/add-friend/${friendId}`,
          {},
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.message); // "Friend added successfully"
      } catch (error) {
        console.error("Error adding friend:", error);
      }
    }
  };

  const acceptFriend = (id) => {
    setFriends(
      friends.map((friend) =>
        friend.id === id ? { ...friend, status: "accepted" } : friend
      )
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name &&
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="friends-page">
      {/* <input
        type="text"
        placeholder="Search friends..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      /> */}
      <SearchBar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <button
        onClick={() =>
          addFriend(selectedUser, "https://placekitten.com/g/200/300")
        }
      >
        Add Friend
      </button>
      {/* {friends &&
        filteredFriends.map((friend) => (
          <Friend
            key={friend.id}
            name={friend.name}
            pictureUrl={friend.pictureUrl}
            onRemove={() => removeFriend(friend.id)}
            status={friend.status}
            onAccept={() => acceptFriend(friend.id)}
          />
        ))} */}
      {/* <div className="friends-list-container">
        <ul className="friends-list">
          {friends.map((friend, index) => (
            <li key={index}>{friend}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default FriendPage;
