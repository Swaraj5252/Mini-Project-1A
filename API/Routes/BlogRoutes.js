const router = require("express").Router()
const Blog = require("../Models/blogModel")
const User = require("../Models/userModel")

// post blog
router.post("/", async (req, res) => {
    const newBlog = new Blog(req.body)
    try {
        const savedBlog = await newBlog.save();
        const id  = savedBlog.authorID
        console.log(id)
        const user = await User.findById(id)
        console.log(user);
        await user.updateOne( { $push: { myBlogs: savedBlog } } )
        res.status(200).json(savedBlog)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

// db.students.updateOne(
//    { _id: 1 },
//    { $push: { scores: 89 } }
// )

// get all blogs
router.get("/", async(req, res) => {
    try {
        const blogs =  await Blog.find();
        res.status(200).json(blogs)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get id specific blog
router.get("/:id", async(req, res) => {
    try {
        const blog =  await Blog.findById(req.params.id);
        res.status(200).json(blog)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update blog
router.put("/:id", async(req, res) => {
    const blog = Blog.findById(req.params.id) 
    try {
        if (blog.userId === req.body.authorId) {
            const updatedBlog = await Blog.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedBlog)
        }else{
            res.status(403).json("you can only update your blog")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
// at frontend we should show updated true or false status

// delete blog 
// router.delete("/:id", async(req, res) => {
//     const blog = await Blog.findById(req.params.id)
//     const user = await User.findById(blog.authorID)
//     // if-else delete 
//     try {
//         if (blog.authorID == req.body.authorID) {
//             await user.updateOne({ $pull: { myBlogs: blog } })
//             await Blog.findByIdAndDelete(req.params.id)
//             res.status(200).json("Blog succesfully deleted !")
//         }
//         else{
//             res.status(403).json("You cannot delete someone else's blog !")
//         }
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

router.delete("/:id", async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    const user = await User.findById(blog.authorID)
    // if-else delete 
    try {
            await user.updateOne({ $pull: { myBlogs: blog } })
            await Blog.findByIdAndDelete(req.params.id)
            res.status(200).json("Blog succesfully deleted !")
        }
    catch (err) {
        res.status(500).json(err)
    }
})

// like blog route
router.put("/:id/like", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog.likes.includes(req.body.userId)) {
            await blog.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json("The post has been liked !")
        }else {
            await blog.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json("The post has been disliked !")
        }
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

// reviews posting - 
router.post("/:id/comments", async(req, res) => {
    const {name, comment, user} = req.body
    const blog  = await Blog.findById(req.params.id)
    try {
        const comments = {
            comment : comment,
            name: name,
            user: user
        }
        blog.reviews.push(comments)
        await blog.save()
        res.status(200).json(blog)
    } catch (err) {
        res.status(500).json(err)
        // console.log(err);
    }
} )


module.exports = router