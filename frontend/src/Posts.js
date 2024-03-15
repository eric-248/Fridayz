import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

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
    } catch (error) {
      console.error("Error adding comment:", error);
    }
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
          <div>{post.content}</div>
          <h2>
            <Link to={`/profile/${post.username}`}>{post.username}</Link>
          </h2>
          {/* Display beans associated with the post */}
          <div>
            {post.beans.map((bean) => (
              <div key={bean._id}>
                {/* {bean.type === "text" ? ( */}
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
                {/* ) : (
                  <img src={bean.content} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: "800px", display: "block", marginBottom: "10px" }} />
                )} */}
              </div>
            ))}
          </div>
          Likes {post.likes}
          <div className="comments-container">
            Comments:
            {post.comments[0] &&
              post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  {comment}
                </div>
              ))}
          </div>
          {/* Like/unlike buttons */}
          <div>
            <button onClick={() => handleLike(post._id)}>Like</button>
            <button onClick={() => handleUnlike(post._id)}>Unlike</button>
          </div>
          {/* Comment section */}
          <div>
            <input type="text" placeholder="Add comment" />
            <button onClick={() => handleAddComment(post._id, "New comment")}>
              Add Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
