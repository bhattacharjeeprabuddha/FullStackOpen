const Blog = require('../model/blog');

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs;
}


module.exports = {
    blogsInDb
}