const router = require("express").Router()
const User = require("../Models/userModel")
const Blog = require("../Models/blogModel")
const bcrypt = require("bcrypt")
// User Register
router.post("/register", async (req, res) => {
    // specific message for error in frontend
    try {
        // creating new user
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            // generating new(bycrypt password)
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        // saving new user
        const user = await newUser.save()
        res.status(200).json(user)  
    } catch (err) {
        res.status(500).json
    }
})

// user login
router.post("/login", async(req, res)  => {
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(404).json("User not found")
        const validPassword = await bcrypt.compare(req.body.password, user.password)     
        !validPassword && res.status(404).json("Wrong Password!")
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get all users 
router.get("/", async(req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err);
    }
} )

// get ID specific users
router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err);
    }
} )

// update users
router.put("/:id", async(req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            // only for updating password
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                return res.status(500).json(err)
            }
        }
        // updating other credentials exept password
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new: true});
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }else{
        return res.status(401).json("You can only update your account")
    }
})

//  delete user
// router.delete("/:id", async (req, res) => {
//         const user = await User.findById(req.params.id);
//         try {
//             await Blog.deleteMany({author: user.username})
//             await Conversation.deleteMany({members: user._id})
//             await Message.deleteMany({sender: user._id})
//             await User.findByIdAndDelete(req.params.id)
//             res.status(200).json("User has been sucessfully deleted....")
//         } catch (err) {
//             res.status(500).json(err)
//         }
//     }
// )
module.exports = router;

// HR Melissa Stratton - Cheating Wife Massage Scene 1