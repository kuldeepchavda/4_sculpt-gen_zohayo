const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: String,  },
  comment: { type: String,  },
  timestamp: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  userId:{type:String,required:true},
  postId: { type: String, required: true },
  totalComments: { type: Number, default:0 },
  comments: [commentSchema],
});
const Post = mongoose.model("Comments", postSchema);
module.exports = Post;