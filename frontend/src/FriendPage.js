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
      setFriends([...response.data.friends]);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const removeFriend = (id) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  const addFriend = async (friendId) => {
    //console.log(friendId);
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
        window.alert(response.data.message); // "Friend added successfully"
        window.location.reload();
      } catch (error) {
        console.error("Error adding friend:", error);
        window.alert("Friend already added");
      }
    }
  };

  useEffect(() => {
    console.log(friends); // This will log the updated friends state after it's been set
  }, [friends, addFriend]);

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile when component mounts
  }, []);

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
      friend && friend.toLowerCase().includes(searchQuery.toLowerCase())
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
      <ul className="my-friends">
        {filteredFriends.map((friend) => (
          <li key={friend}>{friend}</li>
        ))}
      </ul>

    </div>
  );
};

export default FriendPage;
