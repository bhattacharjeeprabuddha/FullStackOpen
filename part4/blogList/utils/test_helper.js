const Blog = require('../model/blog');

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs;
}

const usersInDb = async () => {
    const users = await User.find({});
    return users;
}



module.exports = {
    blogsInDb,
    usersInDb
}