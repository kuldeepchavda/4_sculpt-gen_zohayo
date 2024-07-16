const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    email:{
    type:String,
    },
    username: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default:"Hey there, i am using sculpt gen.",
      required: true,
    }, 
    color: {
      type: String,
      default:"bg-zinc-400",
      required: true,
    },
    interest: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile-sculpt", profileSchema);