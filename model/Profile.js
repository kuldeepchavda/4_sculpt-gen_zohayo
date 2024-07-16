const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    email:{
    type:String,
    }, 
    username: {
      type: String,
    },
    bio: {
      type: String,
      default:"Hey there, i am using sculpt gen.",
    }, 
    color: {
      type: String,
      default:"bg-zinc-400",
    },
    interest: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile-sculpt", profileSchema);