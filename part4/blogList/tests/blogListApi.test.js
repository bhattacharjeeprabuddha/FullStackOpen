const { test, after, beforeEach, before, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const superTest = require('supertest');
const app = require('../app');
const Blog = require('../model/blog');
const { blogsTestData } = require('../utils/list_helper');
const blog = require('../model/blog');
const { title } = require('node:process');
const test_helper = require('./test_helper');

const api = superTest(app);



// seed db before each test
beforeEach(async () => {
    // clean db
    await Blog.deleteMany({});

    // seed db
    await Blog.insertMany(blogsTestData);
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

        await api.post('/api/blogs').send(newBlogWithoutTitle).expect(400);
        await api.post('/api/blogs').send(newBlogWithoutUrl).expect(400);
    });

    test('Delete a blog by its id working successfully', async () => {
        const blogsInDb = await test_helper.blogsInDb();
        const id = blogsInDb[0].id;

        await api
            .delete(`/api/blogs/${id}`)
            .expect(204);

        const deletedBlog = await Blog.findById(id);
        assert.strictEqual(deletedBlog, null);
    });

    test('Update a blog by its id working successfully', async () => {
        const blogsInDb = await test_helper.blogsInDb();
        const blogToUpdate = blogsInDb[0];

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: blogToUpdate.likes + 1 });

        assert.strictEqual(response.body.likes, blogToUpdate.likes + 1);
    });
});

after(async () => {
    await mongoose.connection.close();
});