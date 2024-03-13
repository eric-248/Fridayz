import React, { useState, useRef } from "react";
import paperClipIcon from "./Pictures/paper-clip.svg"; // Make sure this path is correct

const Beans = ({ addBean }) => {
  const [beans, setBeans] = useState([]);
  const [textInput, setTextInput] = useState("");

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

  const handleAddBean = () => {
    if (textInput.trim() !== "") {
      setBeans([...beans, { type: "text", content: textInput }]);
      setTextInput("");
      const newBean = { type: "text", content: textInput };
      addBean(newBean); // Use addBean prop to update state in HomePage
      setTextInput("");
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
          {beans.map((bean, index) =>
            bean.type === "text" ? (
              <div key={index}>{bean.content}</div>
            ) : (
              <img
                key={index}
                src={bean.content}
                alt="Uploaded"
                style={{ maxWidth: "100%", maxHeight: "800px" }}
              />
            )
          )}
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
