const express = require('express');
const { get } = require('mongoose');
const router = express.Router();
const Post = require('../models/Post')

// /blog/v1/posts

// Show all posts
router.get('/', async (req, res) => {
    try {
        const allposts = await Post.find()
        res.status(200).json(allposts)
    } catch (error) {
        res.status(400).json({
            name: error.name,
            message: error.message,
            url: req.originalUrl
        })
    }

})

// Show one Post
router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        if (!post) {
            throw new Error("There's no post with this ID")
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({
            name: error.name,
            message: error.message,
            url: req.originalUrl
        })

    }
})

// Delete a post
router.delete('/:id', async(req, res)=>{
    try{
        const postId = req.params.id
        const deletedPost=await Post.findByIdAndDelete(postId)
        if(!deletedPost)
            throw new Error("There is no post with this ID")

            res.status(200).json({ message: "Post is deleted successfully", deletedPost  })
        
    }catch(error){
        res.status(400).json({
            name: error.name,
            message: error.message,
            url: req.originalUrl
        })

    }
})

























module.exports = router