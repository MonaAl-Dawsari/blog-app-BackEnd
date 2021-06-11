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
      default: "photo-1501504905252-473c47e087f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
      
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
