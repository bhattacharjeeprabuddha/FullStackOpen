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
    mostLikes
}