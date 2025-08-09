const { test, after, beforeEach, before, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const superTest = require('supertest');
const app = require('../app');
const Blog = require('../model/blog');
const { blogsTestData } = require('../utils/list_helper');

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
});

after(async () => {
    await mongoose.connection.close();
});