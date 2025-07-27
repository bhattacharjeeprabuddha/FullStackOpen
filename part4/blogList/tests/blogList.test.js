const { test, describe, it } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');


test('dummy returns one', () => {
    const blogs = [];
    assert.strictEqual(listHelper.dummy(blogs), 1);
})

describe('total likes', () => {
    // data preperation
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ];


    // test blocks
    test('when list has only one blog, equals the likes of that', () => {
        assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5);
    });

})