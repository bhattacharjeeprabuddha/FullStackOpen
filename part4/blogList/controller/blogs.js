// import: router, model
const blogsRouter = require("express").Router();
const Blog = require("../model/blog");
const User = require("../model/user");
const usersInDb = require("../utils/test_helper").usersInDb;

// expose endpoint GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs);
});

// expose endpoint POST
blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body;

    const allUsers = await usersInDb();
    const blog = new Blog({ title, author, url, likes, user: allUsers[0].id });


    if (!blog.likes) {
        blog.likes = 0;
    }

    if (!blog.title || !blog.url) {
        response.status(400).json({ error: "title or url missing" });;
    }

    const result = await blog.save();

    await User.findByIdAndUpdate(allUsers[0].id, { $push: { blogs: result.id } });

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




