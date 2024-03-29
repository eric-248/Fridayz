import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import heartIcon from "./Pictures/heart.png";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  // State to hold comments for each post separately
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/posts");
      const postsWithBeans = await Promise.all(
        response.data.map(async (post) => {
          const beansWithText = await Promise.all(
            post.beans.map(async (beanId) => {
              const beanResponse = await axios.get(
                `http://localhost:5050/api/beans/${beanId}`
              );
              return beanResponse.data;
            })
          );
          return { ...post, beans: beansWithText };
        })
      );
      console.log(postsWithBeans);
      setPosts(postsWithBeans);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5050/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      fetchPosts(); // Refresh posts after like
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5050/api/posts/${postId}/unlike`, {
        headers: {
          Authorization: token,
        },
      });
      fetchPosts(); // Refresh posts after unlike
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleAddComment = async (postId, comment) => {
    if (comment !== "") {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `http://localhost:5050/api/posts/${postId}/comments`,
          { comment },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        fetchPosts(); // Refresh posts after adding comment
        // Clear the input text after submitting
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: "", // Clear the comment text for the corresponding post
        }));
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleChange = (event, postId) => {
    const { value } = event.target;
    // Update the comment state for the corresponding post
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: value,
    }));
  };

  return (
    <div className="posts-page" style={{ padding: "20px" }}>
      {posts.map((post) => (
        <div
          key={post._id}
          className="commentsSquare"
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          {/* Display post content */}
          <div style={{ marginLeft: "40px" }}>{post.content}</div>
          <h2 style={{ marginRight: "40px" }}>
            <Link to={`/profile/${post.username}`}>{post.username}</Link>
          </h2>
          {/* Display beans associated with the post */}
          <div style={{ marginRight: "40px", flex: 1 }}>
            {post.beans.map((bean) => (
              <div key={bean._id}>
                <div
                  style={{
                    marginBottom: "10px",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  {bean.time} <br />
                  {bean.thought}
                </div>
              </div>
            ))}
          </div>

          <div className="comments-container" style={{ flex: 1 }}>
            Comments:
            {post.comments[0] &&
              post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  {comment}
                </div>
              ))}
          </div>
          {/* Like/unlike buttons */}
          <div style={{ marginLeft: "40px" }}>Likes {post.likes} </div>
          <div>
            <button
              onClick={() => handleLike(post._id)}
              style={{ background: "none", border: "none" }}
            >
              <img
                src={heartIcon}
                alt="Like"
                style={{ width: "24px", height: "24px" }}
              />
            </button>
            <button
              onClick={() => handleUnlike(post._id)}
              style={{ background: "none", border: "none" }}
            >
              <img
                src={heartIcon}
                alt="Unlike"
                style={{ width: "24px", height: "24px", opacity: 0.5 }}
              />
            </button>
          </div>
          {/* Comment section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              flex: 1,
            }}
          >
            <input
              type="text"
              placeholder="Add comment"
              style={{
                border: "2px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
                width: "80%",
                maxWidth: "500px",
              }}
              value={comments[post._id] || ""}
              onChange={(event) => handleChange(event, post._id)}
            />
            <button
              onClick={() => handleAddComment(post._id, comments[post._id])}
            >
              Add Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
