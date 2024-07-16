const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: String,  },
  comment: { type: String,  },
  timestamp: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  totalComments: { type: Number, default:0 },
  comments: [commentSchema],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
