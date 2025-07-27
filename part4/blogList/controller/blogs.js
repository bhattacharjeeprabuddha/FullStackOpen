// import: router, model
const blogsRouter = require("express").Router();
const Blog = require("../model/blog");

// expose endpoint GET
blogsRouter.get('/', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    });
});

// expose endpoint POST
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
        response.status(201).json(result)
    });
});


module.exports = blogsRouter;




