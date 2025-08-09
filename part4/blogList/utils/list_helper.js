// test data
const blogsTestData = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
];


const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const likesArray = blogs.map(b => b.likes);
    let total = 0;
    for (const l of likesArray) {
        total += l;
    }
    return total;
}


const favoriteBlog = (blogs) => {
    let highestLike = 0;
    let favBlog;
    for (const blog of blogs) {
        if (blog.likes > highestLike) {
            highestLike = blog.likes;
            favBlog = blog;
        }
    }
    return favBlog;
}

const mostBlogs = (blogs) => {
    let authorBlogsCountMap = new Map();
    for (const blog of blogs) {
        let author = blog.author;
        if (authorBlogsCountMap.has(author)) {
            let blogsCount = authorBlogsCountMap.get(author);
            authorBlogsCountMap.set(author, blogsCount + 1);
        } else {
            authorBlogsCountMap.set(author, 1);
        }
    }

    let highestBlogsCount = 0;
    let authorWithHighestBlogs;
    for (const [author, blogsCount] of authorBlogsCountMap.entries()) {
        if (blogsCount > highestBlogsCount) {
            highestBlogsCount = blogsCount;
            authorWithHighestBlogs = author;
        }
    }

    return { author: authorWithHighestBlogs, blogs: highestBlogsCount };
}


const mostLikes = (blogs) => {
    let authorLikesCountMap = new Map();
    for (const blog of blogs) {
        let author = blog.author;
        let currentLikes = blog.likes;
        if (authorLikesCountMap.has(author)) {
            let previousLikes = authorLikesCountMap.get(author);
            authorLikesCountMap.set(author, previousLikes + currentLikes);
        } else {
            authorLikesCountMap.set(author, currentLikes);
        }
    }

    console.log(authorLikesCountMap);

    let highestLikesCount = 0;
    let authorWithHighestLikes;
    for (const [author, likesCount] of authorLikesCountMap.entries()) {
        if (likesCount > highestLikesCount) {
            highestLikesCount = likesCount;
            authorWithHighestLikes = author;
        }
    }

    return { author: authorWithHighestLikes, likes: highestLikesCount };
}




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    blogsTestData
}