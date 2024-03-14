import React, { useState } from "react";
import Beans from "./Beans";
import Comments from "./Comments";
import Posts from "./Posts";
import axios from "axios";

const HomePage = () => {
  const [beans, setBeans] = useState([]);
  const [showPosts, setShowPosts] = useState(true); // New state to manage showing posts
  //SET SHOW POSTS TO TRUE FOR NOW TO EDIT IT

  const addBean = (bean) => {
    setBeans((prevBeans) => [...prevBeans, bean]);
  };

  const handlePostBeans = async () => {
    setShowPosts(true); // Update state to show posts
    axios
      .post("http://localhost:5050/record/users/register", {
        email: "user1234@gmail.com",
        username: "user1234",
        password: "password1234",
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch(console.error);

    // e.preventDefault();
    // let result = await fetch("http://localhost:5000/register", {
    //   method: "post",
    //   body: JSON.stringify({ name, email }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // result = await result.json();
    // console.warn(result);
    // if (result) {
    //   alert("Data saved succesfully");
    //   setEmail("");
    //   setName("");
    // }
  };

  return (
    <div>
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
