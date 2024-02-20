import React, { useState } from 'react';

const HomePage = () => {
  const [beans, setBeans] = useState([]);
  const [comment, setComment] = useState('');
  
  const [showCommentContainer, setShowCommentContainer] = useState(false);
  const [showPostContainer, setShowPostContainer] = useState(false);
  
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]); // State for posts

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

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    console.log('Submitted Comment:', comment);
    setComments([...comments, comment]);
    setComment('');
  };

  const handleSubmitPost = () => {
    console.log('Submitted Post:', beans); // You can adjust this to handle post submission
    setPosts([...posts, beans]);
    setBeans([]);
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

      <button onClick={() => setShowCommentContainer(!showCommentContainer)}>Comment</button>
      {showCommentContainer && (
        <div>
          {comments.map((comment, index) => (
            <div key={index} className="CommentContainer">{comment}</div>
          ))}
          <div className="Comment-flex">
            <textarea value={comment} onChange={commentHandler} className="input-box" />
            <button onClick={handleSubmitComment}>Submit Comment</button>
          </div>
        </div>
      )}

      <button onClick={() => setShowPostContainer(!showPostContainer)}>Post</button>
      {showPostContainer && (
        <div>
          {posts.map((post, index) => (
            <div key={index} className="PostContainer">
              {post.map((bean, index) => (
                bean.type === 'text' ? <div key={index}>{bean.content}</div> :
                  <img key={index} src={bean.content} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '800' }} />
              ))}
            </div>
          ))}
          <button onClick={handleSubmitPost}>Submit Post</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
