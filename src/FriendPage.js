import React, { useState } from "react";
import Friend from "./Friend";
import "./index.css";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import axios from "axios";
import SearchBar from "./searchBar";

const FriendPage = () => {
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedUser, setSelectedUser] = useState("");

  function getFriends() {
    if (user) {
      axios
        .get("http://localhost:5050/record/user", {
          params: {
            username: user.username,
          },
        })
        .then((response) => {
          // Assuming the bio is returned in the response data
          //console.log(response.data);
          setFriends(response.data.friends);
          //setFriends(response.data.friends);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching friends:", error);
        });
    }
  }

  useEffect(() => {
    //console.log(user);
    getFriends();
  }, []);

  const addFriend = async (name) => {
    // const newFriend = {
    //   id: Math.max(...friends.map((friend) => friend.id)) + 1,
    //   name,
    //   pictureUrl,
    //   status: "pending",
    // };
    // setFriends([...friends, newFriend]);
    if (name !== "") {
      try {
        const response = await axios.put(
          "http://localhost:5050/record/user/friends/new",
          {
            _id: user._id,
            friendUsername: selectedUser,
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error adding user to friends:", error);
        throw error; // Propagate the error to the caller
      }
    }
  };

  return (
    <div className="friends-page">
      <SearchBar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <button onClick={() => addFriend(selectedUser)}>Add Friend</button>
      {/* {filteredFriends.map((friend) => (
        <Friend
          key={friend.id}
          name={friend.name}
          pictureUrl={friend.pictureUrl}
          onRemove={() => removeFriend(friend.id)}
          status={friend.status}
          onAccept={() => acceptFriend(friend.id)}
        />
      ))} */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendPage;
