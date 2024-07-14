const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const UserSchema = new mongoose.Schema({
  userId: { type: String },
  email: { type: String },
  userName: { type: String },
  posts: { type: [String], default: [] },
});
const Users = mongoose.model("User", UserSchema);
module.exports = Users