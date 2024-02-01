import Post from "./Post";


import React, { useState } from 'react';

const HomePage = () => {
  const [beans, setBeans] = useState([]);

  const handleAddBean = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Prevent adding a bean when Shift+Enter is pressed
      e.preventDefault(); // Prevent the default action to avoid newline in textarea
      const newBean = e.target.value;
      if (newBean.trim() !== '') {
        setBeans([...beans, newBean]);
        e.target.value = ''; // Clear the textarea
      }
    }
  };

  return (
    <div className="home">
      <div className="square-wrapper">
        <div className="square">
          {beans.map((bean, index) => (
            <div key={index}>{bean}</div>
          ))}
        </div>
        <div className="addToBean-container">
          <textarea
            className="addToBean-input"
            placeholder="Type here..." //We can add some prompts or questions here too.  Like have an array and randomize it
            onKeyDown={handleAddBean}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;


