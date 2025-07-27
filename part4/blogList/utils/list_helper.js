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
















module.exports = {
    dummy,
    totalLikes
}