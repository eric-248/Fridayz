import React, { useState } from "react";
import Beans from "./Beans";
import Comments from "./Comments";
import Posts from "./Posts";
import axios from "axios";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [beans, setBeans] = useState([]);
  const [showPosts, setShowPosts] = useState(true); // New state to manage showing posts
  //SET SHOW POSTS TO TRUE FOR NOW TO EDIT IT

  const { user } = useContext(UserContext);

  const addBean = (bean) => {
    setBeans((prevBeans) => [...prevBeans, bean]);
  };

  useEffect(() => {
    // Fetch beans or perform any other necessary action here
    // This code will run every time the component is navigated to
    console.log("Navigated to HomePage");
  }, [navigate]);

  const handlePostBeans = async () => {
    setShowPosts(true); // Update state to show posts
  };

  return (
    <div>
      {!user && <h1>Please log in or register!</h1>}
      {!!user && <h1>Hi {user.username}!</h1>}
      {!!user && <Beans addBean={addBean} />}
      <div style={{ display: "flex", flexDirection: "row" }}>
        {showPosts && (
          <div style={{ marginRight: "50px", flex: 1 }}>
            <Posts />
          </div>
        )}
        {/* <div style={{ flex: 1 }}>
          <Comments />
        </div> */}
      </div>
      <button onClick={handlePostBeans}>It's Friday!</button>
    </div>
  );
};

export default HomePage;
