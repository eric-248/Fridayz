import React, { useState } from 'react';
import Beans from './Beans';
import Comments from './Comments';
import Posts from './Posts';

const HomePage = () => {
  const [beans, setBeans] = useState([]);
  const [showPosts, setShowPosts] = useState(false); // New state to manage showing posts

  const addBean = (bean) => {
    setBeans((prevBeans) => [...prevBeans, bean]);
  };

  const handlePostBeans = () => {
    setShowPosts(true); // Update state to show posts
  };

  return (
    <div>
    <Beans addBean={addBean} />
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {showPosts && <div style={{ marginRight: '50px', flex: 1 }}><Posts beans={beans} /></div>}
      <div style={{ flex: 1 }}><Comments /></div>
    </div>
    <button onClick={handlePostBeans}>It's Friday!</button>
  </div>
  );
};

export default HomePage;
