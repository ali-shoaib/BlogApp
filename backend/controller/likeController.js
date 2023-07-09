const Joi = require('joi');
const Like = require('../models/like');
const LikeDTO = require('../dto/like');
const User = require('../models/user');

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const likeController = {
    async create(req, res, next){
        const createLikeSchema = Joi.object({
            like: Joi.bool().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            blog: Joi.string().regex(mongodbIdPattern).required()
        });

        const {error} = createLikeSchema.validate(req.body);

        if (error){
            return next(error);
        }

        const {like, author, blog} = req.body;

        let com;
        try{
            com = await Like.find({blog, author});
        }
        catch(error){
            return next(error);
        }

        let newLike;
        if(com.length > 0){
            try{
                newLike = await Like.deleteOne(
                    {
                        blog,author
                    }
                )    
            }
            catch(err){
                return next(err);
            }
        }
        else{
            try{
                const savelike = new Like({
                    like, author, blog
                });
    
                newLike = await savelike.save();
            }
            catch(error){
                return next(error);
            }
        }

        return res.status(201).json({message: "liked done!"});
    },
    async getById(req, res, next){
        const getByIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        });

        const {error} = getByIdSchema.validate(req.params);

        if (error){
            return next(error);
        }

        const {id} = req.params;

        let likes;

        try{
            likes = await Like.find({blog: id}).populate('author');
        }
        catch(error){
            return next(error);
        }

        let likesDto = [];

        for(let i = 0; i < likes.length; i++){
            const obj = new LikeDTO(likes[i]);
            likesDto.push(obj);
        }

        return res.status(200).json({data: likesDto});
    },
    async deleteAll(req, res, next){
        try{
            let like = await Like.deleteMany({});

            return res.status(200).json({data: like});
        }
        catch(err){
            next(err);
        }
    },
    async allAuthors(req, res, next){
        try{
            const {blog} = req.body;

            const likes = await Like.find({blog:blog});

            const users = await User.find({_id: likes.map(x => {return x.author})});

            let onlyAuthors = [];
            for (let j=0; j < users.length; j++){
                onlyAuthors.push({_id: users[j]?._id, name: users[j]?.name, blog:blog});
            }

            return res.status(200).json({authors: onlyAuthors});
        }
        catch(err){
            next(err);
        }
    }
}

module.exports = likeController;