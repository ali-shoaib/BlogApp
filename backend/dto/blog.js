class BlogDTO{
    constructor(blog){
        this._id = blog._id;
        this.author = blog.author;
        this.content = blog.content;
        this.title = blog.title;
        this.photo = blog.photoPath;
        this.likesCount = blog.likesCount;
        this.commentsCount = blog.commentsCount;
        this.authorLike = blog.authorLike;
        this.authorsWhoLiked = blog.authorsWhoLiked;
        this.hover = false;
    }
}

module.exports = BlogDTO;