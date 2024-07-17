const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  upvotes: [voteSchema],
  downvotes: [voteSchema],
});

const Post = mongoose.model("votes", postSchema);

module.exports = Post;
