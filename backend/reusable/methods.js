const Like = require('../models/like');
const LikeDTO = require('../dto/like');

async function LikesCountMehod(name){
    try{
      let likes = await Like.find({});

      console.log("Likes => ",likes);

      const likesDto = [];
      for (let i = 0; i < likes.length; i++) {
        if(likes[i].author === name && likes[i].like){
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

module.exports = LikesCountMehod;