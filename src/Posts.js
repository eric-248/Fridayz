import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import axios from "axios";
import { Link } from "react-router-dom";
import OtherProfile from "./OtherProfile";

const Posts = () => {
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [dateToPost, setDateToPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [beans, setBeans] = useState([]);
  const [beansInFilteredPosts, setBeansInFilteredPosts] = useState([]);

  function getPreviousFriday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const daysToSubtract = (dayOfWeek + 2) % 7; // Adding 2 because Friday is 5, and we want to subtract the number of days from Monday (1)
    const previousFriday = new Date(today);
    previousFriday.setDate(today.getDate() - daysToSubtract);
    previousFriday.setHours(21, 0, 0, 0);
    return previousFriday;
  }

  const fetchBeans = async () => {
    try {
      const response = await axios.get("http://localhost:5050/record/beans");
      setBeans(response.data);
      return response.data;
    } catch (error) {
      console.error("Error retrieving beans:", error);
      throw error;
    }
  };

  const getFriends = async () => {
    if (user) {
      try {
        const response = await axios.get("http://localhost:5050/record/user", {
          params: {
            username: user.username,
          },
        });
        // Assuming the bio is returned in the response data
        //console.log(response.data.friends);
        setFriends(response.data.friends);
      } catch (error) {
        console.error("Error fetching bio:", error);
        throw error;
      }
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5050/record/posts");
      setPosts(response.data);
      return response.data;
    } catch (error) {
      console.error("Error retrieving posts:", error);
      throw error;
    }
  };

  // const filterPostsByFriendsAndDate = () => {
  //   // Filter posts where username matches a username in friends
  //   console.log(posts);
  //   const filteredPosts = posts.filter((post) =>
  //     friends.includes(post.username)
  //   );
  //   const postsOnDate = filteredPosts.filter((post) => {
  //     const postDate = post.toBePosted;
  //     return postDate === dateToPost;
  //   });
  //   console.log(postsOnDate);
  //   return postsOnDate;
  // };
  const filterPostsByFriendsAndDate = () => {
    // console.log("hello");
    // console.log(posts);
    const filteredPosts = posts.filter((post) =>
      friends.includes(post.username)
    );

    // Convert the dateToPost string to a Date object
    const dateToPostDate = new Date(dateToPost);
    //console.log("dateToPostDate:", dateToPostDate);

    // Filter posts where toBePosted matches the dateToPost
    const postsOnDate = filteredPosts.filter((post) => {
      const postDate = new Date(post.toBePosted);
      //console.log("postDate:", postDate);

      // Extract year, month, and day components from both dates
      const dateToPostYear = dateToPostDate.getUTCFullYear();
      const dateToPostMonth = dateToPostDate.getUTCMonth();
      const dateToPostDay = dateToPostDate.getUTCDate();

      const postYear = postDate.getUTCFullYear();
      const postMonth = postDate.getUTCMonth();
      const postDay = postDate.getUTCDate();

      // Compare year, month, and day components
      return dateToPostYear === postYear && dateToPostMonth === postMonth;
    });

    //console.log(postsOnDate);
    return postsOnDate;
  };

  const getBeansForPosts = () => {
    //console.log(filteredPosts);
    const updatedBeansInFilteredPosts = filteredPosts.map((post) => {
      const beansForPost = post.beans.map((beanId) => {
        // Find the corresponding bean using the beanId
        return beans.find((bean) => bean._id === beanId);
      });
      return {
        username: post.username,
        comments: post.comments,
        likes: post.likes,
        toBePosted: post.toBePosted,
        beans: beansForPost,
      };
    });
    //console.log(updatedBeansInFilteredPosts);
    setBeansInFilteredPosts(updatedBeansInFilteredPosts);
  };

  // useEffect(() => {
  //   fetchBeans();
  //   getFriends();
  //   fetchPosts();
  //   setDateToPost(getPreviousFriday());
  //   const filtered = filterPostsByFriendsAndDate();
  //   setFilteredPosts(filtered);
  //   console.log("filter", filteredPosts);
  //   getBeansForPosts();
  //   //console.log("here");
  //   // console.log(posts[0].beans);
  //   console.log("bean", beansInFilteredPosts);
  // }, []);

  useEffect(() => {
    fetchBeans();
    getFriends();
    fetchPosts();
    setDateToPost(getPreviousFriday());
  }, [user]); // Include empty dependency array to run once on mount

  useEffect(() => {
    const filtered = filterPostsByFriendsAndDate();
    setFilteredPosts(filtered);
  }, [friends, posts, dateToPost]); // Include all dependencies affecting filteredPosts

  useEffect(() => {
    getBeansForPosts();
  }, [filteredPosts, beans]);

  return (
    <div className="posts-page" style={{ padding: "20px" }}>
      {beansInFilteredPosts.map((post, index) => (
        <div
          key={index}
          className="square"
          style={{
            display: "flex",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <div style={{ marginRight: "20px" }}>
            {/* <h2>{post.username}</h2> */}
            <h2>
              <Link to={`/profile/${post.username}`}>{post.username}</Link>
            </h2>
            <p>To be posted: {post.toBePosted}</p>
            <p>Likes: {post.likes}</p>
          </div>
          <div>
            {/* Display beans for the post */}
            {post.beans.map((bean, beanIndex) => (
              <div
                key={beanIndex}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>Timestamp: {bean.time}</p>
                <p>Content: {bean.thought}</p>
                {/* Add other bean details as needed */}
              </div>
            ))}
          </div>
          <div style={{ marginLeft: "20px" }}>
            <h3>Comments:</h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {post.comments.map((comment, commentIndex) => (
                <li key={commentIndex}>{comment}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
