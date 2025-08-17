// import: router, model
const blogsRouter = require("express").Router();
const Blog = require("../model/blog");

// expose endpoint GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

// expose endpoint POST
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);
    if (!blog.likes) {
        blog.likes = 0;
    }

    if (!blog.title || !blog.url) {
        response.status(400).json({ error: "title or url missing" });;
    }

    const result = await blog.save();
    response.status(201).json(result);
});

// delete single blog by id
blogsRouter.delete('/:id', async (request, response) => {
    console.log(request.params.id);
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

// update single blog by id
blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body;
    const blogToUpdate = await Blog.findById(request.params.id);
    if (!blogToUpdate) {
        response.status(404).end();
    }

    if (title) {
        blogToUpdate.title = title;
    }

    if (author) {
        blogToUpdate.author = author;
    }

    if (likes) {
        blogToUpdate.likes = likes;
    }

    if (url) {
        blogToUpdate.url = url;
    }

    const updatedBlog = await blogToUpdate.save();
    response.json(updatedBlog);
});

module.exports = blogsRouter;




