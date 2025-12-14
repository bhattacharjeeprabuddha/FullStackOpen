const CreateBlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  blogService,
  setNotification,
  blogs,
  setBlogs,
  visible,
  setVisible,
}) => {
  return (
    <>
      <h2>Create New</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await blogService.create({ title, author, url });
          setBlogs(blogs.concat({ title, author, url }));
          setNotification(`a new blog ${title} by ${author} added`);
          setTimeout(() => setNotification(""), 5000);
          setVisible(!visible);
        }}
      >
        <div>
          <label htmlFor="title">title: </label>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author: </label>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url: </label>
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default CreateBlogForm;
