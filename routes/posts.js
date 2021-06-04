const router = require("express").Router();
//const User = require("../models/User");
const Post = require("../models/Post");

//Create New Post
router.post("/create", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Update Specefic Post By its Id
  router.put("/update/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      //if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      //} else {
       // res.status(401).json("You can update only your post!");
      //}
    } catch (err) {
      res.status(500).json(err);
    }
  });





// /blog/v1/posts/

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
