import { useState } from "react";

const Blog = ({ blog }) => {
  let [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button
          style={{ marginLeft: 5 }}
          onClick={() => {
            setShowDetails(!showDetails);
          }}
        >
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      {showDetails && (
        <>
          <div>{blog.url}</div>
          <div>{blog.likes}</div>
          <div>{blog.author}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
