import Post from "./Post";


import React, { useState } from 'react';

const HomePage = () => {
  const [beans, setBeans] = useState([]); // Holds the beans to be displayed in .square

  const handleAddBean = (e) => {
    if (e.key === 'Enter') {
      const newBean = e.target.value; // Get the input value
      if (newBean.trim() !== '') { // Check if the input is not just whitespace
        setBeans([...beans, newBean]); // Append the new bean to the beans array
        e.target.value = ''; // Clear the input box
      }
    }
  };

  return (
    <div className="home">
      <div className="square-wrapper">
        <div className="square">
          {beans.map((bean, index) => (
            <div key={index}>{bean}</div> // Display each bean as a separate div inside .square
          ))}
        </div>
        <div className="addToBean-container">
          <input
            type="text"
            className="addToBean-input"
            placeholder="Type here..."
            onKeyDown={handleAddBean} // Use the event handler when a key is pressed
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;


