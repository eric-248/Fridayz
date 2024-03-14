import React, { useState } from "react";
import Beans from "./Beans";
import Comments from "./Comments";
import Posts from "./Posts";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./context/userContext";

const HomePage = () => {
  const [beans, setBeans] = useState([]);
  const [showPosts, setShowPosts] = useState(true); // New state to manage showing posts
  //SET SHOW POSTS TO TRUE FOR NOW TO EDIT IT

  const { user } = useContext(UserContext);

  const addBean = (bean) => {
    setBeans((prevBeans) => [...prevBeans, bean]);
  };

  const handlePostBeans = async () => {
    setShowPosts(true); // Update state to show posts
  };

  return (
    <div>
      {!!user && <h1>Hi {user.username}!</h1>}
      <Beans addBean={addBean} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        {showPosts && (
          <div style={{ marginRight: "50px", flex: 1 }}>
            <Posts beans={beans} />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <Comments />
        </div>
      </div>
      <button onClick={handlePostBeans}>It's Friday!</button>
    </div>
  );
};

export default HomePage;
