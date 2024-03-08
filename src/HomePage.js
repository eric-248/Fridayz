import React, { useState, useRef } from 'react';
import paperClipIcon from './Pictures/paper-clip.svg'; // Make sure this path is correct

const HomePage = () => {
  const [beans, setBeans] = useState([]);
  const [textInput, setTextInput] = useState('');

  const fileInputRef = useRef(null);

  const handleAddBean = () => {
    if (textInput.trim() !== '') {
      setBeans([...beans, { type: 'text', content: textInput }]);
      setTextInput('');
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
            bean.type === 'text' ? <div key={index}>{bean.content}</div> :
            <img key={index} src={bean.content} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '800px' }} />
          ))}
        </div>
        <div className="addToBean-container" style={{ display: 'flex', alignItems: 'left' }}>
          <textarea
            className="addToBean-input"
            placeholder="Type here..."
            value={textInput}
            onChange={textInputHandler}
          />
          {/* Adjusted image/icon to the left of the button */}
          <img
            src={paperClipIcon}
            alt="Upload"
            onClick={triggerFileInput}
            style={{ cursor: 'pointer', width: '24px', marginRight: '10px' }} // Adjust size and spacing as needed
          />
          <button onClick={handleAddBean}>Add To Bean</button>
          {/* Invisible file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

