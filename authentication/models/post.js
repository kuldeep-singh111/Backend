const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    profilepic: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pic'
        }
    ]
});


const Post = mongoose.model("post", postModel);

module.exports = Post;
