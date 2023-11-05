const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            max: 30
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        // confirm password
        profilePic: {
            type: String,
            // required: true,
        },
        about: {
            type: String,
            min: 10,
            max: 100
        },
        // also we have to add skills section 
        myBlogs: {
            type: Array,
            default: []
        }        
    },
    {timestamps: true}
)

module.exports = mongoose.model("Users", userSchema)