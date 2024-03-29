const Joi = require("joi");
const fs = require("fs");
const Blog = require("../models/blog");
const BlogDTO = require("../dto/blog");
const BlogDetailsDTO = require("../dto/blog-details");
const Comment = require("../models/comment");
const { BACKEND_SERVER_PATH } = require("../config");
const Like = require('../models/like');
const LikeDTO = require('../dto/like');
const User = require('../models/user');

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const blogController = {
  async create(req, res, next) {
    // 1. validate req body
    // 2. handle photo storage, naming
    // 3. add to db
    // 4. return response

    // client side -> base64 encoded string -> decode -> store -> save photo's path in db

    const createBlogSchema = Joi.object({
      title: Joi.string().required(),
      author: Joi.string().regex(mongodbIdPattern).required(),
      content: Joi.string().required(),
      photo: Joi.string().required(),
    });

    const { error } = createBlogSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { title, author, content, photo } = req.body;

    // read as buffer
    const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),"base64");

    // allot a random name
    const imagePath = `${Date.now()}-${author}.png`;

    let response;

    try {
      fs.writeFileSync(`storage/${imagePath}`, buffer);
    } catch (error) {
      return next(error);
    }

    // save blog in db
    let newBlog;
    try {
      newBlog = new Blog({
        title,
        author,
        content,
        photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
      });

      await newBlog.save();
    } catch (error) {
      return next(error);
    }

    const blogDto = new BlogDTO(newBlog);

    return res.status(201).json({ blog: blogDto });
  },
  async getAll(req, res, next) {
    try {
      const {author} = req.params;
      
      const blogs = await Blog.find({});

      const blogsDto = [];

      for (let i = 0; i < blogs.length; i++) {
        const dto = new BlogDTO(blogs[i]);
       
        dto.likesCount = await LikesCountMehod(blogs[i]._id);
        dto.commentsCount = await CommentsCountMehod(blogs[i]._id)
        dto.authorLike = await AuthorLike(blogs[i]._id, author);
        dto.authorsWhoLiked = await authorsWhoLiked(blogs[i]._id);
        dto.authorsWhoCommented = await authorsWhoCommented(blogs[i]._id);
        blogsDto.push(dto);
      }

      return res.status(200).json({ blogs: blogsDto });
    } catch (error) {
      return next(error);
    }
  },
  async getById(req, res, next) {
    // validate id
    // response

    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = getByIdSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    let blog;

    const { id } = req.params;

    try {
      blog = await Blog.findOne({ _id: id }).populate("author");
    } catch (error) {
      return next(error);
    }

    const blogDto = new BlogDetailsDTO(blog);

    blogDto.likesCount = await LikesCountMehod(blog._id);

    return res.status(200).json({ blog: blogDto });
  },
  async update(req, res, next) {
    // validate

    const updateBlogSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      author: Joi.string().regex(mongodbIdPattern).required(),
      blogId: Joi.string().regex(mongodbIdPattern).required(),
      photo: Joi.string(),
    });

    const { error } = updateBlogSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { title, content, author, blogId, photo } = req.body;

    // delete previous photo
    // save new photo

    let blog;

    try {
      blog = await Blog.findOne({ _id: blogId });
    } catch (error) {
      return next(error);
    }

    if (photo) {
      let previousPhoto = blog.photoPath;

      previousPhoto = previousPhoto.split("/").at(-1);

      // delete photo
      fs.unlinkSync(`storage/${previousPhoto}`);

      // read as buffer
      const buffer = Buffer.from(
        photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );

      // allot a random name
      const imagePath = `${Date.now()}-${author}.png`;

      // save locally
      let response;
      try {
        fs.writeFileSync(`storage/${imagePath}`, buffer);
      } catch (error) {
        return next(error);
      }

      await Blog.updateOne(
        { _id: blogId },
        {
          title,
          content,
          photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
        }
      );
    } else {
      await Blog.updateOne({ _id: blogId }, { title, content });
    }

    return res.status(200).json({ message: "blog updated!" });
  },
  async delete(req, res, next) {
    // validate id
    // delete blog
    // delete comments on this blog

    const deleteBlogSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = deleteBlogSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { id } = req.body;

    // delete blog
    // delete comments
    try {
      await Blog.deleteOne({ _id: id });

      await Comment.deleteMany({ blog: id });
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ message: "blog deleted" });
  },
};

async function LikesCountMehod(blog){
  try{
    let likes = await Like.find({});

    const likesDto = [];
    for (let i = 0; i < likes.length; i++) {
      if(likes[i].blog.toString() === blog.toString() && likes[i].like){
        const dto = new LikeDTO(likes[i]);
        likesDto.push(dto);
      }
    }
    return likesDto.length;
  }
  catch(err){
    console.log(err);
  }
}

async function AuthorLike(blog, author){
  try{
    let likes = await Like.find({});

    for (let i = 0; i < likes.length; i++) {
      if(likes[i].blog.toString() === blog.toString() && likes[i].author.toString() === author.toString() && likes[i].like){
        return true;
      }
    }
    return false;
  }
  catch(err){
    console.log(err);
  }
}

async function CommentsCountMehod(blog){
  try{
    let com = await Comment.find({});

    const commentsDto = [];
    for (let i = 0; i < com.length; i++) {
      if(com[i].blog.toString() === blog.toString()){
        commentsDto.push(com[i].blog);
      }
    }
    return commentsDto.length;
  }
  catch(err){
    console.log(err);
  }
}

async function authorsWhoLiked(blog){
  try{
    const likes = await Like.find({blog:blog});

    const users = await User.find({_id: likes.map(x => {return x.author})});

    let onlyAuthors = [];
    for (let j=0; j < users.length; j++){
      if(likes[j].like){
        onlyAuthors.push({_id: users[j]?._id, name: users[j]?.name, blog:blog});
      }
    }

    return onlyAuthors;
  }
  catch(err){
    next(err);
  }
}

async function authorsWhoCommented(blog){
  try{
    const com = await Comment.find({blog:blog});

    const users = await User.find({_id: com.map(x => {return x.author})});

    let onlyAuthors = [];
    for (let j=0; j < users.length; j++){
      onlyAuthors.push({_id: users[j]?._id, name: users[j]?.name, blog:blog});
    }

    return onlyAuthors;
  }
  catch(err){
    next(err);
  }
}

module.exports = blogController;