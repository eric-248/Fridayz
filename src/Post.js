
import React, { useState } from 'react';

const Post = () => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  const handleAddComment = () => {
    if (commentInput.trim() !== '') {
      setComments([...comments, commentInput]);
      setCommentInput(''); // Reset input after adding
    }
  };

  return (
    <div className="post-component">
      <div>
        <h3>Comments</h3>
        {comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
        <div>
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={handleAddComment}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Post;

