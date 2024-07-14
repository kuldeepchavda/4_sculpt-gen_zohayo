const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const profileSchema = new mongoose.Schema(
  {
    profile_id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    }, 
    profileColor: {
      type: String,
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