const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
  userId:String,
  postId:String,
  heading: String,
  description: String,
  imageUrl: [String], 
  timestamp: { type: Date, default: Date.now },
});


module.exports = mongoose.model("posts-testing",postSchema)