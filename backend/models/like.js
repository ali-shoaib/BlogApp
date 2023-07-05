const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    like:{
        type:Boolean,
    },
    blog:{
        type:mongoose.SchemaTypes.ObjectId, ref:'Blog',
    },
    author:{
        type:mongoose.SchemaTypes.ObjectId, ref:'User',
    }
}, {timestamps: true});

module.exports = mongoose.model('Like', LikeSchema);