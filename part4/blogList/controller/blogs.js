// import: router, model
const blogsRouter = require("express").Router();
const Blog = require("../model/blog");
const userExtractor = require("../middleware/userExtractor");


// expose endpoint GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs);
});

// expose endpoint POST
blogsRouter.post('/', userExtractor, async (request, response) => {
    const { title, author, url, likes } = request.body;

    const user = request.user;
    const blog = new Blog({ title, author, url, likes, user: user._id });

    if (!user) {
        return response.status(401).json({ error: 'User not found' });
    }

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
blogsRouter.delete('/:id', userExtractor, async (request, response) => {

    const user = request.user;
    if (!user) {
        return response.status(401).json({ error: 'User not found' });
    }

    const blog = await Blog.findById(request.params.id);
    if (!blog) {
        return response.status(404).json({ error: 'Blog not found' });
    }

    if (blog.user.toString() !== user.id) {
        return response.status(401).json({ error: 'token invalid' });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

// update single blog by id
blogsRouter.put('/:id', userExtractor, async (request, response) => {
    const { title, author, url, likes } = request.body;
    const user = request.user;
    if (!user) {
        return response.status(401).json({ error: 'User not found' });
    }

    const blog = await Blog.findById(request.params.id);
    if (!blog) {
        return response.status(404).json({ error: 'Blog not found' });
    }

    if (blog.user.toString() !== user.id) {
        return response.status(401).json({ error: 'token invalid' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new: true });
    response.json(updatedBlog);
});

module.exports = blogsRouter;




