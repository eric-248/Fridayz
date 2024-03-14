import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import paperClipIcon from "./Pictures/paper-clip.svg"; // Make sure this path is correct

const Beans = () => {
  const [beans, setBeans] = useState([]);
  const [textInput, setTextInput] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchBeans();
  }, []);

  const fetchBeans = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/beans");
      setBeans(response.data);
    } catch (error) {
      console.error("Error fetching beans:", error);
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
          { thought: textInput, time: new Date() }, // Add the current time as 'time' field
          {
            headers: {
              Authorization: token, // Fixed authorization header
              "Content-Type": "application/json",
            },
          }
        );
        setTextInput("");
        fetchBeans(); // Refresh beans after adding
      } catch (error) {
        console.error("Error adding bean:", error);
      }
    }
  };

  return (
    <div className="home">
      <div className="square-wrapper">
        <div className="square">
          {beans.map((bean, index) => (
            <div key={index}>
              {/* {bean.type === "text" ? ( */}
              <div>
                {bean.time}
                <br />
                {bean.thought}
                <br />
                <br />
              </div>
              {/* ) : (
                <img
                  src={bean.content}
                  alt="Uploaded"
                  style={{ maxWidth: "100%", maxHeight: "800px" }}
                />
              )} */}
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
