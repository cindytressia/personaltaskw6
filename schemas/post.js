const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    postId:{
        type: Number,
        required: true,
        unique: true,
    },
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("Posts", postsSchema);