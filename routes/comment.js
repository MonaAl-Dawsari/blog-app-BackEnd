const router = require("express").Router();
const Comment = require("../models/Comment");

// Add comment to a post
router.post("/saveComment", async(req, res) => {

    const newComment = new Comment(req.body);
    try{
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err){
        res.status(500).json(err);
    }
 
    
 });

 // Delete a comment by ID
 router.delete('/:id', async(req, res)=>{
    try{
        const commentId = req.params.id
        const deletedComment=await Post.findByIdAndDelete(commentId)
        if(!deletedComment)
            throw new Error("There is no comment with this ID")

            res.status(200).json({ message: "Comment is deleted successfully", deletedPost  })
        
    }catch(error){
        res.status(400).json({
            name: error.name,
            message: error.message,
            url: req.originalUrl
        })

    }
})



// get comment to display username instead of id
//  router.post("/getComments", (req, res) => {

//     Comment.find({ "postId": req.body.postId })
//         .populate('username')
//         .exec((err, comments) => {
//             if (err) return res.status(400).send(err)
//             res.status(200).json({ success: true, comments })
//         })

// });

 
 module.exports = router;