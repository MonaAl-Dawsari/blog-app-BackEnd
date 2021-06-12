const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      
    },
    desc: {
      type: String,
      
    },
    photo: {
      type: String,
      default: "1623497349113blogpic.jpg"
      
    },
    username: {//to know who is the auther for the post
      type: String,
      
    },
    categories: {
      type: Array,
      
    },
  },
  { timestamps: true }// this means createdAt and updatedAt
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
