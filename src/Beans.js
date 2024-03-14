import React, { useState, useRef } from "react";
import paperClipIcon from "./Pictures/paper-clip.svg"; // Make sure this path is correct
import { UserContext } from "./context/userContext";
import { useContext, useEffect } from "react";
import axios from "axios";

const Beans = ({ addBean }) => {
  const { user } = useContext(UserContext);

  const [beans, setBeans] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [latestBeanId, setLatestBeanId] = useState("");

  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   async function getRecords() {
  //     const response = await fetch(`http://localhost:5050/record/`);
  //     if (!response.ok) {
  //       const message = `An error occurred: ${response.statusText}`;
  //       console.error(message);
  //       return;
  //     }
  //     const records = await response.json();
  //     setRecords(records);
  //   }
  //   getRecords();
  //   return;
  // }, [records.length]);

  const handleAddBean = async () => {
    if (textInput.trim() !== "") {
      const time = new Date(); // Get the current time
      setBeans([
        ...beans,
        { type: "text", content: textInput, date: time.toLocaleString() },
      ]);
      setTextInput("");
      const newBean = {
        type: "text",
        content: textInput,
        date: time.toLocaleString(),
      };
      addBean(newBean); // Use addBean prop to update state in HomePage
      setTextInput("");

      // try {
      //   const response = await axios.post("http://localhost:5050/record/beans/new", {
      //     thought: textInput,
      //     _id: user._id, // Assuming postId is available in the calling scope
      //   });
      //   setLatestBeanId(response.data._id);
      //   return response.data._id; // Return the created bean's ID
      // } catch (error) {
      //   console.error("Error adding bean:", error);
      //   throw error; // Throw the error for handling by the caller
      // }

      // axios
      //   .put("http://localhost:5050/record/post/addBean", {
      //     username: user.username, // Replace 'example_username' with the actual username
      //     beanId: latestBeanId, // Replace 'example_beanId' with the actual beanId
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error adding bean to post:", error);
      //   });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBeans([...beans, { type: "image", content: event.target.result }]);
        const newBean = { type: "image", content: event.target.result };
        addBean(newBean); // Use addBean prop to update state in HomePage
      };
      reader.readAsDataURL(file);
    }
  };

  const textInputHandler = (e) => {
    setTextInput(e.target.value);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="home">
      <div className="square-wrapper">
        <div className="square">
          {beans.map((bean, index) => (
            <div key={index}>
              {bean.type === "text" ? (
                <>
                  {bean.date}
                  <br />
                  {bean.content}
                </>
              ) : (
                <img
                  src={bean.content}
                  alt="Uploaded"
                  style={{ maxWidth: "100%", maxHeight: "800px" }}
                />
              )}
              <br /> {/* Add a newline after each bean */}
              <br />
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
