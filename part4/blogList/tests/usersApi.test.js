const { test, beforeEach, describe, after } = require('node:test');
const assert = require('node:assert');
const superTest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../model/user');
const test_helper = require('../utils/test_helper');

const api = superTest(app);

// Clean database before each test
beforeEach(async () => {
    await User.deleteMany({});

    await User.insertOne({
        username: 'existingUserTest',
        name: 'existing user test',
        passwordHash: 'password123'
    });
});

describe('users API test', () => {

    test('create user with valid data should return 201 with correct data', async () => {
        const newUser = {
            username: 'testuser',
            name: 'test user',
            password: 'password123'
        };

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.username, 'testuser');
        assert.strictEqual(response.body.name, 'test user');
        assert(!response.body.passwordHash); // passwordHash should not be returned
    });

    test('create user without password should return 400 with correct error message', async () => {
        const newUser = {
            username: 'testuser',
            name: 'test user'
        };

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        assert.strictEqual(response.body.error, 'password is required');
    });

    test('create user with password less than 3 characters should return 400', async () => {
        const newUser = {
            username: 'testuser',
            name: 'test user',
            password: '12'
        };

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        assert.strictEqual(response.body.error, 'password must be at least 3 characters long');
    });

    test('create user with username less than 3 characters should return 400 with correct error message', async () => {
        const newUser = {
            username: '12',
            name: 'test user',
            password: 'password123'
        };

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400);

        assert.strictEqual(response.body.error, `User validation failed: username: Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`);
    });

    test('create user with username already exists should return 400 with correct error message', async () => {
        const newUser = {
            username: 'existingUserTest',
            name: 'existing user test',
            password: 'password123'
        };

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.error, 'username must be unique');
    });


});

after(async () => {
    await mongoose.connection.close();
});
