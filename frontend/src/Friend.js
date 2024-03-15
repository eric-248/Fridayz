import React from "react";

// Styles for the Friend component
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    padding: "10px",
    margin: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  profilePicture: {
    width: "50px",
    height: "50px",
    borderRadius: "50%", // Makes the image round
    objectFit: "cover",
    marginRight: "10px",
  },
  name: {
    fontWeight: "bold",
  },
  button: {
    marginLeft: "auto",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

// The Friend component
const Friend = ({ username, pictureUrl, onRemove, status, onAccept }) => {
  return (
    <div style={styles.container}>
      <img
        src={pictureUrl}
        alt={`${username}'s profile`}
        style={styles.profilePicture}
      />
      <span style={styles.username}>{username}</span>
      {status === "pending" && (
        <button onClick={onAccept} style={styles.button}>
          Accept
        </button>
      )}
      <button onClick={onRemove} style={styles.button}>
        Remove
      </button>
    </div>
  );
};

export default Friend;
