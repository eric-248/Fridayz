import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import paperClipIcon from "./Pictures/paper-clip.svg"; // Make sure this path is correct

const Beans = () => {
  const [beans, setBeans] = useState([]);
  //const [beanIds, setBeansIds] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [username, setUsername] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getPost();
  }, []);

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
      const userData = response.data;
      setUsername(userData.username);
      return userData.username;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const getPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const username = await fetchUserProfile();
      const response = await axios.get(
        `http://localhost:5050/api/posts/user/${username}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      console.log(response.data.beans);
      //setBeansIds(response.data.beans);
      fetchBeansByIds(response.data.beans);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("create post");
        return await createPost(); // Ensure that createPost is called before proceeding
      } else {
        console.error("Error getting post:", error);
      }
    }
  };

  const createPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const username = await fetchUserProfile();
      console.log(username);
      const response = await axios.post(
        "http://localhost:5050/api/posts",
        {
          comments: [],
          likes: 0,
          toBePosted: new Date(),
          beans: [],
          username: username,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Post created:", response.data);
      //setBeansIds([]);
      setBeans([]);

      return response.data;
      //await getPost(); // Fetch post again after creating
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const textInputHandler = (event) => {
    setTextInput(event.target.value);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Handle image upload
  };

  const handleAddBean = async () => {
    if (textInput !== "") {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5050/api/beans",
          { thought: textInput, time: new Date() },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        const beanId = response.data._id;
        await handleAddToPost(beanId);
        setTextInput("");
        await getPost(); // Refresh beans after adding
      } catch (error) {
        console.error("Error adding bean:", error);
      }
    }
  };

  const handleAddToPost = async (beanId) => {
    try {
      const token = localStorage.getItem("token");
      const post = await getPost();
      console.log(post);
      console.log(post._id);
      console.log("Bean ID: " + beanId);
      await axios.post(
        `http://localhost:5050/api/posts/${post._id}/beans`,
        { beanId },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error adding bean to post:", error);
    }
  };

  const fetchBeans = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/beans");
      console.log(response.data);
      setBeans(response.data);
    } catch (error) {
      console.error("Error fetching beans:", error);
    }
  };

  const fetchBeansByIds = async (beanIds) => {
    try {
      const beansData = [];
      const token = localStorage.getItem("token");
      for (const beanId of beanIds) {
        const response = await axios.get(
          `http://localhost:5050/api/beans/${beanId}`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        beansData.push(response.data);
      }
      setBeans(beansData);
    } catch (error) {
      console.error("Error fetching beans:", error);
    }
  };

  return (
    <div className="home">
      <div className="square-wrapper">
        <div className="square">
          {beans &&
            beans.map((bean, index) => (
              <div key={index}>
                <div>
                  {bean.time}
                  <br />
                  {bean.thought}
                  <br />
                  <br />
                </div>
              </div>
            ))}
        </div>
        <div
          className="addToBean-container"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <textarea
            className="addToBean-input"
            placeholder="Type here..."
            value={textInput}
            onChange={textInputHandler}
            style={{ flexGrow: 1 }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={paperClipIcon}
              alt="Upload"
              onClick={triggerFileInput}
              style={{ cursor: "pointer", width: "20px", marginRight: "10px" }}
            />
            <button onClick={handleAddBean}>Add To Bean</button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Beans;
