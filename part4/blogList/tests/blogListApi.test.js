const { test, after, beforeEach, before, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const superTest = require('supertest');
const app = require('../app');
const Blog = require('../model/blog');
const { blogsTestData } = require('../utils/list_helper');
const test_helper = require('../utils/test_helper');
const User = require('../model/user');
const api = superTest(app);

let token;
let user;
// seed db before each test
beforeEach(async () => {
    // clean db
    await Blog.deleteMany({});
    await User.deleteMany({});

    // create test user
    const userResponse = await api.post('/api/users').send({ username: 'testuser1', name: 'Test User 1', password: 'testpassword1' });
    user = userResponse.body;


    const loginResponse = await api.post('/api/login').send({ username: 'testuser1', password: 'testpassword1' });
    token = loginResponse.body.token;

    // seed db
    await Blog.insertMany(blogsTestData.map(blog => ({
        ...blog,
        user: user.id
    })));


});


describe('BlogList App API test', () => {
    test('Blog list application returns the correct amount of blog posts in the JSON format', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);


        const content = response.body;
        assert.strictEqual(content.length, blogsTestData.length);

    });

    test('The unique identifier property of the blog posts is "id"', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200);

        const blogIds = response.body.map(b => b.id);
        assert.strictEqual(blogIds.length, blogsTestData.length);
        for (const blog of response.body) {
            assert(!Object.keys(blog).includes("_id"));
        }
    });

    test('Create new blog api endpoint is working correctly', async () => {
        const newBlog = {
            title: 'POST endpoint test',
            author: 'test author',
            url: 'test url',
            likes: 1,
        };

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const responseBlog = response.body;
        const blogsCountInDb = (await test_helper.blogsInDb()).length;

        assert.strictEqual(blogsCountInDb, blogsTestData.length + 1);
        assert.strictEqual(responseBlog.title, 'POST endpoint test');
        assert.strictEqual(responseBlog.author, 'test author');
        assert.strictEqual(responseBlog.url, 'test url');
        assert.strictEqual(responseBlog.likes, 1);
    });

    test('Create new blog object without likes property makes likes default value 0', async () => {
        const newBlog = {
            title: 'Blog without title',
            author: 'Author NoTitle',
            url: 'url/noTitle'
        };
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const responseBlog = response.body;
        assert.strictEqual(responseBlog.likes, 0);
    });

    test('Create new blog object without title or url result in api response 400 bad request', async () => {
        const newBlogWithoutTitle = {
            author: 'test author',
            url: 'test url'
        }

        const newBlogWithoutUrl = {
            title: 'test title',
            author: 'test author',
        }

        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlogWithoutTitle).expect(400);
        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlogWithoutUrl).expect(400);
    });

    test('Update a blog by its id working successfully', async () => {
        const blogsInDb = await test_helper.blogsInDb();
        const blogToUpdate = blogsInDb[0];

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ likes: blogToUpdate.likes + 1 })
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.likes, blogToUpdate.likes + 1);

        // Verify the blog was actually updated in the database
        const updatedBlogInDb = await Blog.findById(blogToUpdate.id);
        assert.strictEqual(updatedBlogInDb.likes, blogToUpdate.likes + 1);
    });

    test('Delete a blog by its id working successfully', async () => {
        const blogsInDb = await test_helper.blogsInDb();
        const blogToDelete = blogsInDb[0];
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const deletedBlog = await Blog.findById(blogToDelete.id);
        assert.strictEqual(deletedBlog, null);
    });


    test('Creating a blog with invalid token results in api response 401 unauthorized', async () => {
        const newBlog = {
            title: 'Invalid token test',
            author: 'test author',
            url: 'test url'
        };
        await api.post('/api/blogs').send(newBlog).expect(401);
    });


});

after(async () => {
    await mongoose.connection.close();

});