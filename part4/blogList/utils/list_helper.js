const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const likesArray = blogs.map(b => b.likes);
    let total = 0;
    for (l of likesArray) {
        total += l;
    }
    return total;
}


const favoriteBlog = (blogs) => {
    let highestLike = 0;
    let favBlog;
    for (blog of blogs) {
        if (blog.likes > highestLike) {
            highestLike = blog.likes;
            favBlog = blog;
        }
    }
    return favBlog;
}




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}