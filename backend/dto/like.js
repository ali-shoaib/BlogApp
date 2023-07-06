class LikeDTO{
    constructor(like){
        this._id = like._id;
        this.author = like.author?.username;
        this.authorid = like.author?._id;
        this.blog = like.blog?._id;
        this.like = like.like;
    }
}

module.exports = LikeDTO;