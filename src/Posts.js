import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import axios from "axios";

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
          console.log(response.data.friends);
          setFriends(response.data.friends);
          //setFriends(response.data.friends);
        })
        .catch((error) => {
          // Handle errors
          //console.error("Error fetching bio:", error);
        });
    }
  }

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

  useEffect(() => {
    fetchBeans();
    getFriends();
    fetchPosts();
    setDateToPost(getPreviousFriday());
    const filtered = filterPostsByFriendsAndDate();
    setFilteredPosts(filtered);
    //console.log(filteredPosts);
    getBeansForPosts();
    //console.log("here");
    // console.log(posts[0].beans);
    //console.log(beansInFilteredPosts);
  }, []);

  return (
    <div className="posts-page" style={{ padding: "20px" }}>
      <div
        className="square"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        {beansInFilteredPosts.map((post, index) => (
          <div key={index}>
            <h2>{post.username}</h2>
            <p>To be posted: {post.toBePosted}</p>
            <p>Likes: {post.likes}</p>
            <p>Comments: {post.comments}</p>
            {/* Display beans for the post */}
            <ul>
              {post.beans.map((bean) => (
                <li key={bean._id} style={{ listStyleType: "none" }}>
                  Bean: {bean.thought}{" "}
                  {/* Assuming each bean has a 'name' property */}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
