const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: { type: String },  // p
  color: { type: String, default: "#cdcdcd" }, // p
  userId: { type: String }, //p
  email: { type: String },   // p
  posts: { type: [String], default: [] },
});
const Users = mongoose.model("User", UserSchema);
module.exports = Users;