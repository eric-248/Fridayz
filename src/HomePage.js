import Post from "./Post";


import React, { useState } from 'react';

const HomePage = () => {
  const [beans, setBeans] = useState([]);

  const handleAddBean = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const newBean = e.target.value;
      if (newBean.trim() !== '') {
        setBeans([...beans, { type: 'text', content: newBean }]);
        e.target.value = '';
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBeans([...beans, { type: 'image', content: event.target.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="home">
      <div className="square-wrapper">
        <div className="square">
          {beans.map((bean, index) => (
            bean.type === 'text' ? <div key={index}>{bean.content}</div> :
            <img key={index} src={bean.content} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '800' }} />
          ))}
        </div>
        <div className="addToBean-container">
          <textarea
            className="addToBean-input"
            placeholder="Type here..."
            onKeyDown={handleAddBean}
          />
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
