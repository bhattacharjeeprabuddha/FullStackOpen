const CreateBlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  blogService,
}) => {
  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={() => blogService.create({ title, author, url })}>
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
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default CreateBlogForm;
