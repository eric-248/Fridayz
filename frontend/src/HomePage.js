import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./Posts";
import Beans from "./Beans";

const HomePage = () => {
  const [beans, setBeans] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(true);
  const [user, setUser] = useState(null); // State to store user profile

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on component mount
    fetchBeans();
    fetchPosts();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5050/api/users/profile", {
        headers: {
          Authorization: token, // Include JWT token in the Authorization header
        },
      });
      setUser(response.data); // Update user state with profile data
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchBeans = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/beans");
      setBeans(response.data);
    } catch (error) {
      console.error("Error fetching beans:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostBeans = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5050/api/posts",
        {
          comments: [],
          likes: 0,
          beans: beans.map((bean) => bean._id), // Use bean IDs from the fetched beans
          toBePosted: new Date(),
          username: user.username, // Use the username from the fetched user profile
        },
        {
          headers: {
            Authorization: token, // Include JWT token in the Authorization header
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Post created:", response.data);
      setShowPosts(true); // Show posts after posting beans
    } catch (error) {
      console.error("Error posting beans:", error);
    }
  };

  return (
    <div>
      {!!user && <h1>Hi {user.username}!</h1>}
      <Beans />
      <div>
        <button onClick={handlePostBeans}>It's Friday!</button>
      </div>
      {showPosts && <Posts posts={posts} />}
    </div>
  );
};

export default HomePage;
