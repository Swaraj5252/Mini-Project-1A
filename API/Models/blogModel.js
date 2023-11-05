const mongoose = require("mongoose")

const repliesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
}, {timestamps: true})

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    replies: [repliesSchema] 
}, {timestamps: true})

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true,
        min: 75,
        max: 600
    },
    author: {
        type: String,
        required: true
    },
    authorID: {
        type: String,
        require: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    reviews: [commentSchema],
    // also have to add replies

}, {timestamps: true})

module.exports = mongoose.model("Blogs", blogSchema)