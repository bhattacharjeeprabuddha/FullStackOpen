const { test, describe, it } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const blogs = require('../utils/list_helper').blogsTestData;




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


    test('when list has only one blog, equals the likes of that', () => {
        assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5);
    });

});



describe('blog with most likes', () => {
    test('the blog with highest number of likes is the favorite one', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2]);
    });

});



describe('author with most blogs', () => {
    test('author with most blogs is Robert C. Martin', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(blogs), { author: "Robert C. Martin", blogs: 3 });
    });
});

describe('author with most likes', () => {
    test('author with highest likes is Edsger W. Dijkstra', () => {
        assert.deepStrictEqual(listHelper.mostLikes(blogs), { author: "Edsger W. Dijkstra", likes: 17 });
    });
});
