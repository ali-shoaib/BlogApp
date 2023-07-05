const Joi = require('joi');
const Like = require('../models/like');
const LikeDTO = require('../dto/like');

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
                newLike = await Like.updateOne(
                    {
                        blog,author
                    },
                    {
                        like
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

        return res.status(201).json({message: "liked!"});
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
    }
}

module.exports = likeController;