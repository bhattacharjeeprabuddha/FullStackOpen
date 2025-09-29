// import: router, model
const blogsRouter = require("express").Router();
const Blog = require("../model/blog");
const User = require("../model/user");
const usersInDb = require("../utils/test_helper").usersInDb;
const jwt = require('jsonwebtoken');


// token authentication
const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
}



// expose endpoint GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs);
});

// expose endpoint POST
blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body;

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' });
    }

    const user = await User.findById(decodedToken.id);


    if (!user) {
        return response.status(400).json({ error: 'UserId missing or not valid' });
    }

    const blog = new Blog({ title, author, url, likes, user: user.id });


    if (!blog.likes) {
        blog.likes = 0;
    }

    if (!blog.title || !blog.url) {
        response.status(400).json({ error: "title or url missing" });;
    }

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();

    response.status(201).json(savedBlog);
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




