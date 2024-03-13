import React from "react";

const Posts = ({ beans }) => {
  return (
    <div className="posts-page" style={{ padding: "20px" }}>
      <div
        className="square"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* {beans.map((bean, index) => (
          bean.type === 'text' ? <div key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{bean.content}</div> :
          <img key={index} src={bean.content} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '800px', display: 'block', marginBottom: '10px' }} />
        ))} */}
        hello
      </div>
    </div>
  );
};

export default Posts;
