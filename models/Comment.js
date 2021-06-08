const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// // const {objectId}= mongoose.Schema.Types


const CommentSchema = new mongoose.Schema(
    {
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }

}, { timestamps: true })


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;