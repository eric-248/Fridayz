import React, { useState, useEffect } from "react";
import Friend from "./Friend";
import "./index.css";
import axios from "axios";
import SearchBar from "./searchBar";

const FriendPage = () => {
  const [friends, setFriends] = useState([
    // {
    //   id: 1,
    //   name: "John Doe",
    //   pictureUrl: "https://placekitten.com/200/200",
    //   status: "accepted",
    // },
    // {
    //   id: 2,
    //   name: "Jane Doe",
    //   pictureUrl: "https://placekitten.com/200/200",
    //   status: "pending",
    // },
    // // Initial friends data
  ]);
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
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  function getFriends() {
    if (user) {
      console.log(user);
      setFriends(user.friends);
      console.log(friends);
    }
  }

  useEffect(() => {
    //console.log(user);
    fetchUserProfile();
    getFriends();
  }, []);

  const removeFriend = (id) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  // const addFriend = (username, pictureUrl) => {
  //   // const newFriend = {
  //   //   id: Math.max(...friends.map((friend) => friend.id)) + 1,
  //   //   name,
  //   //   pictureUrl,
  //   //   status: "pending",
  //   // };
  //   // setFriends([...friends, newFriend]);
  // };

  const addFriend = async (friendId) => {
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

  const filteredFriends = friends.filter((friend) =>
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
        onClick={() => addFriend("user1", "https://placekitten.com/g/200/300")}
      >
        Add Friend
      </button>
      {filteredFriends.map((friend) => (
        <Friend
          key={friend.id}
          name={friend.name}
          pictureUrl={friend.pictureUrl}
          onRemove={() => removeFriend(friend.id)}
          status={friend.status}
          onAccept={() => acceptFriend(friend.id)}
        />
      ))}
    </div>
  );
};

export default FriendPage;
